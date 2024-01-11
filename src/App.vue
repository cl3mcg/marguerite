<template>
	<LoadingModal v-if="displayLoadingModal"></LoadingModal>
	<GenericModal></GenericModal>
	<TopNavBar></TopNavBar>
	<FlashMessageWrapper v-if="displayFlash"></FlashMessageWrapper>
	<RouterView></RouterView>
</template>

<script setup>
import LoadingModal from "./components/layout/LoadingModal.vue";
import GenericModal from "./components/layout/GenericModal.vue";
import TopNavBar from "./components/layout/TopNavBar.vue";
import FlashMessageWrapper from "./components/layout/FlashMessageWrapper.vue";

import { ref, watch, onBeforeMount } from "vue";
import { useUserStore } from "./stores/UserStore.js";
const userStore = useUserStore();

const displayLoadingModal = ref(userStore.isLoading.status);
const displayFlash = ref(false);

watch(
	() => userStore.isLoading.status,
	function (newValue) {
		displayLoadingModal.value = newValue;
	}
);

watch(userStore.flashMessages, function () {
	displayFlash.value = true;
});

onBeforeMount(function () {
	if (localStorage.accountToken) {
		userStore.accountToken = localStorage.accountToken;
	}
	window.addEventListener("beforeunload", (event) => {
		if (
			!localStorage.rememberMe &&
			performance.getEntriesByType("navigation")[0].type === "navigate"
		) {
			userStore.logoutAccount();
		}
	});
});
</script>

<style scoped></style>
