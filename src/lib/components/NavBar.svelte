<script lang="ts">
	type User = {
		id: string;
		name: string | null;
		email: string;
	} | null;
	let { user }: { user: User } = $props();
</script>

<header
	class="fixed top-0 z-50 w-full border-b border-gray-200 bg-white/80 py-5 text-gray-900 backdrop-blur-md"
>
	<nav class="mx-auto flex max-w-7xl items-center justify-between px-8">
		<a href="/">
			<div class="flex items-center gap-2.5 text-xl font-semibold">
				<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500">
					<span class="text-lg text-white">T</span>
				</div>
				TaskFlow
			</div>
		</a>
		<ul class="hidden items-center gap-10 md:flex">
			{#if user}
				<li>
					<a
						href="/tasks"
						class="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">Tasks</a
					>
				</li>
				<li>
					<form method="POST" action="/logout">
						<button
							type="submit"
							class="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
						>
							Logout
						</button>
					</form>
				</li>
				<li>
					<div
						class="rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-600"
					>
						{user.name}
					</div>
				</li>
			{:else}
				<li>
					<a
						href="#features"
						class="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
						>Features</a
					>
				</li>
				<li>
					<a
						href="#how-it-works"
						class="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
						>How It Works</a
					>
				</li>
				<li>
					<a
						href="/login"
						class="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
					>
						Login
					</a>
				</li>
				<li>
					<a
						href="/signup"
						class="rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-600"
					>
						Get Started
					</a>
				</li>{/if}
		</ul>
	</nav>
</header>
