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
        v-bind:userIsAdmin="userIsAdmin"
        v-bind:isAvailable="tool.isAvailable"
      ></TheToolCard>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

import { useUserStore } from "@stores/UserStore.js";
const userStore = useUserStore();

import { isLoggedIn } from "@composables/isLoggedIn.js";
import { validateAdminToken } from "@composables/validateAdminToken.js";

import TheToolCard from "@components/ui/TheToolCard.vue";

const userIsLoggedIn = ref(false);
const userIsAdmin = ref(false);

onMounted(async () => {
  if (!userStore.accountToken) {
    return (userIsLoggedIn.value = false);
  }
  userIsLoggedIn.value = await isLoggedIn();
  userIsLoggedIn.value
    ? (userIsAdmin.value = await validateAdminToken())
    : (userIsAdmin.value = false);
});

watch(
  () => userStore.accountToken,
  async (newToken, oldToken) => {
    if (!newToken) {
      return (userIsLoggedIn.value = false);
    }
    if (newToken !== oldToken) {
      userIsLoggedIn.value = await isLoggedIn();
      userIsLoggedIn.value
        ? (userIsAdmin.value = await validateAdminToken())
        : (userIsAdmin.value = false);
    }
    return;
  },
);

const toolsList = ref([
  {
    toolName: "Sonar",
    isAvailable: true,
    isAdminOnly: false,
    toolRoute: "tools/sonar",
    toolDescription: "Trends of FAK ocean freight rates and data.",
    imgPath: "/src/assets/icons/sonarProjectLogo.svg",
    imgAlt: "A logo used for the Sonar tool",
  },
  {
    toolName: "Sauron",
    isAvailable: true,
    isAdminOnly: false,
    toolRoute: "tools/sauron",
    toolDescription: "Countries' macroeconomy & logistics indicators overview.",
    imgPath: "/src/assets/icons/sauronProjectLogo.svg",
    imgAlt: "A logo used for the Sauron tool",
  },
  {
    toolName: "Sanitizer",
    toolRoute: "tools/sanitizer",
    isAvailable: false,
    isAdminOnly: false,
    toolDescription:
      "A set of tools to clean and validate data from Excel rate cards, in the context of a freight forwarding bidding process.",
    imgPath: "/src/assets/icons/sanitizerProjectLogo.svg",
    imgAlt: "A logo used for the Sanitizer tool",
  },
  {
    toolName: "Superviseur",
    toolRoute: "tools/superviseur",
    isAvailable: false,
    isAdminOnly: true,
    toolDescription:
      "Tracking Sonar's performance, issues and data collection.",
    imgPath: "/src/assets/icons/superviseurProjectLogo.svg",
    imgAlt: "A logo used for the Superviseur tool",
  },
]);
</script>
