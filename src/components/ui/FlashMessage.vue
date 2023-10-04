<template>
	<div>
		<header v-bind:class="props.type">
			<span><slot name="default">Message</slot></span>
			<button v-on:click="closeFlash">×</button>
		</header>
		<main>
			<slot name="message"></slot>
		</main>
	</div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";

const props = defineProps(["id", "type"]);

const emit = defineEmits(["close-flash"]);
const closeFlash = function () {
	emit("close-flash", props.id);
};
</script>

<style scoped>
div {
	height: auto;
	padding: 0.25em 0.5em;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	background-color: var(--primary-lighter);
	border: 3px solid var(--primary-dark);
	width: 100%;
}

div:has(header) {
	background-color: var(--grey-100);
}

div:has(header) header::before {
	content: url(../../assets/icons/sparkle.svg);
	height: 32px;
	width: 32px;
}

header {
	height: 20%;
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 0 1em;
	gap: 0.5em;
}

header span {
	font-size: 1.15em;
	font-weight: 600;
	align-self: center;
	background-color: var(--grey-700);
	color: var(--grey-100);
	padding: 0 0.25em;
}

div:has(header.success) {
	background-color: var(--green-100);
}

header.success span {
	background-color: var(--green-700);
	color: var(--green-100);
}

div:has(header.success) header.success::before {
	content: url(../../assets/icons/checkmark.svg);
	height: 32px;
	width: 32px;
}

div:has(header.warning) {
	background-color: var(--orange-100);
}

header.warning span {
	background-color: var(--orange-700);
	color: var(--orange-100);
}

div:has(header.warning) header.warning::before {
	content: url(../../assets/icons/warning.svg);
	height: 32px;
	width: 32px;
}

div:has(header.danger) {
	background-color: var(--red-100);
}

header.danger span {
	background-color: var(--red-700);
	color: var(--red-100);
}

div:has(header.danger) header.danger::before {
	content: url(../../assets/icons/crossmark.svg);
	height: 32px;
	width: 32px;
}

div:has(header.info) {
	background-color: var(--cyan-100);
}

header.info span {
	background-color: var(--cyan-700);
	color: var(--cyan-100);
}

div:has(header.info) header.info::before {
	content: url(../../assets/icons/information.svg);
	height: 32px;
	width: 32px;
}

header button {
	font-size: 2.5rem;
	border: 2px solid (--primary-dark);
	padding: 0;
	height: 0.8em;
	width: 0.8em;
	margin-left: auto;
	align-self: start;
	justify-self: end;
}
main {
	height: auto;
	font-size: 1em;
	flex-grow: 1;
	width: 100%;
	margin: 0.5em;
	font-size: 0.85em;
}
</style>
