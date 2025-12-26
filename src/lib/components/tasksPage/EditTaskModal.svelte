<script lang="ts">
	import { enhance } from '$app/forms';

	let { editModalTask, openEditModal, onEdit } = $props();
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
	<div class="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
		<div class="flex items-center justify-between border-b border-gray-200 p-8">
			<h2 class="text-2xl font-bold text-gray-900">Edit Task</h2>
			<button
				onclick={() => openEditModal(null)}
				aria-label="Close button"
				class="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-gray-100"
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
			<form
				class="space-y-6"
				method="post"
				action="?/updateTask"
				use:enhance={() => {
					return async ({ result }) => {
						if (result.type === 'success' && result.data?.task) {
							onEdit(result.data.task);
							openEditModal(null);
						}
					};
				}}
			>
				<input type="hidden" name="taskId" value={editModalTask.id} />

				<div>
					<label class="mb-2 block text-sm font-medium text-gray-700">
						Title
						<input
							name="title"
							bind:value={editModalTask.title}
							type="text"
							class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
						/>
					</label>
				</div>

				<div>
					<label class="mb-2 block text-sm font-medium text-gray-700">
						Description
						<textarea
							name="description"
							bind:value={editModalTask.description}
							rows="4"
							class="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
							placeholder="Add a description for your task..."
						></textarea>
					</label>
				</div>

				<div>
					<label class="mb-2 block text-sm font-medium text-gray-700">
						Status
						<select
							name="status"
							bind:value={editModalTask.status}
							class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
						>
							<option value="pending">Pending</option>
							<option value="in_progress">In Progress</option>
							<option value="completed">Completed</option>
						</select>
					</label>
				</div>

				<div class="flex gap-3 pt-2">
					<button
						onclick={() => {
							console.log(editModalTask);
						}}
						type="submit"
						class="flex-1 rounded-lg bg-emerald-500 px-6 py-3 font-medium text-white shadow-lg shadow-emerald-500/30 transition-colors hover:bg-emerald-600"
					>
						Save Changes
					</button>
					<button
						onclick={() => (editModalTask = null)}
						type="button"
						class="rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-300"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	</div>
</div>
