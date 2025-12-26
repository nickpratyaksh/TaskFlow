<script lang="ts">
	import { enhance } from '$app/forms';

	let { showModal, onCreate } = $props();
	let isSubmitting = $state(false);
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
	<div class="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
		<div class="flex items-center justify-between border-b border-gray-200 p-8">
			<h2 class="text-2xl font-bold text-gray-900">Create New Task</h2>
			<button
				aria-label="Close button"
				onclick={() => showModal(false)}
				class=" flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-gray-100"
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
				action="?/createTask"
				use:enhance={() => {
					isSubmitting = true;
					return async ({ result }) => {
						isSubmitting = false;
						if (result.type === 'success' && result.data?.task) {
							onCreate(result.data.task);
							showModal(false);
						}
					};
				}}
			>
				<div>
					<label class="mb-2 block text-sm font-medium text-gray-700"> Task Description </label>
					<input
						name="task"
						type="text"
						placeholder="e.g., Follow up with designer about wireframes"
						class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
					/>
				</div>

				<div class="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
					<label class="flex cursor-pointer items-start gap-3">
						<input
							name="aiToggle"
							type="checkbox"
							class="mt-1 h-5 w-5 rounded border-gray-300 text-emerald-600 focus:ring-2 focus:ring-emerald-500"
						/>
						<div class="flex-1">
							<div class="mb-1 flex items-center gap-2 font-semibold text-gray-900">
								<span>🤖</span>
								<span>Enhance with AI</span>
							</div>
							<p class="text-sm leading-relaxed text-gray-600">
								Let AI generate a clear title and detailed description from your input
							</p>
						</div>
					</label>
				</div>

				<div class="flex gap-3 pt-2">
					<button
						disabled={isSubmitting}
						type="submit"
						class="flex-1 rounded-lg bg-emerald-500 px-6 py-3 font-medium text-white shadow-lg shadow-emerald-500/30 transition-colors hover:bg-emerald-600"
					>
						{#if isSubmitting}
							Adding...
						{:else}
							Add Task
						{/if}
					</button>
					<button
						onclick={() => showModal(false)}
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
