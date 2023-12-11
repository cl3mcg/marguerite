<template>
	<section>
		<h1>Contact</h1>
		<div>
			<h2>Who's doing this?</h2>
			<p>
				Hey, I'm Clément. You can follow me on Mastodon.<br />
				If you are old, you can follow me on Twitter or LinkedIn, but I rarely
				post anything there.
			</p>
			<div>
				<a
					class="button"
					href="https://fosstodon.org/@cl3mcg"
					target="_blank"
					rel="noopener noreferrer"
					tabindex="0"
				>
					<img
						src="../../assets/icons/mastodon.svg"
						alt="The icon of the Mastodon social network"
				/></a>
				<a
					class="button"
					href="https://twitter.com/cl3mcg"
					target="_blank"
					rel="noopener noreferrer"
					tabindex="0"
				>
					<img
						src="../../assets/icons/twitter.svg"
						alt="The icon of the Twitter social network"
					/>
				</a>
				<a
					class="button"
					href="https://www.linkedin.com/in/cl3mcg/?locale=en_US"
					target="_blank"
					rel="noopener noreferrer"
					tabindex="0"
				>
					<img
						src="../../assets/icons/linkedin.svg"
						alt="The icon of the LinkedIn social network"
				/></a>
			</div>
		</div>
		<div>
			<h2>Support</h2>
			<p>
				There are different ways to support this tool and maintain it. Feel free
				to drop me a Paypal.
			</p>
			<div>
				<a
					class="button"
					href="https://paypal.me/clemcg?country.x=FR&locale.x=en_EN"
					target="_blank"
					rel="noopener noreferrer"
					tabindex="0"
				>
					<img
						src="../../assets/icons/money.svg"
						alt="The icon of a golden coin"
				/></a>
			</div>
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
div > div:last-of-type {
	margin-top: 1em;
	display: flex;
	justify-content: space-evenly;
}
div > div:last-of-type a {
	width: 3em;
	height: 3em;
	display: flex;
	justify-content: center;
	align-items: center;
}
div > div:last-of-type img {
	transition: ease-in-out 0.1s;
	width: 2em;
	-webkit-filter: grayscale(100%);
	filter: grayscale(100%);
}
div > div:last-of-type a:hover > * {
	-webkit-filter: grayscale(0%);
	filter: grayscale(0%);
}

@media screen and (max-width: 930px) {
	section {
		margin: 0 10vw;
	}
}

@media screen and (max-width: 600px) {
	section {
		margin: 0 8vw;
	}
}
</style>
