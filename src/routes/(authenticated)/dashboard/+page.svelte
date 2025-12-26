<script lang="ts">
	let todayStats = {
		totalTime: 16200,
		tasksWorkedOn: 5,
		tasksCompleted: 2,
		tasksInProgress: 2
	};

	function formatTimeShort(seconds: number) {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		if (hours > 0) {
			return `${hours}h ${minutes}m`;
		}
		return `${minutes}m`;
	}
</script>

<div class="min-h-screen bg-gray-50">
	<main class="mx-auto mt-16 max-w-7xl px-8 py-8">
		<div class="mb-8">
			<h1 class="mb-2 text-3xl font-bold text-gray-900">Welcome back! 👋</h1>
			<p class="text-gray-600">Here's what's happening with your tasks today.</p>
		</div>
		<div class="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
			<div class="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg">
				<div class="mb-4 flex items-center justify-between">
					<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
						<span class="text-2xl">⏱️</span>
					</div>
				</div>
				<div class="mb-1 text-3xl font-bold text-gray-900">
					{formatTimeShort(todayStats.totalTime)}
				</div>
				<div class="text-sm font-medium text-gray-600">Total Time Today</div>
			</div>

			<div class="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg">
				<div class="mb-4 flex items-center justify-between">
					<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
						<span class="text-2xl">📋</span>
					</div>
				</div>
				<div class="mb-1 text-3xl font-bold text-gray-900">{todayStats.tasksWorkedOn}</div>
				<div class="text-sm font-medium text-gray-600">Tasks Worked On</div>
			</div>

			<div class="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg">
				<div class="mb-4 flex items-center justify-between">
					<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
						<span class="text-2xl">✅</span>
					</div>
				</div>
				<div class="mb-1 text-3xl font-bold text-gray-900">{todayStats.tasksCompleted}</div>
				<div class="text-sm font-medium text-gray-600">Completed</div>
			</div>

			<div class="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg">
				<div class="mb-4 flex items-center justify-between">
					<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
						<span class="text-2xl">🔄</span>
					</div>
				</div>
				<div class="mb-1 text-3xl font-bold text-gray-900">{todayStats.tasksInProgress}</div>
				<div class="text-sm font-medium text-gray-600">In Progress</div>
			</div>
		</div>

		<div class="mb-8 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 p-8 text-white">
			<div class="flex flex-col items-center justify-between gap-6 md:flex-row">
				<div>
					<h2 class="mb-2 text-2xl font-bold">Create a New Task</h2>
					<p class="text-emerald-100">Use AI to generate detailed tasks from simple descriptions</p>
				</div>
				<a
					href="/tasks"
					class="rounded-lg bg-white px-6 py-3 font-medium whitespace-nowrap text-emerald-600 shadow-lg transition-colors hover:bg-emerald-50"
				>
					Go to tasks page
				</a>
			</div>
		</div>
	</main>
</div>
