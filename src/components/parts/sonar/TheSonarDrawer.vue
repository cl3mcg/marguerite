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
          aria-hidden="true"
          role="status"
          class="me-3 inline h-4 w-4 animate-spin text-white"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="#E5E7EB"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentColor"
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
