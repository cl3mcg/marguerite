<template>
	<section>
		<h1>Tools</h1>
		<div class="tools-list">
			<TheToolCard
				v-for="tool in toolsList"
				v-bind:toolData="tool"
			></TheToolCard>
		</div>
	</section>
</template>

<script setup>
import { ref } from "vue";

import TheToolCard from "../ui/TheToolCard.vue";

const toolsList = ref([
	{
		toolName: "Sonar",
		toolRoute: "tools/sonar",
		toolDescription: "Trends of FAK ocean freight rates and data.",
		imgPath: "/assets/icons/sonarProjectLogo.svg",
		imgAlt: "A logo used to reprensent the Sonar tool",
	},
	{
		toolName: "Sauron",
		toolRoute: "tools/sauron",
		toolDescription: "Countries' macroeconomy & logistics indicators overview.",
		imgPath: "/assets/icons/sauronProjectLogo.svg",
		imgAlt: "A logo used to reprensent the Sauron tool",
	},
]);
</script>

<style scoped>
section {
	margin: 0 25vw 2em 25vw;
}
div.tools-list {
	display: flex;
	flex-direction: column;
}

@media screen and (max-width: 930px) {
	section {
		margin: 0 10vw;
	}
}

@media screen and (max-width: 600px) {
	section {
		margin: 0 8vw;
	}
}
</style>
