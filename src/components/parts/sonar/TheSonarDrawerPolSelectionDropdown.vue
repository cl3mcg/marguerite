<template>
  <button
    id="dropdown-pol-button"
    data-dropdown-toggle="dropdown-pol-selection"
    data-dropdown-placement="bottom"
    class="inline-flex rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
    type="button"
  >
    <span v-if="!selectedPol || selectedPol.length <= 0" class="truncate"
      >POL selection</span
    >
    <span v-else-if="selectedPol.length === listOfPol.length" class="truncate"
      >All</span
    >
    <span v-else-if="selectedPol.length <= 3" class="truncate">{{
      selectedPol.join(", ")
    }}</span>
    <span v-else class="truncate">{{
      `${selectedPol.slice(0, 3).join(", ")} & ${selectedPol.length - 3} other...`
    }}</span>
  </button>
  <!-- Dropdown menu -->
  <div
    id="dropdown-pol-selection"
    class="z-10 hidden w-60 rounded-lg bg-white shadow dark:bg-gray-700"
  >
    <div class="p-3">
      <label for="dropdown-pol-search" class="sr-only">Search</label>
      <div class="relative">
        <div
          class="rtl:inset-r-0 pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3"
        >
          <svg
            class="h-4 w-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          v-model="searchQuery"
          maxlength="5"
          type="text"
          id="dropdown-pol-search"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500"
          placeholder="Search POL"
        />
      </div>
    </div>
    <ul
      class="h-48 overflow-y-auto px-3 pb-3 text-sm text-gray-700 dark:text-gray-200"
      aria-labelledby="dropdownSearchButton"
    >
      <li v-for="port in filteredPol" v-bind:key="`pol_${port}`">
        <div
          class="flex items-center rounded ps-2 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <input
            type="checkbox"
            v-bind:id="`pol_${port}`"
            v-bind:value="port"
            v-model="selectedPol"
            class="h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100 text-purple-600 focus:ring-2 focus:ring-purple-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-purple-600 dark:focus:ring-offset-gray-700"
          />
          <label
            v-bind:for="`pol_${port}`"
            class="ms-2 w-full cursor-pointer rounded py-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >{{ port }}</label
          >
        </div>
      </li>
    </ul>
    <button
      v-on:click="resetSelection"
      class="flex w-full items-center rounded-b-lg border-t border-gray-200 bg-gray-50 p-3 text-sm font-medium text-red-600 hover:bg-gray-100 hover:underline dark:border-gray-600 dark:bg-gray-700 dark:text-red-500 dark:hover:bg-gray-600"
    >
      <i class="bi bi-x-circle mr-3 text-base"></i>
      Clear
    </button>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
const emit = defineEmits(["update-pol"]);

const props = defineProps({
  portsAvailable: {
    type: Object,
  },
});

watch(
  () => props.portsAvailable,
  (newValue) => {
    if (newValue && newValue.length > 0) {
      listOfPol.value = newValue;
    }
  },
);

const listOfPol = ref([...props.portsAvailable]);
const selectedPol = ref([]);

const resetSelection = function () {
  selectedPol.value = [];
};

watch(selectedPol, () => {
  emit("update-pol", selectedPol);
});

const searchQuery = ref("");
const filteredPol = computed(() => {
  if (!searchQuery.value) {
    return listOfPol.value; // Return all items if search query is empty
  }
  const query = searchQuery.value.toLowerCase();
  return listOfPol.value.filter((port) => port.toLowerCase().includes(query));
});
</script>
