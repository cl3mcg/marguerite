<template>
  <aside
    id="drawer-right-sonar"
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
      id="drawer-right-sonar-close-button"
      data-drawer-hide="drawer-right-sonar"
      aria-controls="drawer-right-sonar"
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
      class="mb-2 mt-4 items-center text-base font-semibold text-gray-500 dark:text-gray-400"
    >
      Port selection
    </h3>
    <p class="mb-4 text-sm text-gray-500 dark:text-gray-400">
      Select the port of loading and port of destination.
    </p>
    <div class="mb-4 grid grid-cols-2 gap-4">
      <TheSonarDrawerPolSelectionDropdown
        v-bind:portsAvailable="portsAvailable"
        v-on:update-pol="updatePolSelection"
      ></TheSonarDrawerPolSelectionDropdown>
      <TheSonarDrawerPodSelectionDropdown
        v-bind:portsAvailable="portsAvailable"
        v-on:update-pod="updatePodSelection"
      ></TheSonarDrawerPodSelectionDropdown>
    </div>
    <h3
      class="mb-2 mt-4 items-center text-base font-semibold text-gray-500 dark:text-gray-400"
    >
      Date selection
    </h3>
    <p class="mb-4 text-sm text-gray-500 dark:text-gray-400">
      Select a date range.
    </p>
    <div class="mb-4">
      <div class="mb-3 grid grid-cols-3 gap-4">
        <button
          type="button"
          class="w-full rounded-lg bg-purple-700 px-3 py-2 text-center text-xs font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
          v-on:click="setPredefinedDateRange(3)"
        >
          Last 3 months
        </button>
        <button
          type="button"
          class="w-full rounded-lg bg-purple-700 px-3 py-2 text-center text-xs font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
          v-on:click="setPredefinedDateRange(4)"
        >
          Last 4 months
        </button>
        <button
          type="button"
          class="w-full rounded-lg bg-purple-700 px-3 py-2 text-center text-xs font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
          v-on:click="setPredefinedDateRange(5)"
        >
          Last 5 months
        </button>
      </div>

      <TheSonarDrawerDateRangePicker
        v-model="predefinedDateRange"
        v-on:update-date="updateDateSelection"
      ></TheSonarDrawerDateRangePicker>
    </div>
    <h3
      class="mb-2 mt-4 items-center text-base font-semibold text-gray-500 dark:text-gray-400"
    >
      Carrier selection
    </h3>
    <p class="mb-4 text-sm text-gray-500 dark:text-gray-400">
      Select the carriers.
    </p>
    <div class="mb-5">
      <TheSonarDrawerCarrierSelectionDropdown
        v-on:update-carrier="updateCarrierSelection"
      ></TheSonarDrawerCarrierSelectionDropdown>
    </div>
    <h3
      class="mb-2 mt-4 items-center text-base font-semibold text-gray-500 dark:text-gray-400"
    >
      Modality
    </h3>
    <p class="mb-4 text-sm text-gray-500 dark:text-gray-400">
      Select the modality of what the results should include.
    </p>
    <ul
      class="w-full items-center rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:flex"
    >
      <li
        class="w-full border-b border-gray-200 dark:border-gray-600 sm:border-b-0 sm:border-r"
      >
        <div class="flex items-center ps-3">
          <input
            v-model="selection.selectedModality"
            id="horizontal-list-radio-license"
            type="radio"
            value="freight"
            name="list-radio"
            class="h-4 w-4 border-gray-300 bg-gray-100 text-purple-600 focus:ring-2 focus:ring-purple-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-purple-600 dark:focus:ring-offset-gray-700"
          />
          <label
            for="horizontal-list-radio-license"
            class="ms-2 w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Only Freight
          </label>
        </div>
      </li>
      <li class="w-full dark:border-gray-600">
        <div class="flex items-center ps-3">
          <input
            v-model="selection.selectedModality"
            id="horizontal-list-radio-passport"
            type="radio"
            value="freight+surcharges"
            name="list-radio"
            class="h-4 w-4 border-gray-300 bg-gray-100 text-purple-600 focus:ring-2 focus:ring-purple-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-purple-600 dark:focus:ring-offset-gray-700"
          />
          <label
            for="horizontal-list-radio-passport"
            class="ms-2 w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Freight & Surcharges</label
          >
        </div>
      </li>
    </ul>
    <div class="mb-5 mt-auto">
      <hr class="mb-5" />
      <button
        v-on:click="newSelection"
        type="button"
        v-bind:class="
          isLoading
            ? 'me-2 w-full rounded-lg bg-green-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-800 dark:hover:bg-green-900 dark:focus:ring-green-800'
            : 'me-2 w-full rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
        "
        v-bind:disabled="isLoading"
      >
        <svg
          v-if="isLoading"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-flower2 me-3 inline animate-spin text-base text-white"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 16a4 4 0 0 0 4-4 4 4 0 0 0 0-8 4 4 0 0 0-8 0 4 4 0 1 0 0 8 4 4 0 0 0 4 4m3-12q0 .11-.03.247c-.544.241-1.091.638-1.598 1.084A3 3 0 0 0 8 5c-.494 0-.96.12-1.372.331-.507-.446-1.054-.843-1.597-1.084A1 1 0 0 1 5 4a3 3 0 0 1 6 0m-.812 6.052A3 3 0 0 0 11 8a3 3 0 0 0-.812-2.052c.215-.18.432-.346.647-.487C11.34 5.131 11.732 5 12 5a3 3 0 1 1 0 6c-.268 0-.66-.13-1.165-.461a7 7 0 0 1-.647-.487m-3.56.617a3 3 0 0 0 2.744 0c.507.446 1.054.842 1.598 1.084q.03.137.03.247a3 3 0 1 1-6 0q0-.11.03-.247c.544-.242 1.091-.638 1.598-1.084m-.816-4.721A3 3 0 0 0 5 8c0 .794.308 1.516.812 2.052a7 7 0 0 1-.647.487C4.66 10.869 4.268 11 4 11a3 3 0 0 1 0-6c.268 0 .66.13 1.165.461.215.141.432.306.647.487M8 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2"
          />
        </svg>
        <i v-else class="bi bi-cloud-arrow-down me-3 text-base"></i>
        {{ isLoading ? "Loading..." : "Get the rate trends" }}
      </button>
    </div>
  </aside>
</template>

<script setup>
import { onMounted, ref, reactive, watch } from "vue";
const emit = defineEmits(["update-data"]);

import TheSonarDrawerPolSelectionDropdown from "./TheSonarDrawerPolSelectionDropdown.vue";
import TheSonarDrawerPodSelectionDropdown from "./TheSonarDrawerPodSelectionDropdown.vue";
import TheSonarDrawerDateRangePicker from "./TheSonarDrawerDateRangePicker.vue";
import TheSonarDrawerCarrierSelectionDropdown from "./TheSonarDrawerCarrierSelectionDropdown.vue";

import { retrieveRates } from "@composables/sonarRetrieveRates.js";
import { modalClose } from "@composables/modalClose.js";

import { useUserStore } from "@stores/UserStore.js";
const userStore = useUserStore();

const isLoading = ref(false);

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
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const latestDay = yesterday;
  const earliestDay = new Date(today);
  earliestDay.setMonth(today.getMonth() - number);

  if (today && latestDay && earliestDay) {
    return (predefinedDateRange.value = [earliestDay, latestDay]);
  } else {
    return false;
  }
};

watch(predefinedDateRange, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    selection.selectedDates = predefinedDateRange.value;
  }
});

const selection = reactive({
  selectedPOL: [],
  selectedPOD: [],
  selectedDates: [],
  selectedCarriers: [],
  selectedModality: "freight",
  isValid: function () {
    if (
      this.selectedPOL.length > 0 &&
      this.selectedPOD.length > 0 &&
      this.selectedDates &&
      this.selectedCarriers.length > 0
    ) {
      return true;
    }
    return false;
  },
});

const updatePolSelection = function (newPolSelection) {
  selection.selectedPOL = newPolSelection;
};
const updatePodSelection = function (newPodSelection) {
  selection.selectedPOD = newPodSelection;
};
const updateDateSelection = function (newDateSelection) {
  selection.selectedDates = newDateSelection;
};
const updateCarrierSelection = function (newCarrierSelection) {
  selection.selectedCarriers = newCarrierSelection;
};

const newSelection = async function () {
  isLoading.value = true;
  if (!selection.isValid()) {
    isLoading.value = false;
    return;
  }
  const includeSurcharge =
    selection.selectedModality === "freight+surcharges" ? true : false;
  const request = await retrieveRates(userStore, selection);
  if (request) {
    const dataReceieved = request;
    emit("update-data", dataReceieved, includeSurcharge);
    modalClose("#drawer-right-sonar-close-button");
    isLoading.value = false;
    return;
  }
  isLoading.value = false;
  return;
};
</script>
