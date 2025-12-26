<script lang="ts">
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<div class="flex min-h-screen flex-col bg-gradient-to-b from-emerald-50 to-white">
	<main class="mt-16 flex flex-1 items-center justify-center px-8 py-12">
		<div class="grid w-full max-w-6xl items-center gap-16 md:grid-cols-2">
			<div class="order-2 md:order-1">
				<div class="rounded-3xl border border-gray-200 bg-white p-10 shadow-xl">
					<div class="mb-8">
						<h1 class="mb-2 text-3xl font-bold text-gray-900">Create your account</h1>
						<p class="text-gray-600">Start your 14-day free trial. No credit card required.</p>
					</div>

					<form class="space-y-5" method="post">
						<div>
							<label for="name" class="mb-2 block text-sm font-medium text-gray-700"
								>Full Name</label
							>
							<input
								type="text"
								id="name"
								name="name"
								class="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
								placeholder="John Doe"
							/>
						</div>

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
							<label for="password" class="mb-2 block text-sm font-medium text-gray-700"
								>Password</label
							>
							<input
								type="password"
								id="password"
								name="password"
								class="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
								placeholder="Create a strong password"
							/>
							<p class="mt-2 text-xs text-red-500">{form?.message ?? ''}</p>
						</div>

						<!-- <div class="flex items-start gap-3">
							<input
								type="checkbox"
								id="terms"
								name="terms"
								class="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
							/>
							<label for="terms" class="text-sm text-gray-600">
								I agree to the <a
									href="#terms"
									class="font-medium text-emerald-500 hover:text-emerald-600">Terms of Service</a
								>
								and
								<a href="#privacy" class="font-medium text-emerald-500 hover:text-emerald-600"
									>Privacy Policy</a
								>
							</label>
						</div> -->

						<button
							type="submit"
							class="w-full cursor-pointer rounded-xl bg-emerald-500 px-4 py-3.5 font-semibold text-white shadow-lg shadow-emerald-500/30 transition-colors hover:bg-emerald-600 hover:shadow-xl hover:shadow-emerald-500/40"
						>
							Create Account
						</button>
					</form>
				</div>
			</div>

			<div class="order-1 md:order-2">
				<div class="space-y-8">
					<div>
						<h2 class="mb-4 text-4xl font-bold text-gray-900">
							Start managing your time better today
						</h2>
						<p class="text-lg text-gray-600">
							Join thousands of professionals who use TaskFlow to stay organized and productive.
						</p>
					</div>

					<div class="space-y-5">
						<div class="flex gap-4">
							<div
								class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-100"
							>
								<svg
									class="h-5 w-5 text-emerald-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</div>
							<div>
								<h3 class="mb-1 font-semibold text-gray-900">14-day free trial</h3>
								<p class="text-sm text-gray-600">No credit card required. Cancel anytime.</p>
							</div>
						</div>

						<div class="flex gap-4">
							<div
								class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-100"
							>
								<svg
									class="h-5 w-5 text-blue-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</div>
							<div>
								<h3 class="mb-1 font-semibold text-gray-900">AI-powered insights</h3>
								<p class="text-sm text-gray-600">
									Get smart suggestions to optimize your workflow.
								</p>
							</div>
						</div>

						<div class="flex gap-4">
							<div
								class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-purple-100"
							>
								<svg
									class="h-5 w-5 text-purple-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</div>
							<div>
								<h3 class="mb-1 font-semibold text-gray-900">Team collaboration</h3>
								<p class="text-sm text-gray-600">Work together seamlessly with your team.</p>
							</div>
						</div>

						<div class="flex gap-4">
							<div
								class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-orange-100"
							>
								<svg
									class="h-5 w-5 text-orange-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</div>
							<div>
								<h3 class="mb-1 font-semibold text-gray-900">Secure & private</h3>
								<p class="text-sm text-gray-600">Your data is encrypted and protected.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</div>
