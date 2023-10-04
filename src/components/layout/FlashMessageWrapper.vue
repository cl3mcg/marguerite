<template>
	<div class="flash-message-wrapper">
		<FlashMessage
			v-for="flash in flashMessages"
			v-bind:key="flashMessages.indexOf(flash)"
			v-on:close-flash="closeFlash"
			v-bind:type="flash.type"
			v-bind:id="flashMessages.indexOf(flash)"
		>
			<template v-slot:default>{{ flash.title }}</template>
			<template v-slot:message>{{ flash.message }}</template>
		</FlashMessage>
	</div>
</template>

<script setup>
import FlashMessage from "../ui/FlashMessage.vue";

import { computed } from "vue";

import { useUserStore } from "../../stores/UserStore.js";
const userStore = useUserStore();
const flashMessages = computed(() => userStore.flashMessages);

const closeFlash = function (index) {
	userStore.flashMessages.splice(index, 1);
};
</script>

<style scoped>
div.flash-message-wrapper {
	z-index: 1;
	position: absolute;
	top: 4em;
	right: 1.5em;
	width: 25em;
	height: auto;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
}

div div:not(:first-of-type) {
	margin-top: 0.5em;
}

@media screen and (max-width: 600px) {
	div.flash-message-wrapper {
		width: calc(100vw - 4em);
	}
}

@media screen and (max-height: 600px) {
	div.flash-message-wrapper {
		width: calc(100vw - 5em);
		align-items: end;
	}
}
</style>
