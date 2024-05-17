<template>
  <div
    v-bind:id="`flash-message-${props.id}`"
    class="z-50 mb-4 w-full rounded-lg border p-4 shadow-lg dark:bg-gray-800"
    v-bind:class="flashMessageProperties.class()"
    role="alert"
  >
    <div class="flex items-center">
      <i class="mr-3" v-bind:class="flashMessageProperties.icon()"></i>
      <span class="sr-only">{{ flashMessageProperties.screenReader() }}</span>
      <header class="text-lg font-medium"><slot name="default"></slot></header>
      <button
        v-on:click="closeFlash"
        type="button"
        class="-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg p-1.5 text-gray-400 hover:text-gray-900 focus:ring-2 dark:text-gray-500 dark:hover:text-white"
        v-bind:class="flashMessageProperties.classCloseButton()"
        v-bind:data-dismiss-target="`flash-message-${props.id}`"
        aria-label="Close"
      >
        <span class="sr-only">Close</span>
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
      </button>
    </div>
    <div class="mt-4 text-sm">
      <slot name="message"></slot>
    </div>
    <!-- <div class="flex mt-4">
    <button type="button" class="text-white bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-200 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
      <svg class="me-2 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
        <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
      </svg>
      View more
    </button>
    <button type="button" class="text-purple-800 bg-transparent border border-purple-800 hover:bg-purple-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-purple-600 dark:border-purple-600 dark:text-purple-400 dark:hover:text-white dark:focus:ring-purple-800" v-bind:data-dismiss-target="`flash-message-${props.id}`" aria-label="Close">
      Dismiss
    </button>
  </div> -->
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";

const props = defineProps(["id", "type"]);

const flashMessageProperties = reactive({
  class: function () {
    switch (props.type) {
      case "success":
        return "text-green-800 border-green-300 bg-green-50 dark:text-green-400 dark:border-green-800";
      case "error":
        return "text-red-800 border-red-300 bg-red-50 dark:text-red-400 dark:border-red-800";
      case "warning":
        return "text-orange-800 border-orange-300 bg-orange-50 dark:text-orange-400 dark:border-orange-800";
      default:
        return "text-purple-800 border-purple-300 bg-purple-50 dark:text-purple-400 dark:border-purple-800";
    }
  },
  classCloseButton: function () {
    switch (props.type) {
      case "success":
        return "focus:ring-green-300 hover:bg-green-200 dark:hover:bg-green-700";
      case "error":
        return "focus:ring-red-300 hover:bg-red-200 dark:hover:bg-red-700";
      case "warning":
        return "focus:ring-orange-300 hover:bg-orange-200 dark:hover:bg-orange-700";
      default:
        return "focus:ring-purple-300 hover:bg-purple-200 dark:hover:bg-purple-700";
    }
  },
  icon: function () {
    switch (props.type) {
      case "success":
        return "bi bi-check-circle-fill";
      case "error":
        return "bi bi-x-circle-fill";
      case "warning":
        return "bi bi-exclamation-circle-fill";
      default:
        return "bi bi-info-circle-fill";
    }
  },
  screenReader: function () {
    switch (props.type) {
      case "success":
        return "Check icon";
      case "error":
        return "Cross icon";
      case "warning":
        return "Exclamation mark icon";
      default:
        return "Information icon";
    }
  },
});

const emit = defineEmits(["close-flash"]);
const closeFlash = function () {
  emit("close-flash", props.id);
};
</script>
