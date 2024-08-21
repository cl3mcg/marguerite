<template>
  <button
    v-bind:data-popover-target="`popover-description-${indicatorObject.code}`"
    data-popover-placement="bottom-end"
    type="button"
  >
    <i
      class="bi bi-info-circle ms-3 h-4 w-4 text-gray-500 dark:text-gray-400"
    ></i
    ><span class="sr-only">Show information</span>
  </button>
  <div
    data-popover
    v-bind:id="`popover-description-${indicatorObject.code}`"
    role="tooltip"
    class="invisible absolute z-10 inline-block w-72 rounded-lg border border-gray-200 bg-white text-sm text-gray-500 opacity-0 shadow-sm transition-opacity duration-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
  >
    <div class="space-y-2 p-3">
      <h3 class="font-semibold text-gray-900 dark:text-white">
        {{ indicatorObject.name }}
      </h3>
      <p>
        {{ indicatorObject.description }}
      </p>
      <h3 class="font-semibold text-gray-900 dark:text-white">Source</h3>
      <p>
        {{ indicatorObject.source }}
      </p>
      <a
        v-bind:href="indicatorObject.link"
        class="flex items-center font-medium text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-500 dark:hover:text-blue-600"
        >Read more
        <svg
          class="ms-1.5 h-2 w-2 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 9 4-4-4-4"
          /></svg
      ></a>
    </div>
    <div data-popper-arrow></div>
  </div>
</template>

<script setup>
const props = defineProps({
  indicatorObject: {
    type: Object,
    required: true,
  },
});

const indicatorObject = props.indicatorObject;
</script>
