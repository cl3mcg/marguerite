<template>
  <section
    class="container grid max-w-screen-xl grid-cols-1 flex-col items-center px-5 py-5 text-gray-900 dark:text-white md:mx-auto"
  >
    <header class="relative mb-4 max-w-screen-xl grow">
      <h1 class="whitespace-nowrap align-middle text-4xl font-bold">Sauron</h1>
      <div class="absolute right-0 top-0">
        <button
          class="me-2 inline-flex items-center rounded-lg bg-purple-700 px-3.5 py-2.5 text-center text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
          type="button"
          data-drawer-target="drawer-right-sauron"
          data-drawer-show="drawer-right-sauron"
          data-drawer-placement="right"
          aria-controls="drawer-right-sauron"
        >
          <i class="bi bi-list sm:hidden"></i>
          <span class="hidden sm:inline">Menu</span>
        </button>
      </div>
    </header>
    <main class="mt-1 flex h-full min-h-96 items-center justify-center md:mt-4">
      <KeepAlive>
        <TheSauronDrawer
          v-on:update-data="updateDataReceived"
        ></TheSauronDrawer>
      </KeepAlive>
      <TheNoSelectionPanel
        v-if="
          !displayedData.data ||
          (Object.keys(displayedData.data)?.length === 0 &&
            displayedData.constructor === Object)
        "
        v-bind:toolName="'sauron'"
      >
        Use the <i>Menu</i> button to make a selection and retrieve data.
      </TheNoSelectionPanel>
      <div
        v-else-if="Object.keys(displayedData.data).length === 1"
        class="grid w-full grid-cols-1 gap-x-2 gap-y-2 md:gap-x-4 md:gap-y-4"
      >
        <KeepAlive>
          <TheSauronChart
            class="rounded-md border bg-gray-200"
            v-for="(object, key) in displayedData.data"
            v-bind:indicatorData="object"
            v-bind:indicatorCode="key"
            v-bind:key="key"
          >
          </TheSauronChart>
        </KeepAlive>
      </div>
      <div
        v-else-if="Object.keys(displayedData.data).length > 1"
        class="grid w-full grid-cols-1 gap-x-2 gap-y-2 md:grid-cols-2 md:gap-x-4 md:gap-y-4"
      >
        <KeepAlive>
          <TheSauronChart
            class="rounded-md border bg-gray-200"
            v-for="(object, key) in displayedData.data"
            v-bind:indicatorData="object"
            v-bind:indicatorCode="key"
            v-bind:key="key"
          >
          </TheSauronChart>
        </KeepAlive>
      </div>
    </main>
  </section>
</template>

<script setup>
import { reactive, onMounted } from "vue";

import TheNoSelectionPanel from "@components/ui/TheNoSelectionPanel.vue";
import TheSauronDrawer from "@components/parts/sauron/TheSauronDrawer.vue";
import TheSauronChart from "@components/parts/sauron/TheSauronChart.vue";

const displayedData = reactive({});

const updateDataReceived = function (backendData) {
  displayedData.data = backendData;
};

onMounted(() => {
  initFlowbite();
});
</script>
