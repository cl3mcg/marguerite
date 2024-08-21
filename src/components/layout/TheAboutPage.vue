<template>
	<section class="container px-5 py-5 md:mx-auto max-w-screen-md text-gray-900 dark:text-white">
		<h1 class="text-4xl font-bold mb-4">About this app</h1>
		<div class="mb-4">
			<h2 class="text-3xl font-bold mb-3">Why doing this?</h2>
			<p>
				I needed a quick tool to help me visualize and get a grasp on ocean freight rates fluctuations on an handful of trade lanes.
				Additionally I was tired of having to rely on pricy third-party tools, so I made my own: <router-link to="/tools/sonar" class="underline hover:text-purple-700">Sonar</router-link>.
			</p>
			<p>
				Once done with <router-link to="/tools/sonar" class="underline hover:text-purple-700">Sonar</router-link>, I decided to build upon this tool an experiment used to retrieve data from the World Bank to create a dashboard with several indicators and made <router-link to="/tools/sauron" class="underline hover:text-purple-700">Sauron</router-link>.<br>
				At a later stage, I am planning to develop a tool used to build freight forwarding rate cards used in the management of tenders. Not that I am specifically fond of this, but I beleive that it can be interesting to experiment with Excel manipulation programatically.
			</p>
		</div>
		<div class="mb-4">
			<h2 class="text-3xl font-bold mb-3">Is this available for free?</h2>
			<p>
				This tool is placed under the CC BY-NC-SA 4.0 license so, if you're
				planning to use this for personal usage, first of all, your life is not
				really fun (seriously, there are other things to do with your life), and
				second yeah, you can use it for free.
			</p>
			<p>
				If you're working for a company and using this app in your professional
				environment, you can always use this tool for free, but you may not use
				it for commercial purposes (seriously... just don't... it's not a professional tool). You can always contribute to the code and
				also support me.
			</p>
			<p class="flex justify-center align-middle mt-5">
				<a
					class="flex m-2 p-2 justify-center align-middle w-40 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
					href="http://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1"
				>
					<img
						class="h-6 ms-1 align-middle"
						src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"
					/>
					<img
						class="h-6 ms-1 align-middle"
						src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"
					/>
					<img
						class="h-6 ms-1 align-middle"
						src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1"
					/>
					<img
						class="h-6 ms-1 align-middle"
						src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1"
					/>
				</a>
			</p>
		</div>
		<div class="mb-4">
			<h2 class="text-3xl font-bold mb-3">Can I check the code?</h2>
			<p>
				Yes of course you can, long-life to open source.
				Feel free to check everything you want (as long as you feel comfortable reading spaghettis code).
			</p>
			<div class="flex justify-center align-middle mt-5">
				<a href="https://github.com/cl3mcg/marguerite" class="flex justify-center align-middle w-40 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-1.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
					<i class="bi bi-github text-xl"></i>
				</a>
			</div>
		</div>
		<div class="mb-3">
			<h2 class="text-3xl font-bold mb-3">Privacy and personal data collection</h2>
			<p>
				This app doesn't use nasty cookies nor collect any non-essential personal data.
				The following information provided by the user would be collected and stored:
				<ul>
					<li>Email address</li>
				</ul>
				If you wish to have your previously mentioned personal data deleted, you can do so by deleting your account through the account settings page.
				Upon deletion of your account, all information related to it, as well as any other associated information, will be removed.
				You also have the option to modify the email address provided on your account page.
				The app does not retain personal data nor does it sell it to third-party companies.
				The application and databases are hosted in Germany (EU) on a server provided by <a href="https://contabo.com/en/" class="underline hover:text-purple-700">Contabo</a>.
			</p>
		</div>
	</section>
</template>
