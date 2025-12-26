<script lang="ts">
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<div class="flex min-h-screen flex-col bg-gradient-to-b from-emerald-50 to-white">
	<main class="mt-16 flex flex-1 items-center justify-center px-8 py-12">
		<div class="grid w-full max-w-5xl items-center gap-16 md:grid-cols-2">
			<div class="order-2 md:order-1">
				<div class="space-y-6">
					<div>
						<h2 class="mb-4 text-4xl font-bold text-gray-900">Welcome back!</h2>
						<p class="text-lg text-gray-600">
							Log in to continue managing your tasks and tracking your time efficiently.
						</p>
					</div>

					<div class="space-y-4 pt-6">
						<div class="flex items-center gap-3">
							<div
								class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-100"
							>
								<span class="text-lg">⚡</span>
							</div>
							<p class="text-gray-700">Quick access to all your tasks</p>
						</div>

						<div class="flex items-center gap-3">
							<div
								class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100"
							>
								<span class="text-lg">📊</span>
							</div>
							<p class="text-gray-700">View your productivity insights</p>
						</div>

						<div class="flex items-center gap-3">
							<div
								class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-purple-100"
							>
								<span class="text-lg">🔔</span>
							</div>
							<p class="text-gray-700">Stay updated with notifications</p>
						</div>
					</div>
				</div>
			</div>

			<div class="order-1 md:order-2">
				<div class="rounded-3xl border border-gray-200 bg-white p-10 shadow-xl">
					<div class="mb-8">
						<h1 class="mb-2 text-3xl font-bold text-gray-900">Log in to TaskFlow</h1>
						<p class="text-gray-600">Enter your credentials to access your account</p>
					</div>

					<form class="space-y-5" method="post">
						<div>
							<label for="email" class="mb-2 block text-sm font-medium text-gray-700"
								>Email Address</label
							>
							<input
								type="email"
								id="email"
								name="email"
								class="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
								placeholder="john@example.com"
							/>
						</div>

						<div>
							<div class="mb-2 flex items-center justify-between">
								<label for="password" class="block text-sm font-medium text-gray-700"
									>Password</label
								>
								<!-- <a
									href="#forgot"
									class="text-sm font-medium text-emerald-500 hover:text-emerald-600"
									>Forgot password?</a
								> -->
							</div>
							<input
								type="password"
								id="password"
								name="password"
								class="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
								placeholder="Enter your password"
							/>
							<p class="mt-2 text-xs text-red-500">{form?.message ?? ''}</p>
						</div>

						<!-- <div class="flex items-center gap-3">
							<input
								type="checkbox"
								id="remember"
								name="remember"
								class="h-4 w-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
							/>
							<label for="remember" class="text-sm text-gray-600"> Remember me for 30 days </label>
						</div> -->

						<button
							type="submit"
							class="w-full cursor-pointer rounded-xl bg-emerald-500 px-4 py-3.5 font-semibold text-white shadow-lg shadow-emerald-500/30 transition-colors hover:bg-emerald-600 hover:shadow-xl hover:shadow-emerald-500/40"
						>
							Log In
						</button>
					</form>

					<div class="mt-6 text-center">
						<p class="text-sm text-gray-600">
							Don't have an account?
							<a href="/signup" class="ml-1 font-medium text-emerald-500 hover:text-emerald-600"
								>Sign up for free</a
							>
						</p>
					</div>
				</div>
			</div>
		</div>
	</main>
</div>
