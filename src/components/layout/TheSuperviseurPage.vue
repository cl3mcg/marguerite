<template>
  <section
    class="container grid max-w-screen-xl grid-cols-1 flex-col items-center px-5 py-5 text-gray-900 dark:text-white md:mx-auto"
  >
    <header class="mb-4 max-w-screen-xl grow">
      <h1 class="whitespace-nowrap align-middle text-4xl font-bold">
        Superviseur
      </h1>
    </header>

    <main
      class="mt-1 flex h-full min-h-96 flex-col items-start justify-center md:mt-4"
    >
      <div class="w-full p-4">
        <h2 class="whitespace-nowrap align-middle text-3xl font-bold">
          Current status
        </h2>
        <p>
          <span v-bind:class="statusClass"
            ><span v-bind:class="statusLabelClass">{{ statusText }}</span></span
          ><span
            v-if="currentStatus === 'Running' || currentStatus === 'Paused'"
          >
            {{ statusAction }}
            <span class="font-mono">{{ currentScrappingLane }}</span> on
            <span class="font-mono">{{ currentScrappingCarrier }}</span>
          </span>
        </p>
      </div>
      <div class="w-full flex-grow p-4">
        <h2 class="whitespace-nowrap align-middle text-3xl font-bold">
          Monthly status
        </h2>
        <p>🚧 Under construction 🚧</p>
      </div>
    </main>
  </section>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { initFlowbite } from "flowbite";

onMounted(() => {
  initFlowbite();
});

const currentStatus = ref("Running");
const currentScrappingCarrier = ref("HLCU");
const currentScrappingLane = ref("CNSHA → DEHAM");

const statusClass = computed(() => {
  switch (currentStatus.value) {
    case "Running":
      return "me-2 rounded bg-green-200 px-2.5 py-0.5 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-300";
    case "Paused":
      return "me-2 rounded bg-indigo-100 px-2.5 py-0.5 text-sm font-medium text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300";
    case "Sleeping":
      return "me-2 rounded bg-yellow-100 px-2.5 py-0.5 text-sm font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    default:
      return "me-2 rounded bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800 dark:bg-red-900 dark:text-red-300";
  }
});

const statusLabelClass = computed(() => {
  switch (currentStatus.value) {
    case "Running":
      return "animate-pulse";
    default:
      return "";
  }
});

const statusText = computed(() => {
  switch (currentStatus.value) {
    case "Running":
      return "Running";
    case "Paused":
      return "Paused";
    case "Sleeping":
      return "Sleeping";
    default:
      return "Unknown...";
  }
});

const statusAction = computed(() => {
  switch (currentStatus.value) {
    case "Running":
      return "Scrapping:";
    case "Paused":
      return "Last scrapping:";
    default:
      return "";
  }
});
</script>
