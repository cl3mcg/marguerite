<template>
  <div>
    <p class="mb-2 text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
      Header row selection
    </p>
    <p class="mb-4 text-sm text-gray-900 dark:text-white sm:text-base">
      <span v-if="sheetHeaderRow">
        The <i>Sanitizer</i> tool has automatically detected the header row
        index. If necessary, you can adjust it in the next step. Otherwise, just
        validate the default value.
      </span>
      <span v-else>
        The <i>Sanitizer</i> tool was not able to detect the header row
        automatically. Please confirm the header row index in the next step.
      </span>
    </p>
  </div>
  <div class="mx-auto flex max-w-sm items-center">
    <label for="header-row-confirm" class="sr-only"
      >Confirm the header row number</label
    >
    <div class="relative w-full">
      <div
        v-on:click="lockHeaderRowInput = !lockHeaderRowInput"
        class="pointer-events-auto absolute inset-y-0 start-0 ms-2 flex cursor-pointer items-center text-gray-400 hover:text-gray-700 dark:text-gray-600 dark:hover:text-gray-400"
      >
        <i
          v-bind:class="[
            lockHeaderRowInput
              ? 'bi bi-lock-fill bg-gray-200 text-gray-900 dark:bg-gray-600 dark:text-gray-400'
              : 'bi bi-unlock-fill bg-green-200 text-green-900 dark:bg-green-600 dark:text-green-400',
            'rounded-md px-2 py-1 ',
          ]"
        ></i>
      </div>
      <input
        type="number"
        v-bind:disabled="lockHeaderRowInput"
        v-model="sheetHeaderRowUser"
        id="header-row-confirm"
        v-bind:class="[
          lockHeaderRowInput ? 'cursor-not-allowed' : '',
          'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-14 font-mono text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500',
        ]"
        placeholder="Header row number"
        required
      />
    </div>
    <button
      type="submit"
      v-on:click="validate"
      v-bind:disabled="
        !sheetHeaderRowUser || sheetHeaderRowUser === '' || isLoading
      "
      v-bind:class="
        isLoading
          ? 'relative ms-2 w-52 rounded-lg bg-green-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-800 dark:hover:bg-green-900 dark:focus:ring-green-800 sm:w-60'
          : !sheetHeaderRowUser || sheetHeaderRowUser === ''
            ? 'relative ms-2 w-52 cursor-not-allowed rounded-lg border border-purple-400 bg-purple-400 px-5 py-2.5 text-center text-sm font-medium text-white dark:border-purple-500 dark:bg-purple-500 sm:w-60'
            : 'relative ms-2 w-52 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 sm:w-60'
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
      <span>{{ isLoading ? "Loading..." : "Validate" }}</span>
      <div
        v-show="!isLoading && sheetHeaderRowUser && sheetHeaderRowUser !== ''"
        class="absolute -end-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-yellow-300 text-xs font-bold text-white dark:border-gray-900"
      ></div>
      <div
        v-show="!isLoading && sheetHeaderRowUser && sheetHeaderRowUser !== ''"
        class="absolute -end-2 -top-2 inline-flex h-6 w-6 animate-ping items-center justify-center rounded-full border-2 border-white bg-yellow-300 text-xs font-bold text-white dark:border-gray-900"
      ></div>
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useSanitizerStore } from "@/stores/SanitizerStore.js";
const sanitizerStore = useSanitizerStore();

const props = defineProps({
  isLoading: Boolean,
});

const { sheetHeaderRow } = storeToRefs(sanitizerStore);
const { sheetHeaderRowUser } = storeToRefs(sanitizerStore);

// const isLoading = ref(false);

const lockHeaderRowInput = ref(true);

const emits = defineEmits(["validate"]);

const isSelectionValid = function () {
  return sheetHeaderRowUser && sheetHeaderRowUser !== "";
};

const validate = function () {
  return isSelectionValid ? emits("validate") : null;
};
</script>
