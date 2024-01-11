<template>
	<div class="overlay">
		<div class="modal">
			<p class="loader"></p>
			<header>Loading...</header>
			<span v-if="message">{{ message }}</span>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";

import { useUserStore } from "../../stores/UserStore.js";
const userStore = useUserStore();

const message = ref(userStore.isLoading.message);
</script>

<style scoped>
.overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: var(--primary-dark-overlay);
}

.modal {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 25em;
	height: 10em;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	opacity: 1;
	color: var(--primary-darker);
	background-color: var(--primary-lighter);
	border: 3px solid var(--primary-darker);
	box-shadow: 10px 10px 0px var(--primary-darker);
	transition: ease-in-out 0.1s;
}

.modal header {
	margin: 0;
	padding: 0;
	font-size: 1.75em;
	font-weight: 600;
	text-align: center;
}

.loader {
	width: 10em;
	height: 1.5em;
	display: inline-block;
	background-color: var(--primary-dark);
	border: 2px solid var(--primary-dark);
	background: linear-gradient(
			45deg,
			transparent 49%,
			var(--primary-dark) 50%,
			var(--primary-dark) 50%,
			transparent 51%,
			transparent
		),
		linear-gradient(
			-45deg,
			transparent 49%,
			var(--primary-dark) 50%,
			var(--primary-dark) 50%,
			transparent 51%,
			transparent
		);
	color: var(--primary-darker);
	background-size: 1em 1em;
	box-sizing: border-box;
	animation: barStripe 0.3s linear infinite;
}

@keyframes barStripe {
	0% {
		background-position: 1em 0;
	}
	100% {
		background-position: 0 0;
	}
}

@media screen and (max-width: 600px) {
	.modal {
		width: 20em;
	}
}
</style>
