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
      console.log("Data retreived");
      backendData.data = responseData.data;
      emit("update-data", backendData.data);
      return;
    } else {
      return console.log("FAIL data retreived");
    }
  } catch (error) {
    return console.error("Error:", error);
  } finally {
    userStore.isLoading.status = false;
    isLoading.value = false;
  }
};

const newSelection = async function () {
  if (!selection.isValid()) {
    console.log(`Selection is invalid`);
    console.log(selection);
    return;
  }
  console.log(`New selection function fired !`);
  console.log(`Selected countries: `, selection.selectedCountry);
  console.log(`Selected indicators: `, selection.selectedIndicator());

  await retrieveIndicatorData(); // Wait for indicator data retrieval

  // Hide selection menu and display data recap only if successful
  modalClose("#drawer-right-sauron-close-button");
  // Here add some login to pass the data to the page for chart rendering
};
</script>
