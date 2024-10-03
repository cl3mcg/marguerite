<template>
  <div
    v-bind:id="`flash-message-${props.id}`"
    class="relative z-50 mb-4 w-full min-w-80 rounded-lg border p-4 shadow-lg dark:bg-gray-800"
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
        aria-label="Close"
      >
        <span class="sr-only">Close</span>
        <i class="bi bi-x-lg"></i>
      </button>
    </div>
    <div class="mt-4 text-sm">
      <slot name="message"></slot>
    </div>

    <!-- Timeout progress bar -->
    <div
      class="absolute bottom-0 left-0 mt-3 h-2 rounded-bl-lg"
      v-if="!props.permanent"
      v-bind:class="flashMessageProperties.classProgressBar()"
      :style="{ width: progressBarWidth + '%' }"
    ></div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";

const props = defineProps(["id", "type", "permanent"]);
const emit = defineEmits(["close-flash"]);
const timeoutId = ref(null); // Timeout for automatic dismissal
const intervalId = ref(null); // Interval to reduce the progress bar width
const duration = 5000; // Total duration (5 seconds)
const progressBarWidth = ref(100); // Starting width of the progress bar

// Flash message properties for dynamic class generation
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
  classProgressBar: function () {
    switch (props.type) {
      case "success":
        return "bg-green-600 dark:bg-green-500";
      case "error":
        return "bg-red-600 dark:bg-red-500";
      case "warning":
        return "bg-orange-600 dark:bg-orange-500";
      default:
        return "bg-purple-600 dark:bg-purple-500";
    }
  },
});

// Emit the event to close the flash message
const closeFlash = function () {
  emit("close-flash", props.id); // Emit close event
};

// Setup automatic dismissal and progress bar reduction
onMounted(() => {
  // Start a 5-second timer for automatic dismissal
  timeoutId.value = setTimeout(() => {
    closeFlash();
  }, duration);

  // Reduce the progress bar width every 25ms
  const intervalDuration = 25;
  const decrement = (intervalDuration / (duration * 0.7)) * 100; // Decrease width proportionally
  intervalId.value =
    props.permanent === true
      ? null
      : setInterval(() => {
          progressBarWidth.value -= decrement;
          if (progressBarWidth.value <= 0) {
            closeFlash();
          }
        }, intervalDuration);
});
</script>
