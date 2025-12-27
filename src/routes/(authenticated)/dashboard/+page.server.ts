import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq, and, isNotNull, gte, lte } from 'drizzle-orm';

const startOfToday = new Date();
startOfToday.setHours(0, 0, 0, 0);

const endOfToday = new Date();
endOfToday.setHours(23, 59, 59, 999);

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/login');
	}
	try {
		const tasksCompletedToday = await db
			.select()
			.from(table.task)
			.where(
				and(
					eq(table.task.userId, locals.user.id),
					eq(table.task.status, 'completed'),
					gte(table.task.completedAt, startOfToday),
					lte(table.task.completedAt, endOfToday)
				)
			);

		const todayLogs = await db
			.select({
				durationSeconds: table.timeLogTable.durationSeconds
			})
			.from(table.timeLogTable)
			.where(
				and(
					eq(table.timeLogTable.userId, locals.user.id),
					isNotNull(table.timeLogTable.endTime),
					gte(table.timeLogTable.endTime, startOfToday),
					lte(table.timeLogTable.endTime, endOfToday)
				)
			);

		const totalSecondsToday = todayLogs.reduce((sum, log) => sum + (log.durationSeconds ?? 0), 0);

		const tasks = await db.select().from(table.task).where(eq(table.task.userId, locals.user.id));
		// const existingTimers = await db
		// 	.select()
		// 	.from(table.timeLogTable)
		// 	.where(
		// 		and(eq(table.timeLogTable.userId, locals.user.id), isNull(table.timeLogTable.endTime))
		// 	);
		return { tasks, tasksCompletedToday, totalSecondsToday };
	} catch (error) {
		console.log(error);
	}
};
