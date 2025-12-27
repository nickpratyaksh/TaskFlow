import { db } from '$lib/server/db';
import type { Actions } from './$types';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import * as table from '$lib/server/db/schema';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { task } from '$lib/server/db/schema';
import { and, eq, isNull } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';
import { GoogleGenAI } from '@google/genai';
import { env } from '$env/dynamic/private';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/login');
	}
	try {
		const tasks = await db.select().from(task).where(eq(task.userId, locals.user.id));
		const existingTimers = await db
			.select()
			.from(table.timeLogTable)
			.where(
				and(eq(table.timeLogTable.userId, locals.user.id), isNull(table.timeLogTable.endTime))
			);
		return { tasks, existingTimer: existingTimers[0] };
	} catch (error) {
		console.log(error);
	}
};

export const actions = {
	updateTask: async (event) => {
		if (!event.locals.user) {
			return fail(401, { message: 'Unauthorized' });
		}
		const formData = await event.request.formData();
		const taskId = formData.get('taskId');
		const title = formData.get('title');
		const description = formData.get('description');
		const status = formData.get('status');
		console.log(title, description, status);

		if (
			typeof taskId !== 'string' ||
			typeof title !== 'string' ||
			typeof description !== 'string'
		) {
			return fail(400, { message: 'Invalid task id' });
		}

		const isTaskCompleted = status === 'completed';

		try {
			const result = await db
				.update(task)
				//@ts-expect-error i know what i am doing
				.set({ title, description, status, completedAt: isTaskCompleted ? new Date() : null })
				.where(and(eq(task.id, taskId), eq(task.userId, event.locals.user.id)))
				.returning();
			return { task: result.at(0) };
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'An error has occurred' });
		}
	},

	deleteTask: async (event) => {
		if (!event.locals.user) {
			return fail(401, { message: 'Unauthorized' });
		}

		const formData = await event.request.formData();
		const taskId = formData.get('taskId');

		if (typeof taskId !== 'string') {
			return fail(400, { message: 'Invalid task id' });
		}

		try {
			await db.delete(task).where(and(eq(task.id, taskId), eq(task.userId, event.locals.user.id)));

			return { success: true };
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'An error has occurred' });
		}
	},

	createTask: async (event) => {
		const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
		const formData = await event.request.formData();
		const taskInput = formData.get('task');
		const aiToggle = formData.get('aiToggle') ? true : false;
		console.log(taskInput, aiToggle);

		if (!taskInput) {
			return fail(400, { message: 'Invalid task title' });
		}
		if (!event.locals.user) {
			return fail(401, { message: 'Unauthorized' });
		}

		const taskId = generateId();
		try {
			let result: table.Task[];
			if (aiToggle) {
				const response = await ai.models.generateContent({
					model: 'gemini-2.5-flash',
					contents: `The user create a new task in task management website. The user enters in natural language input. From user input you need to generate - A clearer **task title** - A more structured **description**. Respond in structured json so that it can be stored directly in the database. Do not include anything extra not even markdown codeblock syntax, just plain json in curly brackets. Do not include any escape characters in the text. here is the structure - {title:"generate title from user input", description:"generate description from user input"} The user input is ${taskInput}`
				});
				console.log(response.text);
				const aiResponse: { title: string; description: string } = JSON.parse(response.text || '');
				console.log(aiResponse);
				result = await db
					.insert(table.task)
					.values({
						id: taskId,
						title: aiResponse.title,
						description: aiResponse.description,
						status: 'pending',
						createdAt: new Date(),
						userId: event.locals.user.id
					})
					.returning();
			} else {
				result = await db
					.insert(table.task)
					.values({
						id: taskId,
						title: taskInput as string,
						description: '',
						status: 'pending',
						createdAt: new Date(),
						userId: event.locals.user.id
					})
					.returning();
				console.log(result);
			}
			return { task: result.at(0) };
		} catch (error) {
			console.log(error);
			return fail(500, { message: 'An error has occurred' });
		}
	},

	startTimer: async (event) => {
		if (!event.locals.user) {
			return fail(401, { message: 'Unauthorized' });
		}
		const formData = await event.request.formData();
		const taskId = formData.get('taskId');
		console.log('create time log for task id' + taskId);

		const timeLogId = generateId();

		try {
			const existing = await db
				.select()
				.from(table.timeLogTable)
				.where(
					and(
						eq(table.timeLogTable.taskId, taskId as string),
						eq(table.timeLogTable.userId, event.locals.user.id),
						isNull(table.timeLogTable.endTime)
					)
				);
			if (existing.length > 0) {
				return fail(400, { message: 'Timer already running' });
			}

			await db.insert(table.timeLogTable).values({
				id: timeLogId,
				taskId: taskId as string,
				userId: event.locals.user.id,
				startTime: new Date()
			});
		} catch (error) {
			console.log(error);
			return fail(500, { message: 'An error has occurred' });
		}
	},

	stopTimer: async (event) => {
		if (!event.locals.user) {
			return fail(401, { message: 'Unauthorized' });
		}

		const formData = await event.request.formData();
		const taskId = formData.get('taskId');

		try {
			const [activeLog] = await db
				.select()
				.from(table.timeLogTable)
				.where(
					and(
						eq(table.timeLogTable.taskId, taskId as string),
						eq(table.timeLogTable.userId, event.locals.user.id),
						isNull(table.timeLogTable.endTime)
					)
				);

			if (!activeLog) {
				return fail(400, { message: 'No active timer' });
			}

			const endTime = new Date();
			const durationSeconds = Math.floor(
				(endTime.getTime() - activeLog.startTime.getTime()) / 1000
			);

			await db
				.update(table.timeLogTable)
				.set({
					endTime,
					durationSeconds
				})
				.where(eq(table.timeLogTable.id, activeLog.id));
		} catch (error) {
			console.log(error);
			return fail(500, { message: 'An error has occurred' });
		}
	}
} satisfies Actions;

function generateId() {
	// ID with 120 bits of entropy, or about the same as UUID v4.
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	const id = encodeBase32LowerCase(bytes);
	return id;
}
