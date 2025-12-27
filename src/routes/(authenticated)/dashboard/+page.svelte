<script lang="ts">
	import { type Task } from '$lib/server/db/schema.js';

	let { data } = $props();
	const tasks: Task[] = data.tasks || [];
	const tasksCompletedToday: Task[] = data.tasksCompletedToday || [];
	const totalSecondsToday = data.totalSecondsToday || 0;
	const incompleteTasks = tasks.filter((t) => t.status !== 'completed');

	function formatTime(totalSeconds: number): string {
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		return `${hours}h ${minutes}m`;
	}
</script>

<div class="min-h-screen bg-gray-50">
	<main class="mx-auto mt-16 max-w-7xl px-8 py-8">
		<div class="mb-8">
			<h1 class="mb-2 text-3xl font-bold text-gray-900">Welcome back! 👋</h1>
			<p class="text-gray-600">
				Here's your productivity summary for today, {new Date().toDateString()}
			</p>
		</div>

		<div class="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			<div class="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg">
				<div class="mb-4 flex items-center justify-between">
					<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
						<span class="text-2xl">⏱️</span>
					</div>
				</div>
				<div class="mb-1 text-3xl font-bold text-gray-900">{formatTime(totalSecondsToday)}</div>
				<div class="text-sm font-medium text-gray-600">Total Time Tracked Today</div>
			</div>

			<div class="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg">
				<div class="mb-4 flex items-center justify-between">
					<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
						<span class="text-2xl">✅</span>
					</div>
				</div>
				<div class="mb-1 text-3xl font-bold text-gray-900">{tasksCompletedToday.length}</div>
				<div class="text-sm font-medium text-gray-600">Tasks Completed Today</div>
			</div>

			<div class="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg">
				<div class="mb-4 flex items-center justify-between">
					<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
						<span class="text-2xl">🔄</span>
					</div>
				</div>
				<div class="mb-1 text-3xl font-bold text-gray-900">{incompleteTasks.length}</div>
				<div class="text-sm font-medium text-gray-600">In Progress / Pending</div>
			</div>
		</div>

		<div class="mb-8 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 p-8 text-white">
			<div class="flex flex-col items-center justify-between gap-6 md:flex-row">
				<div>
					<h2 class="mb-2 text-2xl font-bold">Manage Your Tasks</h2>
					<p class="text-emerald-100">View, update, and track time on your tasks from one place</p>
				</div>
				<a
					href="/tasks"
					class="rounded-lg bg-white px-6 py-3 font-medium whitespace-nowrap text-emerald-600 shadow-lg transition-colors hover:bg-emerald-50"
				>
					Go to Tasks
				</a>
			</div>
		</div>

		<div class="mb-6 rounded-xl border border-gray-200 bg-white p-6">
			<h2 class="mb-6 text-xl font-bold text-gray-900">Tasks Worked On Today</h2>

			<div class="space-y-4">
				<div>
					<h3 class="mb-3 flex items-center gap-2 text-sm font-semibold text-emerald-600">
						<span class="h-2 w-2 rounded-full bg-emerald-600"></span>
						Completed ({tasksCompletedToday.length})
					</h3>
					<div class="space-y-3">
						{#each tasksCompletedToday as task}
							<div class="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
								<h4 class="mb-1 text-base font-semibold text-gray-900">{task.title}</h4>
								<p class="text-sm text-gray-600">
									{task.description}
								</p>
							</div>
						{/each}
					</div>
				</div>

				<div>
					<h3 class="mb-3 flex items-center gap-2 text-sm font-semibold text-blue-600">
						<span class="h-2 w-2 rounded-full bg-blue-600"></span>
						Incomplete Tasks ({incompleteTasks.length})
					</h3>
					<div class="space-y-3">
						{#each incompleteTasks as task}
							<div class="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
								<h4 class="mb-1 text-base font-semibold text-gray-900">
									{task.title}
								</h4>
								<p class="text-sm text-gray-600">
									{task.description}
								</p>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</main>
</div>
