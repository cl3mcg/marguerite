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
import { RouterView } from "vue-router";

const toolsList = ref([
	{
		toolName: "Hapag rates",
		toolRoute: "tools/hprates",
		toolDescription: "Eagle eyes view on Hapag's historical rates and data.",
	},
	{
		toolName: "Tool_02",
		toolRoute: "tools/tools02",
		toolDescription: "The example of the 2nd tool",
	},
	{
		toolName: "Tool_03",
		toolRoute: "tools/tools03",
		toolDescription: "The example of the 3rd tool",
	},
]);
</script>

<style scoped>
section {
	margin: 0 30vw 2em 30vw;
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
