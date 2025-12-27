<script lang="ts">
	import { enhance } from '$app/forms';

	let { task, onDelete, onEdit, startLocalTimer, elapsedSeconds, stopLocalTimer, activeTaskId } =
		$props();

	let showDeleteModal: boolean = $state(false);

	function secondsToHms(totalSeconds: number): string {
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = Math.floor(totalSeconds % 60);
		return `${hours}h ${minutes}m ${seconds}s`;
	}
</script>

{#if showDeleteModal}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
		<div class="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
			<div class="flex items-center justify-between border-b border-gray-200 p-8">
				<h2 class="text-2xl font-bold text-gray-900">Delete Task?</h2>
				<button
					aria-label="Close button"
					onclick={() => (showDeleteModal = false)}
					class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-gray-100"
				>
					<svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>

			<div class="p-8">
				<p class="mb-6 text-gray-600">
					Are you sure you want to delete this task? This action cannot be undone.
				</p>
				<div class="flex w-full justify-end gap-3 pt-2">
					<form
						class="space-y-6"
						method="post"
						action="?/deleteTask"
						use:enhance={() => {
							return async ({ result }) => {
								if (result.type === 'success') onDelete(task.id);
								showDeleteModal = false;
							};
						}}
					>
						<input type="hidden" value={task.id} name="taskId" />
						<button
							type="submit"
							class="cursor-pointer rounded-lg bg-red-500 px-6 py-3 font-medium text-white shadow-lg shadow-red-500/30 transition-colors hover:bg-red-600"
						>
							Delete
						</button>
					</form>

					<button
						onclick={() => (showDeleteModal = false)}
						type="button"
						class="rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-300"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<div
	class="rounded-xl {activeTaskId === task.id
		? 'shadow-lg shadow-emerald-100'
		: 'border border-gray-200 shadow-sm'} bg-white transition-all hover:shadow-lg"
>
	{#if activeTaskId === task.id}
		<div
			class="flex items-center justify-between rounded-t-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-3"
		>
			<div class="flex items-center gap-3">
				<div class="h-3 w-3 animate-pulse rounded-full bg-white"></div>
				<span class="text-sm font-semibold text-white">Timer Active</span>
			</div>
			<div class="rounded-lg bg-white/20 px-4 py-2 backdrop-blur-sm">
				<span class="text-lg font-bold text-white">{secondsToHms(elapsedSeconds)}</span>
			</div>
		</div>
	{/if}

	<div class="p-6">
		<div class="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
			<div class="min-w-0 flex-1">
				<h3 class="mb-2 text-xl font-bold text-gray-900">{task.title}</h3>
				<p class="mb-4 text-sm leading-relaxed text-gray-600">
					{task.description}
				</p>
				<div class="flex flex-wrap items-center gap-3">
					{#if task.status === 'in_progress'}
						<span
							class="rounded-full border border-blue-200 bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-700"
						>
							In Progress
						</span>
					{:else if task.status === 'pending'}
						<span
							class="rounded-full border border-yellow-200 bg-yellow-100 px-3 py-1.5 text-xs font-semibold text-yellow-700"
						>
							Pending
						</span>
					{:else if task.status === 'completed'}
						<span
							class="rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700"
						>
							Completed
						</span>
					{/if}

					<!-- {#if activeTaskId !== task.id}
						<span class="flex items-center gap-1.5 text-sm text-gray-500">
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							Total: {secondsToHms(task.totalTimeSeconds || 0)}
						</span>
					{/if} -->

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
							class="flex cursor-pointer items-center gap-2 rounded-lg bg-red-500 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all hover:bg-red-600 hover:shadow-xl"
						>
							<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
								/>
							</svg>
							Stop
						</button>
					</form>
				{:else if !activeTaskId && task.status !== 'completed'}
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
							class="flex cursor-pointer items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all hover:bg-emerald-600 hover:shadow-xl"
						>
							<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M8 5v14l11-7z" />
							</svg>
							Start
						</button>
					</form>
				{/if}

				{#if task.status !== 'completed'}
					<button
						onclick={() => onEdit({ ...task })}
						class="flex cursor-pointer items-center gap-2 rounded-lg bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
					>
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
							/>
						</svg>
						Edit
					</button>
				{/if}

				<button
					onclick={() => (showDeleteModal = true)}
					type="button"
					class="rounded-lg bg-red-50 p-3 text-red-600 transition-colors hover:bg-red-100"
				>
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>
</div>
