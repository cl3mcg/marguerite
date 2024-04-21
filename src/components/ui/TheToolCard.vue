<template>
  <router-link
    v-bind:disabled="!userIsLoggedIn"
    v-bind:to="userIsLoggedIn ? toolData.toolRoute : ''"
    class="relative block w-full overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800 md:py-12"
    v-bind:class="
      userIsLoggedIn
        ? 'hover:bg-gray-100 dark:hover:bg-gray-700'
        : 'cursor-not-allowed'
    "
  >
    <h5
      class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
    >
      {{ toolData.toolName }}
    </h5>
    <p class="font-normal text-gray-700 dark:text-gray-400">
      {{ toolData.toolDescription }}
    </p>
    <div
      v-if="!userIsLoggedIn"
      class="absolute right-2 top-2 inline-flex items-center rounded-lg bg-red-600 px-1.5 py-1.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-lock-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"
        />
      </svg>
    </div>
    <div class="absolute -bottom-5 -right-5 max-h-28 max-w-28">
      <iconSonar v-if="toolData.toolName === 'Sonar'"></iconSonar>
      <iconSauron v-if="toolData.toolName === 'Sauron'"></iconSauron>
      <iconSuperviseur
        v-if="toolData.toolName === 'Superviseur'"
      ></iconSuperviseur>
    </div>
  </router-link>
</template>

<script setup>
import iconSonar from "@components/icons/iconSonar.vue";
import iconSauron from "@components/icons/iconSauron.vue";
import iconSuperviseur from "@components/icons/iconSuperviseur.vue";

const props = defineProps({
  toolData: {
    type: Object,
  },
  userIsLoggedIn: {
    type: Boolean,
  },
});
</script>
