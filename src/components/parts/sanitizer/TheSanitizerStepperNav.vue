<template>
  <div class="flex w-full cursor-default justify-between">
    <ol class="flex items-center space-x-8 space-y-0 rtl:space-x-reverse">
      <!-- Step 1 -->
      <li
        v-bind:class="[
          currentStep === 1
            ? 'text-purple-600 dark:text-purple-500'
            : 'text-gray-500 dark:text-gray-400',
          'flex items-center space-x-2.5 rtl:space-x-reverse',
        ]"
        data-tooltip-target="tooltip-bottom-1"
        data-tooltip-placement="bottom"
      >
        <span
          v-bind:class="[
            currentStep === 1
              ? validStep1
                ? 'border-green-600 bg-green-600 text-green-100 dark:border-green-500 dark:bg-green-500 dark:text-green-900'
                : 'border-purple-600 bg-purple-600 text-gray-100 dark:border-purple-500 dark:bg-purple-500 dark:text-gray-900'
              : 'border-gray-500 dark:border-gray-400',
            'relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border',
          ]"
        >
          1
          <div
            v-bind:class="[
              currentStep === 1
                ? validStep1
                  ? 'bg-green-500'
                  : 'bg-yellow-400'
                : '',
              currentStep === 2 ? 'bg-green-500' : '',
              currentStep === 3 ? 'bg-green-500' : '',
              'absolute -end-3 -top-3 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white dark:border-gray-900',
            ]"
          >
            <i
              v-bind:class="[
                currentStep === 1
                  ? validStep1
                    ? 'bi bi-check-lg'
                    : 'bi bi-pencil-fill'
                  : '',
                currentStep === 2 ? 'bi bi-check-lg' : '',
                currentStep === 3 ? 'bi bi-check-lg' : '',
              ]"
            ></i>
          </div>
        </span>
        <span class="hidden bg-none md:inline">
          <h3 class="font-medium leading-tight">File upload</h3>
        </span>
        <div
          id="tooltip-bottom-1"
          role="tooltip"
          class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm dark:bg-gray-700"
        >
          Upload a rate card containing data to be cleaned and sanitized.
          <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
      </li>
      <!-- Step 2 -->
      <li
        v-bind:class="[
          currentStep === 2
            ? 'text-purple-600 dark:text-purple-500'
            : 'text-gray-500 dark:text-gray-400',
          'flex items-center space-x-2.5 rtl:space-x-reverse',
        ]"
        data-tooltip-target="tooltip-bottom-2"
        data-tooltip-placement="bottom"
      >
        <span
          v-bind:class="[
            currentStep === 2
              ? validStep2
                ? 'border-green-600 bg-green-600 text-green-100 dark:border-green-500 dark:bg-green-500 dark:text-green-900'
                : 'border-purple-600 bg-purple-600 text-gray-100 dark:border-purple-500 dark:bg-purple-500 dark:text-gray-900'
              : 'border-gray-500 dark:border-gray-400',
            'relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border',
          ]"
        >
          2
          <div
            v-bind:class="[
              currentStep === 1 ? 'bg-red-500' : '',
              currentStep === 2
                ? validStep2
                  ? 'bg-green-500'
                  : 'bg-yellow-400'
                : '',
              currentStep === 3 ? 'bg-green-500' : '',
              'absolute -end-3 -top-3 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white dark:border-gray-900',
            ]"
          >
            <i
              v-bind:class="[
                currentStep === 1 ? 'bi bi-x-lg' : '',
                currentStep === 2
                  ? validStep2
                    ? 'bi bi-check-lg'
                    : 'bi bi-pencil-fill'
                  : '',
                currentStep === 3 ? 'bi bi-check-lg' : '',
              ]"
            ></i>
          </div>
        </span>
        <span class="hidden bg-none md:inline">
          <h3 class="font-medium leading-tight">Processing</h3>
        </span>
        <div
          id="tooltip-bottom-2"
          role="tooltip"
          class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm dark:bg-gray-700"
        >
          Process the data and review it for any errors or inconsistencies.
          <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
      </li>
      <!-- Step 3 -->
      <li
        v-bind:class="[
          currentStep === 3
            ? 'text-purple-600 dark:text-purple-500'
            : 'text-gray-500 dark:text-gray-400',
          'flex items-center space-x-2.5 rtl:space-x-reverse',
        ]"
        data-tooltip-target="tooltip-bottom-3"
        data-tooltip-placement="bottom"
      >
        <span
          v-bind:class="[
            currentStep === 3
              ? validStep3
                ? 'border-green-600 bg-green-600 text-green-100 dark:border-green-500 dark:bg-green-500 dark:text-green-900'
                : 'border-purple-600 bg-purple-600 text-gray-100 dark:border-purple-500 dark:bg-purple-500 dark:text-gray-900'
              : 'border-gray-500 dark:border-gray-400',
            'relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border',
          ]"
        >
          3
          <div
            v-bind:class="[
              currentStep === 1 ? 'bg-red-500' : '',
              currentStep === 2 ? 'bg-red-500' : '',
              currentStep === 3
                ? validStep3
                  ? 'bg-green-500'
                  : 'bg-yellow-400'
                : '',
              'absolute -end-3 -top-3 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white dark:border-gray-900',
            ]"
          >
            <i
              v-bind:class="[
                currentStep === 1 ? 'bi bi-x-lg' : '',
                currentStep === 2 ? 'bi bi-x-lg' : '',
                currentStep === 3
                  ? validStep3
                    ? 'bi bi-check-lg'
                    : 'bi bi-pencil-fill'
                  : '',
              ]"
            ></i>
          </div>
        </span>
        <span class="hidden bg-none md:inline">
          <h3 class="font-medium leading-tight">Output</h3>
        </span>
        <div
          id="tooltip-bottom-3"
          role="tooltip"
          class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm dark:bg-gray-700"
        >
          Download the cleaned and sanitized data or send it by email.
          <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
      </li>
    </ol>
    <div class="flex content-evenly justify-end">
      <button
        v-on:click="handlePrevious"
        type="button"
        v-bind:disabled="restrictPrevButton"
        v-bind:class="[
          restrictPrevButton
            ? 'cursor-not-allowed border border-purple-300 text-purple-300 focus:ring-purple-100 dark:border-gray-700 dark:text-gray-700 dark:focus:ring-purple-600'
            : 'border border-purple-700 text-purple-700 hover:bg-purple-800 hover:text-white focus:ring-purple-300 dark:border-purple-500 dark:text-purple-500 dark:hover:bg-purple-500 dark:hover:text-white dark:focus:ring-purple-900',
          'mb-2 me-2 rounded-lg px-5 py-2.5 text-center text-sm font-medium focus:outline-none focus:ring-4',
        ]"
      >
        <i class="bi bi-arrow-left md:me-2"></i>
        <span class="hidden md:inline">Previous</span>
      </button>
      <button
        v-on:click="handleNext"
        type="button"
        v-bind:disabled="restrictNextButton"
        v-bind:class="[
          restrictNextButton
            ? 'cursor-not-allowed border border-purple-300 text-purple-300 focus:ring-purple-100 dark:border-gray-700 dark:text-gray-700 dark:focus:ring-purple-600'
            : 'border border-purple-700 text-purple-700 hover:bg-purple-800 hover:text-white focus:ring-purple-300 dark:border-purple-500 dark:text-purple-500 dark:hover:bg-purple-500 dark:hover:text-white dark:focus:ring-purple-900',
          'relative mb-2 me-2 rounded-lg px-5 py-2.5 text-center text-sm font-medium focus:outline-none focus:ring-4',
        ]"
      >
        <span class="hidden md:inline">Next</span>
        <i class="bi bi-arrow-right md:ms-2"></i>
        <div
          v-show="!restrictNextButton"
          class="absolute -end-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-yellow-300 text-xs font-bold text-white dark:border-gray-900"
        ></div>
        <div
          v-show="!restrictNextButton"
          class="absolute -end-2 -top-2 inline-flex h-6 w-6 animate-ping items-center justify-center rounded-full border-2 border-white bg-yellow-300 text-xs font-bold text-white dark:border-gray-900"
        ></div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
const emit = defineEmits(["change-step"]);

import { useSanitizerStore } from "@stores/SanitizerStore.js";
const sanitizerStore = useSanitizerStore();

const currentStep = ref(1);

const handleNext = function () {
  if (currentStep.value < 3) {
    currentStep.value += 1;
    emit("change-step", currentStep.value);
  }
};

const handlePrevious = function () {
  if (currentStep.value > 1) {
    currentStep.value -= 1;
    emit("change-step", currentStep.value);
  }
};

const statusPrevButton = function () {
  if (currentStep.value === 1) {
    return true;
  }
  return false;
};

const statusNextButton = function () {
  if (currentStep.value === 3) {
    return true;
  }
  if (currentStep.value === 1 && !sanitizerStore.validStep1) {
    return true;
  }
  if (currentStep.value === 2 && !sanitizerStore.validStep2) {
    return true;
  }
  return false;
};

const restrictPrevButton = computed(() => statusPrevButton());
const restrictNextButton = computed(() => statusNextButton());

const validStep1 = computed(() => sanitizerStore.validStep1);
const validStep2 = computed(() => sanitizerStore.validStep2);
const validStep3 = computed(() => sanitizerStore.validStep3);
</script>
