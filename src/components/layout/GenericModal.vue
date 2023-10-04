<template>
	<div v-if="modalData" class="overlay">
		<dialog
			tabindex="0"
			class="modal"
			v-bind:open="isOpened"
			v-on:keydown.esc="isOpened = false"
		>
			<header>{{ userStore.shownModal.title }}</header>
			<main>{{ userStore.shownModal.message }}</main>
			<footer>
				<button
					v-for="option in userStore.shownModal.options"
					v-on:click="isOpened = false"
				>
					{{ option }}
				</button>
			</footer>
		</dialog>
	</div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useUserStore } from "../../stores/UserStore.js";

const userStore = useUserStore();
const modalData = computed(() =>
	userStore.shownModal ? userStore.shownModal : false
);
const isOpened = ref(true);
watch(isOpened, function () {
	if (!isOpened.value) {
		userStore.shownModal = null;
	}
});
</script>

<style scoped>
.overlay {
	z-index: 1;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: var(--primary-dark-overlay);
}

dialog {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 50%;
	height: auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1em;
	color: var(--primary-darker);
	background-color: var(--primary-lighter);
	border: 3px solid var(--primary-darker);
	box-shadow: 10px 10px 0px var(--primary-darker);
	transition: ease-in-out 0.1s;
}
.modal header {
	padding: 0 0.5em;
	font-size: 1.25em;
	font-weight: 600;
	background-color: var(--primary-dark);
	color: var(--primary-light);
}
.modal main {
	flex-grow: 1;
	text-align: justify;
}
.modal footer {
	display: flex;
	flex-direction: row;
	gap: 1em;
}
.modal footer button {
	width: 8em;
}
@media screen and (max-width: 600px) {
	.modal {
		width: 20em;
	}
	.modal footer button {
		width: 7em;
	}
}
</style>
