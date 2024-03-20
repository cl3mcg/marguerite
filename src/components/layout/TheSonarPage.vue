<template>
  <section
    class="container max-w-screen-md px-5 py-5 text-gray-900 dark:text-white md:mx-auto"
  >
    <header class="relative mb-4">
      <h1 class="whitespace-nowrap align-middle text-4xl font-bold">Sonar</h1>
      <div class="absolute right-0 top-0">
        <button
          class="me-2 inline-flex items-center rounded-lg bg-blue-700 px-3.5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          data-drawer-target="drawer-right-example"
          data-drawer-show="drawer-right-example"
          data-drawer-placement="right"
          aria-controls="drawer-right-example"
        >
          <i class="bi bi-list sm:hidden"></i>
          <span class="hidden sm:inline">Menu</span>
        </button>
      </div>
    </header>

    <!-- drawer component -->
    <TheSonarDrawer v-on:update-data="updateDataReceived"></TheSonarDrawer>
    <main class="flex h-auto min-h-96 items-center justify-center">
      <TheNoSelectionPanel
        v-if="
          Object.keys(displayedData).length === 0 &&
          displayedData.constructor === Object
        "
      >
        Use the <i>Menu</i> button to make a selection and retrieve data.
      </TheNoSelectionPanel>
      <div
        v-else-if="displayedData.data.length > 0"
        class="grid grid-cols-1 gap-x-2 gap-y-2 md:grid-cols-2 md:gap-x-4 md:gap-y-4"
      >
        <!-- <div
          class="rounded-md border"
          v-for="object in displayedData.data"
          v-bind:key="`${object.portOfLoading}${object.portOfDestination}`"
        >
          {{ object.portOfLoading }} → {{ object.portOfDestination }} |
          {{ object.months.join(", ") }}
        </div> -->
        <TheSonarChart
          class="rounded-md border"
          v-for="object in displayedData.data"
          v-bind:data="object"
        >
        </TheSonarChart>
      </div>
    </main>
  </section>
</template>

<script setup>
import TheNoSelectionPanel from "@components/ui/TheNoSelectionPanel.vue";
import TheSonarDrawer from "@components/parts/sonar/TheSonarDrawer.vue";
import TheSonarChart from "@components/parts/sonar/TheSonarChart.vue";

import { onMounted, reactive } from "vue";
import { initFlowbite } from "flowbite";

const displayedData = reactive({});

const updateDataReceived = function (updatedData) {
  Object.assign(displayedData, updatedData);
};

onMounted(() => {
  initFlowbite();
});
</script>
