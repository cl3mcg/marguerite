<template>
  <aside
    id="drawer-right-sauron"
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
      id="drawer-right-sauron-close-button"
      data-drawer-hide="drawer-right-sauron"
      aria-controls="drawer-right-sauron"
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
      Country selection
    </h3>
    <p class="mb-4 text-sm text-gray-500 dark:text-gray-400">
      Select some countries to investigate.
    </p>
    <div class="mb-4 grid grid-cols-2 gap-4">
      <TheSauronDrawerCountrySelectionDropdown
        v-on:update-country="updateSelectedCountry"
      ></TheSauronDrawerCountrySelectionDropdown>
    </div>
    <h3
      class="mb-2 mt-4 items-center text-base font-semibold text-gray-500 dark:text-gray-400"
    >
      Indicator selection
    </h3>
    <p class="mb-4 text-sm text-gray-500 dark:text-gray-400">
      Select the economic and/or the logistic indicator to study.
    </p>
    <div class="mb-4 grid grid-cols-2 gap-4">
      <TheSauronDrawerEconomyDropdown
        v-on:update-economy="updateSelectedEcoIndicator"
      ></TheSauronDrawerEconomyDropdown>
      <TheSauronDrawerLogisticsDropdown
        v-on:update-logistics="updateSelectedLogIndicator"
      ></TheSauronDrawerLogisticsDropdown>
    </div>
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
        {{ isLoading ? "Loading..." : "Get the data" }}
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
const emit = defineEmits(["update-data"]);

import { modalClose } from "@composables/modalClose.js";

import { useUserStore } from "@stores/UserStore.js";
const userStore = useUserStore();

import TheSauronDrawerCountrySelectionDropdown from "@components/parts/sauron/TheSauronDrawerCountrySelectionDropdown.vue";
import TheSauronDrawerEconomyDropdown from "@components/parts/sauron/TheSauronDrawerEconomyDropdown.vue";
import TheSauronDrawerLogisticsDropdown from "@components/parts/sauron/TheSauronDrawerLogisticsDropdown.vue";

const isLoading = ref(false);

const backendData = reactive({});

const selection = reactive({
  selectedCountry: [],
  selectedLogisticIndicator: [],
  selectedEconomyIndicator: [],
  selectedIndicator: function () {
    const set = new Array(
      this.selectedLogisticIndicator,
      this.selectedEconomyIndicator,
    );
    return set.flat();
  },
  isValid: function () {
    return (
      this.selectedCountry.length > 0 && this.selectedIndicator().length > 0
    );
  },
});

const updateSelectedCountry = function (newCountrySelection) {
  selection.selectedCountry = newCountrySelection;
};

const updateSelectedEcoIndicator = function (newEcoIndicatorSelection) {
  selection.selectedEconomyIndicator = newEcoIndicatorSelection;
};

const updateSelectedLogIndicator = function (newIndicatorSelection) {
  selection.selectedLogisticIndicator = newIndicatorSelection;
};

const retrieveIndicatorData = async function () {
  userStore.isLoading.status = true;
  isLoading.value = true;
  try {
    const response = await fetch(`/backend/indicator/getIndicator`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        countryCodes: selection.selectedCountry,
        indicatorCodes: selection.selectedIndicator(),
      }),
    });
    const responseData = await response.json();

    if (response.ok) {
      backendData.data = responseData.data;
      emit("update-data", backendData.data);
      return;
    } else {
      userStore.triggerFlash(
        "danger",
        "Error",
        "An error occurred while retrieving the data.",
      );
      return;
    }
  } catch (error) {
    userStore.triggerFlash(
      "danger",
      "Error",
      "An error occurred while retrieving the data.",
    );
  } finally {
    userStore.isLoading.status = false;
    isLoading.value = false;
  }
};

const newSelection = async function () {
  if (!selection.isValid()) {
    userStore.triggerFlash(
      "warning",
      "Invalid data provided",
      "The selection is not valid.",
    );
    return;
  }
  await retrieveIndicatorData(); // Wait for indicator data retrieval

  // Hide selection menu and display data recap only if successful
  modalClose("#drawer-right-sauron-close-button");
  // Here add some login to pass the data to the page for chart rendering
};
</script>
