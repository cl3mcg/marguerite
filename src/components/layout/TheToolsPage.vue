<template>
  <section
    class="container max-w-screen-md px-5 py-5 text-gray-900 dark:text-white md:mx-auto"
  >
    <h1 class="mb-3 text-4xl font-bold">Tools</h1>
    <div class="flex flex-col gap-3 md:gap-5">
      <TheToolCard
        v-for="tool in toolsList"
        v-bind:toolData="tool"
        key="tool.toolName"
        v-bind:userIsLoggedIn="userIsLoggedIn"
      ></TheToolCard>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

import { useUserStore } from "../../stores/UserStore.js";
const userStore = useUserStore();

import { isLoggedIn } from "../../composables/isLoggedIn.js";

import TheToolCard from "../ui/TheToolCard.vue";

const userIsLoggedIn = ref(false);

onMounted(async () => {
  if (!userStore.accountToken) {
    return (userIsLoggedIn.value = false);
  }
  return (userIsLoggedIn.value = await isLoggedIn());
});

watch(
  () => userStore.accountToken,
  async (newToken, oldToken) => {
    if (!newToken) {
      return (userIsLoggedIn.value = false);
    }
    if (newToken !== oldToken) {
      return (userIsLoggedIn.value = await isLoggedIn());
    }
    return;
  },
);

const toolsList = ref([
  {
    toolName: "Sonar",
    toolRoute: "tools/sonar",
    toolDescription: "Trends of FAK ocean freight rates and data.",
    imgPath: "/assets/icons/sonarProjectLogo.svg",
    imgAlt: "A logo used for the Sonar tool",
  },
  {
    toolName: "Sauron",
    toolRoute: "tools/sauron",
    toolDescription: "Countries' macroeconomy & logistics indicators overview.",
    imgPath: "/assets/icons/sauronProjectLogo.svg",
    imgAlt: "A logo used for the Sauron tool",
  },
  {
    toolName: "Superviseur",
    toolRoute: "tools/superviseur",
    toolDescription:
      "Tracking Sonar's performance, issues and data collection.",
    imgPath: "/assets/icons/superviseurProjectLogo.svg",
    imgAlt: "A logo used for the Superviseur tool",
  },
]);
</script>
