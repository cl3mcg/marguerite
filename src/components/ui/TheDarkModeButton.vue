<template>
	<button
		@click="switchDarkMode"
		v-bind:class="backgroundColor"
		aria-label="Dark mode button"
	>
		<img
			v-if="darkModeIcon === 'sun'"
			src="/src/assets/icons/sunwithface.svg"
			alt="The image of a sun with a smilling face"
		/>
		<img
			v-if="darkModeIcon === 'moon'"
			src="/src/assets/icons/moonwithface.svg"
			alt="The image of a moon with a smilling face"
		/>
	</button>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useUserStore } from "../../stores/UserStore.js";

const userStore = useUserStore();

// Create a media query list
const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

// Create the darkBackground variable
const backgroundColor = ref("dark");

// Function to update the theme
const updateTheme = () => {
	userStore.darkMode = darkModeMediaQuery.matches;
	document.documentElement.setAttribute(
		"data-theme",
		userStore.darkMode ? "dark" : "light"
	);
	userStore.darkMode
		? (backgroundColor.value = "light")
		: (backgroundColor.value = "dark");
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
	userStore.darkMode
		? (backgroundColor.value = "light")
		: (backgroundColor.value = "dark");
};

const darkModeIcon = ref(userStore.darkMode ? "sun" : "moon");

watch(
	() => userStore.darkMode,
	(newVal) => {
		darkModeIcon.value = newVal ? "sun" : "moon";
	}
);
</script>

<style scoped>
button {
	width: 2.5em;
	margin: 0.75em;
}
button.light {
	border: 1px solid var(--primary-darker);
	background-color: var(--primary-light);
	box-shadow: 2px 2px 0px var(--primary-dark);
}
button.dark {
	border: 1px solid var(--primary-lighter);
	background-color: var(--primary-dark);
	box-shadow: 2px 2px 0px var(--primary-light);
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
}
</style>
