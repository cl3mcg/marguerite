<template>
  <section
    class="container grid max-w-screen-xl grid-cols-1 flex-col items-center px-5 py-5 text-gray-900 dark:text-white md:mx-auto"
  >
    <!-- <div class="flex items-center justify-center"> -->
    <header class="relative mb-4 max-w-screen-xl grow">
      <h1 class="whitespace-nowrap align-middle text-4xl font-bold">Sonar</h1>
      <div class="absolute right-0 top-0">
        <button
          class="me-2 inline-flex items-center rounded-lg bg-purple-700 px-3.5 py-2.5 text-center text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
          type="button"
          data-drawer-target="drawer-right-sonar"
          data-drawer-show="drawer-right-sonar"
          data-drawer-placement="right"
          aria-controls="drawer-right-sonar"
        >
          <i class="bi bi-list sm:hidden"></i>
          <span class="hidden sm:inline">Menu</span>
        </button>
      </div>
    </header>
    <!-- </div> -->

    <!-- drawer component -->
    <KeepAlive>
      <TheSonarDrawer v-on:update-data="updateDataReceived"></TheSonarDrawer>
    </KeepAlive>
    <main class="mt-1 flex h-full min-h-96 items-center justify-center md:mt-4">
      <TheNoSelectionPanel
        v-if="
          Object.keys(displayedData).length === 0 &&
          displayedData.constructor === Object
        "
        v-bind:toolName="'sonar'"
      >
        Use the <i>Menu</i> button to make a selection and retrieve data.
      </TheNoSelectionPanel>
      <div
        v-else-if="displayedData.data.length === 1"
        class="grid w-full grid-cols-1 gap-x-2 gap-y-2 md:gap-x-4 md:gap-y-4"
      >
        <KeepAlive>
          <TheSonarChart
            class="rounded-md border bg-gray-200"
            v-for="object in displayedData.data.filter(
              (object) => object.portOfLoading !== object.portOfDestination,
            )"
            v-bind:data="object"
            v-bind:drawerSurchargeSelection="displayedData.includeSurcharge"
          >
          </TheSonarChart>
        </KeepAlive>
      </div>
      <div
        v-else-if="displayedData.data.length > 1"
        class="grid w-full grid-cols-1 gap-x-2 gap-y-2 md:grid-cols-2 md:gap-x-4 md:gap-y-4"
      >
        <KeepAlive>
          <TheSonarChart
            class="rounded-md border bg-gray-200"
            v-for="object in displayedData.data.filter(
              (object) => object.portOfLoading !== object.portOfDestination,
            )"
            v-bind:data="object"
            v-bind:drawerSurchargeSelection="displayedData.includeSurcharge"
            v-bind:key="`${object.portOfLoading}${object.portOfDestination}`"
          >
          </TheSonarChart>
        </KeepAlive>
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

const updateDataReceived = function (updatedData, includeSurcharge) {
  Object.assign(displayedData, updatedData);
  displayedData.includeSurcharge = includeSurcharge;
};

onMounted(() => {
  initFlowbite();
});
</script>
