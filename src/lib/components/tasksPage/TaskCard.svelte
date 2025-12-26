<script lang="ts">
	import { enhance } from '$app/forms';

	let { task, onDelete, onEdit, startLocalTimer, elapsedSeconds, stopLocalTimer, activeTaskId } =
		$props();

	function secondsToHms(totalSeconds: number): string {
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = Math.floor(totalSeconds % 60);
		return `${hours}h ${minutes}m ${seconds}s`;
	}
</script>

<div class="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg">
	<div class="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
		<div class="min-w-0 flex-1">
			<h3 class="mb-2 text-lg font-semibold text-gray-900">{task.title}</h3>
			<p class="mb-4 text-sm leading-relaxed text-gray-600">
				{task.description}
			</p>
			<div class="flex flex-wrap items-center gap-3">
				{#if task.status === 'in_progress'}
					<span
						class="rounded-full border border-blue-200 bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700"
					>
						In Progress
					</span>
				{:else if task.status === 'pending'}
					<span
						class="rounded-full border border-yellow-200 bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700"
					>
						Pending
					</span>
				{:else if task.status === 'completed'}
					<span
						class="rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700"
					>
						Completed
					</span>
				{/if}

				<!-- <span class="flex items-center gap-1.5 text-sm text-gray-500">
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					1h 0m
				</span> -->
				{#if activeTaskId === task.id}
					<span class="flex items-center gap-1.5 text-sm font-medium text-blue-600">
						<span class="h-2 w-2 animate-pulse rounded-full bg-blue-600"></span>
						{secondsToHms(elapsedSeconds)}
					</span>
				{/if}
				<span class="text-xs text-gray-400">
					Created {new Date(task.createdAt).toDateString()}
				</span>
			</div>
		</div>

		<div class="flex flex-wrap items-center gap-2">
			{#if activeTaskId === task.id}
				<form
					method="post"
					action="?/stopTimer"
					use:enhance={() => {
						return async ({ result }) => {
							if (result.type === 'success') {
								stopLocalTimer(task.id);
							}
						};
					}}
				>
					<input type="hidden" name="taskId" value={task.id} />
					<button
						type="submit"
						class="cursor-pointer rounded-lg bg-red-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-600"
					>
						⏸ Stop
					</button>
				</form>
			{:else if !activeTaskId}
				<form
					method="post"
					action="?/startTimer"
					use:enhance={() => {
						return async ({ result }) => {
							if (result.type === 'success') {
								startLocalTimer(task.id);
							}
						};
					}}
				>
					<input type="hidden" name="taskId" value={task.id} />
					<button
						type="submit"
						class="cursor-pointer rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-600"
					>
						▶ Start
					</button>
				</form>
			{/if}
			<button
				onclick={() => onEdit({ ...task })}
				class="cursor-pointer rounded-lg bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
			>
				Edit
			</button>
			<form
				method="post"
				action="?/deleteTask"
				use:enhance={() => {
					return async ({ result }) => {
						if (result.type === 'success') onDelete(task.id);
					};
				}}
			>
				<input type="hidden" value={task.id} name="taskId" />
				<button
					type="submit"
					class="cursor-pointer rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
				>
					Delete
				</button>
			</form>
		</div>
	</div>
</div>
