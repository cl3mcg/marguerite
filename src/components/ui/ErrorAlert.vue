<template>
  <TransitionScale group tag="aside" mode="out-in" appear>
    <div
      v-if="show"
      class="absolute right-3 top-3 mb-4 flex w-full max-w-xs items-center rounded-lg border border-red-500 bg-white p-4 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400"
      role="alert"
    >
      <!-- Icon Section -->
      <div
        class="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200"
      >
        <svg
          class="h-5 w-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"
          />
        </svg>
        <span class="sr-only">Error icon</span>
      </div>

      <!-- Message Section -->
      <div class="ms-3 text-sm font-normal">
        <slot></slot>
      </div>

      <!-- Close Button -->
      <button
        type="button"
        class="-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
        data-dismiss-target="#toast-danger"
        v-on:click="handleClose"
        aria-label="Close"
      >
        <span class="sr-only">Close</span>
        <i class="bi bi-x-lg text-gray-500 dark:text-gray-400"></i>
      </button>
    </div>
  </TransitionScale>
</template>

<script setup>
import { ref } from "vue";
import { TransitionScale } from "@morev/vue-transitions";

// Handle show state
const show = ref(true);

// Emit the 'close' event
const emit = defineEmits(["close"]);

const handleClose = () => {
  show.value = false;
  emit("close"); // Emit the 'close' event when the button is clicked
};
</script>
