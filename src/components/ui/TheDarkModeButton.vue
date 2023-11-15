<template>
	<button @click="switchDarkMode">
		<img :src="darkModeIconSrc" class="darkModeIcon" />
	</button>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useUserStore } from "../../stores/UserStore.js";

const userStore = useUserStore();

// Create a media query list
const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

// Function to update the theme
const updateTheme = () => {
	userStore.darkMode = darkModeMediaQuery.matches;
	document.documentElement.setAttribute(
		"data-theme",
		userStore.darkMode ? "dark" : "light"
	);
};

// Update the theme on mount and whenever the media query changes
onMounted(updateTheme);
darkModeMediaQuery.addEventListener("change", updateTheme);

const switchDarkMode = () => {
	userStore.darkMode = !userStore.darkMode;
	document.documentElement.setAttribute(
		"data-theme",
		userStore.darkMode ? "dark" : "light"
	);
};

const darkModeIconSrc = ref(
	userStore.darkMode
		? "/src/assets/icons/sunwithface.svg"
		: "/src/assets/icons/moonwithface.svg"
);

watch(
	() => userStore.darkMode,
	(newVal) => {
		darkModeIconSrc.value = newVal
			? "/src/assets/icons/sunwithface.svg"
			: "/src/assets/icons/moonwithface.svg";
	}
);
</script>

<style scoped>
button {
	margin: 0 0.75em;
	box-shadow: 2px 2px 0px var(--primary-dark);
}
button img {
	transition: ease-in-out 0.1s;
	-webkit-filter: grayscale(100%);
	filter: grayscale(100%);
}
button:hover img {
	-webkit-filter: grayscale(0%);
	filter: grayscale(0%);
}
img {
	width: 1.5em;
	color: var(--primary-dark);
	text-align: center;
	text-decoration: none;
	margin: 0 0.2em;
}
</style>
