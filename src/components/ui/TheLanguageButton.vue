<template>
  <div class="relative">
    <button
      v-on:click="toggleDropDown"
      v-on-click-outside="closeDropDown"
      class="flex w-auto items-center justify-center rounded border-0 px-3 py-2 text-gray-900 hover:bg-gray-100 hover:bg-transparent dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:bg-transparent dark:focus:text-white"
      id="dropdownLanguageMenuButton"
    >
      <span class="bi bi-translate"></span>
    </button>
    <div
      id="dropdownLanguageMenu"
      class="absolute -right-16 z-10 mt-2 w-36 rounded-lg bg-white shadow-lg dark:bg-gray-700"
      v-bind:class="displayModal ? '' : 'hidden'"
    >
      <ul
        class="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownLanguageMenu"
      >
        <li
          class="flex cursor-pointer justify-center px-4 py-2 align-middle hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <span class="w-1/3 text-center">🇬🇧</span>
          <span class="w-3/4 text-center">English</span>
        </li>
        <li
          class="flex cursor-pointer justify-center px-4 py-2 align-middle hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <span class="w-1/3 text-center">🇫🇷</span>
          <span class="w-3/4 text-center">Français</span>
        </li>
        <li
          class="flex cursor-pointer justify-center px-4 py-2 align-middle hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <span class="w-1/3 text-center">🇨🇳</span>
          <span class="w-3/4 text-center">简单中文</span>
        </li>
        <li
          class="flex cursor-pointer justify-center px-4 py-2 align-middle hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <span class="w-1/3 text-center">🇹🇼</span>
          <span class="w-3/4 text-center">繁體中文</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vOnClickOutside } from "@vueuse/components";

const displayModal = ref(false);

const toggleDropDown = function () {
  displayModal.value = !displayModal.value;
};

const closeDropDown = function () {
  setTimeout(() => {
    displayModal.value = false;
  }, 100);
};
</script>
