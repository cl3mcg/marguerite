<template>
  <TopNavBar></TopNavBar>
  <FlashMessageWrapper v-if="displayFlash"></FlashMessageWrapper>
  <RouterView></RouterView>
</template>

<script setup>
import TopNavBar from "./components/parts/TopNavBar.vue";
import FlashMessageWrapper from "./components/parts/FlashMessageWrapper.vue";

import { ref, watch, onBeforeMount, onMounted } from "vue";
import { useUserStore } from "./stores/UserStore.js";
const userStore = useUserStore();

const displayLoadingModal = ref(userStore.isLoading.status);
const displayFlash = ref(false);

watch(
  () => userStore.isLoading.status,
  function (newValue) {
    displayLoadingModal.value = newValue;
  },
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
  if (localStorage.language) {
    userStore.language = localStorage.language;
  } else {
    userStore.language = "en-GB";
    localStorage.setItem("language", "en-GB");
  }
});
</script>
