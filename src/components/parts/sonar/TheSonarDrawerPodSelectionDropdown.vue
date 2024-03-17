<template>
  <button
    id="dropdown-pod-button"
    data-dropdown-toggle="dropdown-pod-selection"
    data-dropdown-placement="bottom"
    class="inline-flex rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
    type="button"
  >
    Select a POD
  </button>
  <!-- Dropdown menu -->
  <div
    id="dropdown-pod-selection"
    class="z-10 hidden w-60 rounded-lg bg-white shadow dark:bg-gray-700"
  >
    <div class="p-3">
      <label for="dropdown-pod-search" class="sr-only">Search</label>
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
          type="text"
          id="dropdown-pod-search"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Search POD"
        />
      </div>
    </div>
    <ul
      class="h-48 overflow-y-auto px-3 pb-3 text-sm text-gray-700 dark:text-gray-200"
      aria-labelledby="dropdownSearchButton"
    >
      <li>
        <div
          class="flex items-center rounded ps-2 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <input
            id="checkbox-item-11"
            type="checkbox"
            value=""
            class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
          />
          <label
            for="checkbox-item-11"
            class="ms-2 w-full rounded py-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Bonnie Green</label
          >
        </div>
      </li>
      <li>
        <div
          class="flex items-center rounded ps-2 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <input
            checked
            id="checkbox-item-12"
            type="checkbox"
            value=""
            class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
          />
          <label
            for="checkbox-item-12"
            class="ms-2 w-full rounded py-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Jese Leos</label
          >
        </div>
      </li>
      <li>
        <div
          class="flex items-center rounded ps-2 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <input
            id="checkbox-item-13"
            type="checkbox"
            value=""
            class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
          />
          <label
            for="checkbox-item-13"
            class="ms-2 w-full rounded py-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Michael Gough</label
          >
        </div>
      </li>
      <li>
        <div
          class="flex items-center rounded ps-2 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <input
            id="checkbox-item-14"
            type="checkbox"
            value=""
            class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
          />
          <label
            for="checkbox-item-14"
            class="ms-2 w-full rounded py-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Robert Wall</label
          >
        </div>
      </li>
      <li>
        <div
          class="flex items-center rounded ps-2 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <input
            id="checkbox-item-15"
            type="checkbox"
            value=""
            class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
          />
          <label
            for="checkbox-item-15"
            class="ms-2 w-full rounded py-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Joseph Mcfall</label
          >
        </div>
      </li>
      <li>
        <div
          class="flex items-center rounded ps-2 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <input
            id="checkbox-item-16"
            type="checkbox"
            value=""
            class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
          />
          <label
            for="checkbox-item-16"
            class="ms-2 w-full rounded py-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Leslie Livingston</label
          >
        </div>
      </li>
      <li>
        <div
          class="flex items-center rounded ps-2 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <input
            id="checkbox-item-17"
            type="checkbox"
            value=""
            class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
          />
          <label
            for="checkbox-item-17"
            class="ms-2 w-full rounded py-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Roberta Casas</label
          >
        </div>
      </li>
    </ul>
    <button
      class="flex w-full items-center rounded-b-lg border-t border-gray-200 bg-gray-50 p-3 text-sm font-medium text-red-600 hover:bg-gray-100 hover:underline dark:border-gray-600 dark:bg-gray-700 dark:text-red-500 dark:hover:bg-gray-600"
    >
      <i class="bi bi-x-circle mr-3 text-base"></i>
      Clear
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
const podList = ref("");
</script>
