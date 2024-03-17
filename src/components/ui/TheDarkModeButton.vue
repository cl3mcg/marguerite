<template>
  <button
    v-on:click="switchDarkMode"
    class="flex w-auto items-center justify-center rounded border-0 px-3 py-2 text-gray-900 hover:bg-gray-100 hover:bg-transparent dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:bg-transparent dark:focus:text-white"
  >
    <span class="bi bi-moon-stars-fill inline dark:hidden"></span
    ><span class="bi-brightness-high-fill hidden dark:inline"></span>
  </button>
</template>

<script setup>
import { onMounted } from "vue";
import { useUserStore } from "../../stores/UserStore.js";

const userStore = useUserStore();

// Create a media query list
const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

// Function to update the theme
const updateTheme = () => {
  userStore.darkMode = darkModeMediaQuery.matches;
  document.documentElement.setAttribute(
    "data-theme",
    userStore.darkMode ? "dark" : "light",
  );
};

// Update the theme on mount and whenever the media query changes
onMounted(updateTheme);
darkModeMediaQuery.addEventListener("change", updateTheme);

const switchDarkMode = () => {
  userStore.darkMode = !userStore.darkMode;
  document.documentElement.setAttribute(
    "data-theme",
    userStore.darkMode ? "dark" : "light",
  );

  // if set via local storage previously
  if (localStorage.getItem("color-theme")) {
    if (localStorage.getItem("color-theme") === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    }
  } else {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }
  }
};
</script>

<style scoped></style>
