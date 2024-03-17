<template>
  <aside
    id="drawer-right-example"
    class="fixed right-0 top-0 z-40 flex h-screen w-full translate-x-full flex-col overflow-y-auto bg-white p-4 transition-transform dark:bg-gray-800 sm:w-[70vw] md:w-[50vw] lg:w-[33vw]"
    tabindex="-1"
    aria-labelledby="drawer-right-label"
  >
    <h2
      id="drawer-right-label"
      class="mb-4 items-center text-lg font-semibold text-gray-500 dark:text-gray-400"
    >
      Selection panel
    </h2>
    <button
      type="button"
      data-drawer-hide="drawer-right-example"
      aria-controls="drawer-right-example"
      class="absolute end-2.5 top-2.5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
    >
      <svg
        class="h-3 w-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
      <span class="sr-only">Close menu</span>
    </button>
    <h3
      class="mb-2 items-center text-base font-semibold text-gray-500 dark:text-gray-400"
    >
      Port selection
    </h3>
    <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">
      Select the port of loading and port of destination.
    </p>
    <div class="mb-4 grid grid-cols-2 gap-4">
      <TheSonarDrawerPolSelectionDropdown
        v-bind:portsAvailable
      ></TheSonarDrawerPolSelectionDropdown>
      <TheSonarDrawerPodSelectionDropdown
        v-bind:portsAvailable
      ></TheSonarDrawerPodSelectionDropdown>
    </div>
    <h3
      class="mb-2 items-center text-base font-semibold text-gray-500 dark:text-gray-400"
    >
      Date selection
    </h3>
    <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">
      Select a date range.
    </p>
    <div class="mb-4">
      <div class="mb-3 grid grid-cols-3 gap-4">
        <button
          type="button"
          class="w-full rounded-lg bg-blue-700 px-3 py-2 text-center text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          v-on:click="setPredefinedDateRange(3)"
        >
          Last 3 months
        </button>
        <button
          type="button"
          class="w-full rounded-lg bg-blue-700 px-3 py-2 text-center text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          v-on:click="setPredefinedDateRange(4)"
        >
          Last 4 months
        </button>
        <button
          type="button"
          class="w-full rounded-lg bg-blue-700 px-3 py-2 text-center text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          v-on:click="setPredefinedDateRange(5)"
        >
          Last 5 months
        </button>
      </div>

      <TheSonarDrawerDateRangePicker
        v-bind:predefinedDateRange
      ></TheSonarDrawerDateRangePicker>
    </div>
    <h3
      class="mb-2 items-center text-base font-semibold text-gray-500 dark:text-gray-400"
    >
      Carrier selection
    </h3>
    <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">
      Select the carriers.
    </p>
    <div class="mb-5">
      <TheSonarDrawerCarrierSelectionDropdown></TheSonarDrawerCarrierSelectionDropdown>
    </div>
    <div class="mb-5 mt-auto">
      <hr class="mb-5" />
      <button
        type="button"
        class="me-2 w-full rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        <i class="bi bi-cloud-arrow-down mr-3 text-base"></i>
        Get the rate trends
      </button>
    </div>
  </aside>
</template>

<script setup>
import { onMounted, ref } from "vue";

import TheSonarDrawerPolSelectionDropdown from "./TheSonarDrawerPolSelectionDropdown.vue";
import TheSonarDrawerPodSelectionDropdown from "./TheSonarDrawerPodSelectionDropdown.vue";
import TheSonarDrawerDateRangePicker from "./TheSonarDrawerDateRangePicker.vue";
import TheSonarDrawerCarrierSelectionDropdown from "./TheSonarDrawerCarrierSelectionDropdown.vue";

const portsAvailable = ref([]);
const predefinedDateRange = ref([]);

onMounted(async function () {
  try {
    const response = await fetch(`/backend/rate/getPort`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataReceived = await response.json();

    if (response.ok) {
      portsAvailable.value = dataReceived.data;
      return true;
    } else {
      console.log("Application failed to retrieve the port pairs");
      return false;
    }
  } catch (error) {
    console.error("Error", error);
    return false;
  }
});

const setPredefinedDateRange = function (number) {
  if (!number) {
    return false;
  }
  const today = new Date();
  const latestDay = today;
  const earliestDay = new Date(today);
  earliestDay.setMonth(today.getMonth() - number);

  if (today && latestDay && earliestDay) {
    return (predefinedDateRange.value = [earliestDay, latestDay]);
  } else {
    return false;
  }
};
</script>
