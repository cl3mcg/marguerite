<template>
  <p class="mb-2 text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
    Processing Excel File
  </p>
  <p class="mb-8 text-sm text-gray-900 dark:text-white sm:text-base">
    Further information is required to process the file uploaded.
  </p>
  <p class="mb-2 text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
    Sheet selection
  </p>
  <p class="mb-4 text-sm text-gray-900 dark:text-white sm:text-base">
    Select the sheet to process within the Excel workbook. You should choose the
    spreadsheet containing the table with the data to clean.
  </p>
  <div>
    <ul class="grid grid-cols-2 gap-1 sm:gap-2 md:grid-cols-3 md:gap-4">
      <li
        v-for="sheet in sheetsDetected"
        v-bind:key="sheetsDetected.indexOf(sheet)"
      >
        <input
          type="radio"
          v-bind:id="`bordered-radio-${sheetsDetected.indexOf(sheet)}`"
          name="sheet"
          v-bind:value="sheet"
          v-model="sheetSelectedName"
          class="peer hidden"
        />
        <label
          v-bind:for="`bordered-radio-${sheetsDetected.indexOf(sheet)}`"
          class="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-3 text-gray-500 hover:bg-gray-100 hover:text-gray-600 peer-checked:border-purple-600 peer-checked:text-purple-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-purple-500"
        >
          <div class="block truncate">
            <div class="text-md w-full truncate font-semibold">{{ sheet }}</div>
            <div class="w-full text-sm">
              Sheet Nº<span class="ms-1 font-mono">{{
                sheetsDetected.indexOf(sheet) + 1
              }}</span>
            </div>
          </div>
        </label>
      </li>
    </ul>
    <div
      v-if="showUploadButton && !showHeaderRowDetected"
      class="mt-10 flex flex-col items-center justify-center"
    >
      <button
        v-on:click="processSheetSelection"
        v-bind:disabled="isLoading"
        type="button"
        v-bind:class="
          isLoading
            ? 'relative rounded-lg bg-green-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-800 dark:hover:bg-green-900 dark:focus:ring-green-800'
            : 'relative rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
        "
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
        <i v-else class="bi bi-file-earmark-bar-graph-fill me-2"></i
        >{{ isLoading ? "Loading..." : "Process the sheet" }}
        <div
          v-show="!isLoading"
          class="absolute -end-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-yellow-300 text-xs font-bold text-white dark:border-gray-900"
        ></div>
        <div
          v-show="!isLoading"
          class="absolute -end-2 -top-2 inline-flex h-6 w-6 animate-ping items-center justify-center rounded-full border-2 border-white bg-yellow-300 text-xs font-bold text-white dark:border-gray-900"
        ></div>
      </button>
    </div>
    <div class="mt-10 flex flex-col items-center justify-center">
      <TheSanitizerProcessSectionHeaderRowConfirmation
        v-if="showHeaderRowDetected"
        v-bind:isLoading="isLoading"
        v-on:validate="processSheetCountryData"
      ></TheSanitizerProcessSectionHeaderRowConfirmation>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { storeToRefs } from "pinia";

import TheSanitizerProcessSectionHeaderRowConfirmation from "./TheSanitizerProcessSectionHeaderRowConfirmation.vue";

import { useSanitizerStore } from "@/stores/SanitizerStore.js";
const sanitizerStore = useSanitizerStore();

const { sheetsDetected } = storeToRefs(sanitizerStore);
const { sheetSelectedName } = storeToRefs(sanitizerStore);
const { backendFileName } = storeToRefs(sanitizerStore);
const { sheetHeaderRow } = storeToRefs(sanitizerStore);
const { sheetHeaderRowUser } = storeToRefs(sanitizerStore);

const isLoading = ref(false);

const showUploadButton = computed(
  () =>
    backendFileName.value &&
    sheetsDetected.value.length &&
    sheetSelectedName.value &&
    sheetSelectedName.value !== "",
);

const showHeaderRowDetected = ref(false);
watch(sheetHeaderRow, (newValue) => {
  if (newValue) {
    showHeaderRowDetected.value = true;
  } else {
    showHeaderRowDetected.value = false;
  }
});

watch(sheetSelectedName, (newValue) => {
  if (newValue) {
    sanitizerStore.sheetSelectedName = newValue;
  }
});

const processSheetCountryData = async function () {
  isLoading.value = true;
  try {
    const sheetCountryDataResponse = await fetch(
      "/backend/sanitizer/processCountryData",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: backendFileName.value,
          sheetName: sheetSelectedName.value,
          headerRowNum: sheetHeaderRowUser.value,
        }),
      },
    );
    if (sheetCountryDataResponse.ok) {
    }
  } catch (error) {
    console.error("Error processing sheet country data:", error);
  } finally {
    isLoading.value = false;
  }
};

const processSheetSelection = async function () {
  isLoading.value = true;
  try {
    const sheetHeaderResponse = await fetch(
      "/backend/sanitizer/findHeaderRow",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: backendFileName.value,
          sheetName: sheetSelectedName.value,
        }),
      },
    );
    if (sheetHeaderResponse.ok) {
      const sheetHeaderData = await sheetHeaderResponse.json();
      sheetHeaderRow.value = sheetHeaderData.parsedHeaderRow.headerRowNum;
      sheetHeaderRowUser.value = sheetHeaderData.parsedHeaderRow.headerRowNum;
      processSheetCountryData();
    }
  } catch (error) {
  } finally {
    isLoading.value = false;
  }
};

watch(sheetHeaderRow, (newValue) => {
  if (newValue) {
    console.log(sheetHeaderRow.value);
  }
});
</script>
