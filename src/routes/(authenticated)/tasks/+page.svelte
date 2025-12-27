<script lang="ts">
	import { type Task } from '$lib/server/db/schema.js';
	import TaskCard from '$lib/components/tasksPage/TaskCard.svelte';
	import CreateTaskModal from '$lib/components/tasksPage/CreateTaskModal.svelte';
	import EditTaskModal from '$lib/components/tasksPage/EditTaskModal.svelte';
	import { onDestroy } from 'svelte';

	let showModal = $state(false);
	let editModalTask: Task | null = $state(null);
	let { data } = $props();
	let tasks: Task[] = $state(data.tasks?.slice().reverse() ?? []);
	let existingTimer = data.existingTimer;
	let existingTimerElapsedSeconds = null;
	if (existingTimer)
		existingTimerElapsedSeconds = Math.floor(
			(new Date().getTime() - existingTimer.startTime.getTime()) / 1000
		);
	console.log(existingTimer, existingTimerElapsedSeconds);
	let activeTaskId: string | null = $state(existingTimer?.taskId || null);
	let elapsedSeconds = $state(existingTimerElapsedSeconds || 0);
	let interval: NodeJS.Timeout | null = null;

	const deleteTaskFromList = (taskId: string) =>
		(tasks = tasks.filter((t: any) => t.id !== taskId));
	const addNewTaskInList = (newTask: Task) => (tasks = [newTask, ...tasks]);
	const updateTaskInList = (updatedTask: Task) =>
		(tasks = tasks.map((t) => (t.id === editModalTask?.id ? updatedTask : t)));
	const openEditModal = (task: Task | null) => (editModalTask = task);
	const openCreateModal = (newModalState: boolean) => (showModal = newModalState);

	function startLocalTimer(taskId: string) {
		activeTaskId = taskId;
		elapsedSeconds = 0;
		interval = setInterval(() => {
			elapsedSeconds += 1;
		}, 1000);
	}

	function stopLocalTimer() {
		if (interval) clearInterval(interval);
		interval = null;
		activeTaskId = null;
		elapsedSeconds = 0;
	}

	if (existingTimer) {
		activeTaskId = existingTimer.taskId;
		elapsedSeconds = Math.floor((Date.now() - new Date(existingTimer.startTime).getTime()) / 1000);

		interval = setInterval(() => {
			elapsedSeconds += 1;
		}, 1000);
	}
	onDestroy(() => {
		if (interval) clearInterval(interval);
	});
</script>

<div class="h-full bg-gray-50">
	{#if showModal}
		<CreateTaskModal showModal={openCreateModal} onCreate={addNewTaskInList} />
	{/if}

	{#if editModalTask}
		<EditTaskModal {editModalTask} {openEditModal} onEdit={updateTaskInList} />
	{/if}

	<main class="mx-auto mt-16 min-h-screen max-w-7xl px-8 py-8">
		<div class="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
			<div>
				<h1 class="mb-2 text-3xl font-bold text-gray-900">My Tasks</h1>
				<p class="text-gray-600">Manage and track all your tasks in one place</p>
			</div>
			<button
				onclick={() => (showModal = true)}
				class="rounded-lg bg-emerald-500 px-6 py-3 font-medium whitespace-nowrap text-white shadow-lg shadow-emerald-500/30 transition-colors hover:bg-emerald-600"
			>
				+ Create New Task
			</button>
		</div>

		<div class="space-y-4">
			{#each tasks as task}
				<TaskCard
					{task}
					onDelete={deleteTaskFromList}
					onEdit={openEditModal}
					{startLocalTimer}
					{elapsedSeconds}
					{stopLocalTimer}
					{activeTaskId}
				/>
			{/each}
		</div>
	</main>
</div>
