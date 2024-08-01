<template>
  <!-- <router-link
    v-bind:disabled="!userIsLoggedIn || !isAvailable"
    v-bind:to="userIsLoggedIn && isAvailable ? toolData.toolRoute : ''"
    class="relative block w-full overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800 md:py-12"
    v-bind:class="
      userIsLoggedIn && isAvailable
        ? 'hover:bg-gray-100 dark:hover:bg-gray-700'
        : 'cursor-not-allowed'
    "
  > -->
  <router-link
    v-bind:disabled="!userIsLoggedIn || !props.isAvailable"
    v-bind:to="props.isAvailable ? props.toolData.toolRoute : ''"
    class="relative block w-full overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800 md:py-12"
    v-bind:class="
      props.isAvailable
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
      v-if="!isAvailable"
      class="absolute right-2 top-2 inline-flex items-center rounded-lg bg-gray-600 px-1.5 py-1.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-800"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-wrench-adjustable"
        viewBox="0 0 16 16"
      >
        <path
          d="M16 4.5a4.5 4.5 0 0 1-1.703 3.526L13 5l2.959-1.11q.04.3.041.61"
        />
        <path
          d="M11.5 9c.653 0 1.273-.139 1.833-.39L12 5.5 11 3l3.826-1.53A4.5 4.5 0 0 0 7.29 6.092l-6.116 5.096a2.583 2.583 0 1 0 3.638 3.638L9.908 8.71A4.5 4.5 0 0 0 11.5 9m-1.292-4.361-.596.893.809-.27a.25.25 0 0 1 .287.377l-.596.893.809-.27.158.475-1.5.5a.25.25 0 0 1-.287-.376l.596-.893-.809.27a.25.25 0 0 1-.287-.377l.596-.893-.809.27-.158-.475 1.5-.5a.25.25 0 0 1 .287.376M3 14a1 1 0 1 1 0-2 1 1 0 0 1 0 2"
        />
      </svg>
      <span class="ml-2">Under construction...</span>
    </div>
    <div
      v-else-if="!userIsLoggedIn"
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
      <span class="ml-2">Requires login</span>
    </div>
    <div
      v-else
      class="absolute right-2 top-2 inline-flex items-center rounded-lg bg-green-600 px-1.5 py-1.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-check-square-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"
        />
      </svg>
      <span class="ml-2">Available</span>
    </div>
    <div
      class="absolute -bottom-4 -right-4 hidden max-h-20 max-w-20 sm:block md:-bottom-5 md:-right-5 md:max-h-28 md:max-w-28"
    >
      <iconSonar v-if="toolData.toolName.toLowerCase() === 'sonar'"></iconSonar>
      <iconSauron
        v-if="toolData.toolName.toLowerCase() === 'sauron'"
      ></iconSauron>
      <iconSuperviseur
        v-if="toolData.toolName.toLowerCase() === 'superviseur'"
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
  isAvailable: {
    type: Boolean,
  },
});
</script>
