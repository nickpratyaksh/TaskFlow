import { integer, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const taskStatusEnum = pgEnum('task_status', ['pending', 'in_progress', 'completed']);

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const task = pgTable('task', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	title: text('title').notNull(),
	description: text('description'),
	status: taskStatusEnum('status').notNull().default('pending'),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	completedAt: timestamp('completed_at')
});

export const timeLogTable = pgTable('time_log', {
	id: text('id').primaryKey(),
	taskId: text('task_id')
		.notNull()
		.references(() => task.id, { onDelete: 'cascade' }),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	startTime: timestamp('start_time').notNull(),
	endTime: timestamp('end_time'),
	durationSeconds: integer('duration_seconds')
});

export type Session = typeof session.$inferSelect;
export type Task = typeof task.$inferSelect;

export type User = typeof user.$inferSelect;
