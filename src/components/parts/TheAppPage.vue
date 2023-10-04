<template>
	<section>
		<menu>
			<header>
				<span>Menu</span>
				<button v-on:click="menuToogle">{{ menuExpanded ? "―" : "☰" }}</button>
			</header>
			<li v-if="menuExpanded" class="button">General</li>
			<li v-if="menuExpanded" class="button">Change password</li>
			<li v-if="menuExpanded" class="button">Change email</li>
		</menu>
		<main>
			<h1>Account page</h1>
			<div>
				<header>
					<h2>General</h2>
					<span>›</span>
				</header>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
					eligendi alias quis! Nisi, nam dicta. Consequatur minus suscipit
					voluptates, esse dolor cumque veniam harum possimus vitae commodi
					perferendis hic necessitatibus! Voluptas rem, dignissimos asperiores
					iste sint optio eligendi. Veritatis voluptate repellendus similique?
					Sit autem natus culpa corporis maiores, pariatur aliquam optio totam,
					id tenetur, voluptatibus quod. Nemo eaque magni illo.
				</p>
			</div>
			<div>
				<header>
					<h2>Change password</h2>
					<span>›</span>
				</header>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
					eligendi alias quis! Nisi, nam dicta. Consequatur minus suscipit
					voluptates, esse dolor cumque veniam harum possimus vitae commodi
					perferendis hic necessitatibus! Voluptas rem, dignissimos asperiores
					iste sint optio eligendi. Veritatis voluptate repellendus similique?
					Sit autem natus culpa corporis maiores, pariatur aliquam optio totam,
					id tenetur, voluptatibus quod. Nemo eaque magni illo.
				</p>
			</div>
			<div>
				<header>
					<h2>Change Email</h2>
					<span>›</span>
				</header>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
					eligendi alias quis! Nisi, nam dicta. Consequatur minus suscipit
					voluptates, esse dolor cumque veniam harum possimus vitae commodi
					perferendis hic necessitatibus! Voluptas rem, dignissimos asperiores
					iste sint optio eligendi. Veritatis voluptate repellendus similique?
					Sit autem natus culpa corporis maiores, pariatur aliquam optio totam,
					id tenetur, voluptatibus quod. Nemo eaque magni illo.
				</p>
			</div>
		</main>
	</section>
</template>

<script setup>
import { ref } from "vue";

const menuExpanded = ref(true);

const menuToogle = function () {
	menuExpanded.value = !menuExpanded.value;
};
</script>

<style scoped>
section {
	margin: 0 0 2em 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	gap: 1em;
}
main {
	margin: 0 30vw;
	width: 80%;
}

main div header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

main div header span {
	font-size: 2em;
	font-weight: 600;
	margin-right: 2em;
}

details {
	border: 1px solid var(--primary-dark);
	padding: 0.5em 0.5em 0;
}

summary {
	font-weight: bold;
	margin: -0.5em -0.5em 0;
	padding: 0.5em;
}

details[open] {
	padding: 0.5em;
}

details[open] summary {
	border-bottom: 1px solid var(--primary-dark);
	margin-bottom: 0.5em;
}

menu {
	background-color: var(--primary-light-grey);
	padding: 1em;
	margin: 1em;
	width: 10em;
	height: auto;
	position: fixed;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	border: 1px solid var(--primary-dark);
	box-shadow: 5px 5px 0px var(--primary-dark);
	background-color: var(--primary-light-nav);
	overflow: hidden;
}
menu header {
	width: 100%;
	display: flex;
	flex-direction: row;
}
menu header button {
	width: 2em;
	height: 2em;
	display: flex;
	align-items: center;
	justify-content: center;
}
menu header span {
	flex-grow: 1;
	display: flex;
	align-items: center;
}
menu li {
	margin: 0.5em;
	padding: 0 0.5em;
	width: 100%;
}
menu li:first-of-type {
	margin-top: 2em;
}

@media screen and (max-width: 930px) {
	section {
		margin: 0 0 2em 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	menu {
		order: 0;
		position: relative;
		width: auto;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 0.75em;
	}

	menu header {
		width: 100%;
	}

	menu li:first-of-type {
		margin-top: 1em;
	}

	menu li {
		flex-grow: 1;
		width: 100%;
	}

	main {
		margin: 0 2em;
		width: auto;
	}

	main h1 {
		margin-top: 0;
	}
}

@media screen and (max-width: 600px) {
}

@media screen and (max-height: 600px) {
}
</style>
