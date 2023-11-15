<template>
	<div>
		<table>
			<tr></tr>
		</table>
	</div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
	averageData: {
		type: Object,
		default: {},
	},
});
</script>

<style scoped></style>
