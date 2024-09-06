<template class="text-medium">
  <TheTopNavBar></TheTopNavBar>
  <FlashMessageWrapper v-if="displayFlash"></FlashMessageWrapper>
  <div v-if="isHomePage" id="background-wrap">
    <div class="x1">
      <div class="cloud"></div>
    </div>

    <div class="x2">
      <div class="cloud"></div>
    </div>

    <div class="x3">
      <div class="cloud"></div>
    </div>

    <div class="x4">
      <div class="cloud"></div>
    </div>

    <div class="x5">
      <div class="cloud"></div>
    </div>
  </div>
  <RouterView></RouterView>

  <!-- Render TheGrassEffect.vue only when on the home page -->
  <div v-if="isHomePage" class="fixed bottom-0 left-0 w-full">
    <TheGrassEffect></TheGrassEffect>
  </div>
</template>

<script setup>
import TheTopNavBar from "@components/parts/TheTopNavBar.vue";
import FlashMessageWrapper from "@components/parts/FlashMessageWrapper.vue";
import TheGrassEffect from "@components/layout/TheGrassEffect.vue"; // Import the component

import { ref, watch, onBeforeMount, computed } from "vue";
import { useUserStore } from "@stores/UserStore.js";
import { useRouter, useRoute } from "vue-router";
import { accountLogout } from "@composables/accountLogout.js";

const userStore = useUserStore();
const router = useRouter();
const route = useRoute(); // Get the current route

const displayLoadingModal = ref(userStore.isLoading.status);
const displayFlash = ref(false);

// Detect if the current route is the home page
const isHomePage = computed(() => route.path === "/");

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
      accountLogout(userStore, router);
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

<style scoped>
#background-wrap {
  bottom: 0;
  left: 0;
  padding-top: 175px;
  position: fixed;
  right: 0;
  top: 0;
  pointer-events: none;
}

/* KEYFRAMES */

@-webkit-keyframes animateCloud {
  0% {
    margin-left: -1000px;
  }
  100% {
    margin-left: 100%;
  }
}

@-moz-keyframes animateCloud {
  0% {
    margin-left: -1000px;
  }
  100% {
    margin-left: 100%;
  }
}

@keyframes animateCloud {
  0% {
    margin-left: -1000px;
  }
  100% {
    margin-left: 100%;
  }
}

/* ANIMATIONS */

.x1 {
  animation: animateCloud 35s linear infinite;
  transform: scale(0.65);
}

.x2 {
  animation: animateCloud 20s linear infinite;
  transform: scale(0.3);
}

.x3 {
  animation: animateCloud 30s linear infinite;
  transform: scale(0.5);
}

.x4 {
  animation: animateCloud 18s linear infinite;
  transform: scale(0.4);
}

.x5 {
  animation: animateCloud 25s linear infinite;
  transform: scale(0.55);
}

/* OBJECTS */

.cloud {
  background: #f3f4f6;
  background: linear-gradient(to bottom, #f3f4f6 5%, #e5e7eb 100%);
  border-radius: 100px;
  box-shadow: 0 8px 5px rgba(0, 0, 0, 0.1);
  height: 120px;
  position: relative;
  width: 350px;
}

.cloud:after,
.cloud:before {
  background: #f3f4f6;
  content: "";
  position: absolute;
  z-index: -1;
}

.cloud:after {
  border-radius: 100px;
  height: 100px;
  left: 50px;
  top: -50px;
  width: 100px;
}

.cloud:before {
  border-radius: 200px;
  width: 180px;
  height: 180px;
  right: 50px;
  top: -90px;
}

[data-theme="dark"] .cloud {
  background: #4b5563;
  background: linear-gradient(to bottom, #4b5563 5%, #374151 100%);
  box-shadow: 0 8px 5px rgba(255, 255, 255, 0.25);
}

[data-theme="dark"] .cloud:after,
[data-theme="dark"] .cloud:before {
  background: #4b5563;
}
</style>
