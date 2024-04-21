<template>
  <button
    v-bind:id="`dropdown-button_${props.data.portOfLoading}${props.data.portOfDestination}`"
    v-bind:data-dropdown-toggle="`dropdown-details_${props.data.portOfLoading}${props.data.portOfDestination}`"
    data-dropdown-placement="left"
    data-dropdown-offset-skidding="100"
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
    v-bind:id="`dropdown-details_${props.data.portOfLoading}${props.data.portOfDestination}`"
    class="z-10 hidden w-72 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700 sm:w-80 md:w-96"
  >
    <div
      class="flex flex-col items-start p-3 text-center align-middle text-sm font-medium focus:outline-none"
    >
      <header class="text-base font-semibold text-gray-800 dark:text-gray-100">
        {{ props.data.portOfLoading }} →
        {{ props.data.portOfDestination }} average values
        <i
          class="bi bi-info-circle ms-2 text-sm"
          v-bind:data-tooltip-target="`tooltip-average_${props.data.portOfLoading}${props.data.portOfDestination}`"
        ></i>
        <div
          v-bind:id="`tooltip-average_${props.data.portOfLoading}${props.data.portOfDestination}`"
          role="tooltip"
          class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-start text-sm font-medium text-white opacity-0 shadow-sm"
        >
          Average values calculated based on the time frame selected.
          <ul>
            <li><span class="text-xs">T/T stands for transit time</span></li>
            <li><span class="text-xs">T/S stands for transshipment</span></li>
          </ul>
          <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
      </header>
      <main class="p-1 text-sm">
        <div class="flex gap-1 text-start">
          <span
            >T/T:
            {{ Math.round(props.data.average.transitTime) }}
            {{
              Math.round(props.data.average.transitTime) > 1.5 ? "days" : "day"
            }}</span
          >
          <span>
            {{
              Math.ceil(props.data.average.transshipment) < 1
                ? "(Direct)"
                : `(≈${Math.ceil(props.data.average.transshipment).toFixed(0)} T/S)`
            }}</span
          >
        </div>
        <div class="flex gap-1 md:gap-2 lg:gap-4">
          <div class="text-start">
            <span class="me-3"
              >20'GP:
              {{
                props.data.average.oceanFreight20GP ||
                props.data.average.oceanFreight20GP === 0
                  ? "USD"
                  : ""
              }}
              {{
                Math.round(props.data.average.oceanFreight20GP).toLocaleString(
                  "en",
                )
              }}</span
            >
          </div>
          <div class="text-start">
            <span class="me-3"
              >40'GP:
              {{
                props.data.average.oceanFreight40GP ||
                props.data.average.oceanFreight40GP === 0
                  ? "USD"
                  : ""
              }}
              {{
                Math.round(props.data.average.oceanFreight40GP).toLocaleString(
                  "en",
                )
              }}</span
            >
          </div>
          <div class="text-start">
            <span class="me-3"
              >40'HC:
              {{
                props.data.average.oceanFreight40HC ||
                props.data.average.oceanFreight40HC === 0
                  ? "USD"
                  : ""
              }}
              {{
                Math.round(props.data.average.oceanFreight40HC).toLocaleString(
                  "en",
                )
              }}</span
            >
          </div>
        </div>
      </main>
    </div>
    <div
      class="flex flex-col items-start p-3 text-center align-middle text-sm font-medium focus:outline-none"
    >
      <header class="text-base font-semibold text-gray-800 dark:text-gray-100">
        Surcharge selection
      </header>
      <main class="w-full text-sm">
        <ul
          class="w-full justify-start space-y-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownToggleButton"
        >
          <li>
            <div
              class="flex rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <label class="inline-flex w-full cursor-pointer items-center">
                <input
                  type="checkbox"
                  value=""
                  class="peer sr-only"
                  v-model="surchargeToggleValue"
                  v-on:change="toggleSurcharge"
                />
                <div
                  class="peer relative h-5 w-9 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-purple-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:border-gray-500 dark:bg-gray-600 dark:peer-focus:ring-purple-800 rtl:peer-checked:after:translate-x-[-100%]"
                ></div>
                <span
                  class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Include surcharges</span
                >
              </label>
            </div>
          </li>
          <li>
            <div
              class="flex rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <label class="inline-flex w-full cursor-pointer items-center">
                <input
                  type="checkbox"
                  value=""
                  class="peer sr-only"
                  v-model="surchargeDisplayToggleValue"
                  v-on:change="toggleSurchargeDisplay"
                />
                <div
                  class="peer relative h-5 w-9 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-purple-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:border-gray-500 dark:bg-gray-600 dark:peer-focus:ring-purple-800 rtl:peer-checked:after:translate-x-[-100%]"
                ></div>
                <span
                  class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Display surcharges difference</span
                >
              </label>
            </div>
          </li>
        </ul>
      </main>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
const emit = defineEmits(["update-surcharge-selection"]);

const props = defineProps({
  data: {
    type: Object,
    defaults: {},
  },
  drawerSurchargeSelection: {
    type: Boolean,
    default: false,
  },
});

const surchargeToggleValue = ref(props.drawerSurchargeSelection);
const surchargeDisplayToggleValue = ref(false);

const toggleSurcharge = function () {
  emit("update-surcharge-selection", surchargeToggleValue.value);
};

const toggleSurchargeDisplay = function () {
  emit("update-surcharge-display", surchargeDisplayToggleValue.value);
};

onMounted(() => {
  initFlowbite();
});
</script>
