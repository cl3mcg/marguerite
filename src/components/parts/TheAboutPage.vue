<template>
	<section>
		<h1>About this app</h1>
		<div>
			<h2>Why doing this?</h2>
			<p>
				Because I am tired of having to rely on the shitty solutions made by
				people who are not using the crap they deliver, and are clearly not the
				sharpest knifes in the kitchen drawer.
			</p>
			<p>
				Freight forwarding is an industry that enjoys the same level of
				technology as Nebuchadrezzar the II<sup>nd</sup>, and I'm done with
				this.
			</p>
		</div>
		<div>
			<h2>Is this available for free?</h2>
			<p>
				This tool is placed under the CC BY-NC-SA 4.0 license so, if you're
				planning to use this for personal usage, first of all, your life is not
				really fun (seriously, there are other things to do with your life), and
				second yeah, you can use it for free.
			</p>
			<p>
				If you're working for a company and using this app in your professional
				environment, you can always use this tool for free, but you may not use
				it for commercial purposes. You can always contribute to the code and
				also support me.
			</p>
			<p>
				<a
					class="button"
					href="http://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1"
				>
					<img
						style="
							height: 22px !important;
							margin-left: 3px;
							vertical-align: text-bottom;
						"
						src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"
					/>
					<img
						style="
							height: 22px !important;
							margin-left: 3px;
							vertical-align: text-bottom;
						"
						src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"
					/>
					<img
						style="
							height: 22px !important;
							margin-left: 3px;
							vertical-align: text-bottom;
						"
						src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1"
					/>
					<img
						style="
							height: 22px !important;
							margin-left: 3px;
							vertical-align: text-bottom;
						"
						src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1"
					/>
				</a>
			</p>
		</div>
		<div>
			<h2>Can I check the code?</h2>
			<p>
				Yeah of course you can check the code, long-life to open source, use
				Firefox, use LibreOffice, use NextCloud, use Linux Mint on your computer
				and Debian on your server, self-host your stuff and ditch all the
				proprietary crap!<br />
				Feel free to check the code and contribute to it.
			</p>
			<div>
				<a class="button" href="">
					<img
						src="../../assets/icons/github.svg"
						alt="The icon of the Github platform"
				/></a>
				<a class="button" href=""
					><img
						src="../../assets/icons/gitlab.svg"
						alt="The icon of the Gitlab platform"
				/></a>
			</div>
		</div>
		<div>
			<h2>Privacy and personal data collection</h2>
			<p>
				This app doesn't use nasty cookies nor collect any non essential personal data.
				The following information provided by the user would be collected and stored:
				<ul>
					<li>Email address</li>
				</ul>
				If you wish your personal data mentionned above to be deleted, you can always delete your account in the account settings page.
				Upon deletion of your account, all information related to it, as well as any other information (if any) will be deleted.
				The app doesn't retain data nor sell it to third-party companies.
				The data provided to this app is stored in France (EU), in <a href="https://www.clever-cloud.com/about-us/">Clever Cloud</a>'s datacenters.
			</p>
		</div>
	</section>
</template>

<script setup></script>

<style scoped>
section {
	margin: 0 30vw 2em 30vw;
}
p {
	text-align: justify;
	text-justify: inter-word;
}
div p:not(:first-of-type) {
	margin-top: 0.75em;
}

div:nth-of-type(2) p:last-of-type {
	display: flex;
	align-items: center;
	justify-content: center;
}

div:nth-of-type(2) p:last-of-type a.button {
	width: 12em;
	height: 3em;
}

div:nth-of-type(3) > div:last-of-type {
	margin-top: 1em;
	display: flex;
	justify-content: space-evenly;
}
div:nth-of-type(3) a.button {
	width: 3em;
	height: 3em;
	display: flex;
	justify-content: center;
	align-items: center;
}
a.button img {
	transition: ease-in-out 0.1s;
	width: 2em;
	-webkit-filter: grayscale(100%);
	filter: grayscale(100%);
}
div>a.button:hover > * {
	-webkit-filter: grayscale(0%);
	filter: grayscale(0%);
}

@media screen and (max-width: 930px) {
	section {
		margin: 10vh;
		margin-top: 0;
	}
}

@media screen and (max-width: 600px) {
	section {
		margin: 10vh 8vw;
		margin-top: 0;
	}
}
</style>
