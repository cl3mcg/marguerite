<template>
	<router-link
		class="button"
		v-bind:to="toolData.toolRoute"
		aria-label="Go to the tool"
	>
		<div class="toolCard">
			<main>
				<h2>{{ toolData.toolName }}</h2>
				{{ toolData.toolDescription }}
			</main>
			<aside>➤</aside>
		</div>
	</router-link>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
	toolData: {
		type: Object,
	},
});
</script>

<style scoped>
a {
	width: auto;
	height: 10em;
	margin: 0.5em 0;
	padding: 0 0.5em;
	display: flex;
	align-items: center;
	gap: 1em;
	text-align: start;
}

div.toolCard h2 {
	margin: 0;
}

a div.toolCard {
	width: 100%;
	display: flex;
	justify-content: space-between;
}

main {
	margin: 0.3em;
	padding: 0.5em 1em;
	font-family: var(--font-standard);
}

aside {
	display: flex;
	align-items: center;
	margin-right: 2em;
}
</style>
