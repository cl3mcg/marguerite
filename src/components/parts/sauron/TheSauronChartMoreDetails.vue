<template>
  <button
    v-bind:id="`dropdown-button_${props.indicatorCode}`"
    v-bind:data-dropdown-toggle="`dropdown-details_${props.indicatorCode}`"
    data-dropdown-placement="left"
    data-dropdown-offset-skidding="200"
    class="dark:gray-100 inline-flex items-center rounded-full bg-transparent p-1 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-50 dark:focus:ring-gray-600 md:p-2"
    type="button"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-three-dots"
      viewBox="0 0 16 16"
    >
      <path
        d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"
      />
    </svg>
  </button>
  <div
    v-bind:id="`dropdown-details_${props.indicatorCode}`"
    class="z-10 hidden w-72 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700 sm:w-80 md:w-96"
  >
    <div
      class="flex flex-col items-start p-3 text-center align-middle text-sm font-medium focus:outline-none"
    >
      <main
        class="space-y-2 p-3 text-start text-sm text-gray-500 dark:text-gray-400"
      >
        <header class="text-base font-semibold text-gray-900 dark:text-white">
          {{
            indicators.filter((el) => el.code === props.indicatorCode)[0].name
          }}
        </header>
        <p>
          {{
            indicators.filter((el) => el.code === props.indicatorCode)[0]
              .longDescription
          }}
        </p>
        <h3 class="text-base font-semibold text-gray-900 dark:text-white">
          Source
        </h3>
        <p>
          {{
            indicators.filter((el) => el.code === props.indicatorCode)[0].source
          }}
        </p>
        <a
          v-bind:href="
            indicators.filter((el) => el.code === props.indicatorCode)[0].link
          "
          class="flex items-center text-base font-medium text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-500 dark:hover:text-blue-600"
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
      </main>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import indicatorsJSON from "@assets/data/indicators.json";
const indicators = indicatorsJSON;

const props = defineProps({
  indicatorCode: {
    type: String,
    default: "",
  },
});

onMounted(() => {
  initFlowbite();
});
</script>
