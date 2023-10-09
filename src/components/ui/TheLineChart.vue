<template>
	<canvas id="chart"></canvas>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";
Chart.defaults.font.family =
	"'Fira Mono', Menlo, Consolas, 'Courier New', monospace";

const props = defineProps({
	data: {
		type: Object,
		defaults: {},
	},
});

// Below and example of the data expected
// const data = ref([
// 	{ month: 2010, rate: 10 },
// 	{ month: 2011, rate: 20 },
// 	{ month: 2012, rate: 15 },
// 	{ month: 2013, rate: 25 },
// 	{ month: 2014, rate: 22 },
// 	{ month: 2015, rate: 30 },
// 	{ month: 2016, rate: 28 },
// ]);

onMounted(() => {
	const chartElement = document.getElementById("chart");
	if (chartElement) {
		new Chart(chartElement, {
			type: "line",
			data: {
				labels: props.data.map((row) => row.month),
				datasets: [
					{
						label: "Rates",
						data: props.data.map((row) => row.rate),
						fill: true,
						borderColor: "#737373",
						tension: 0.15,
						pointStyle: "rect",
						pointBackgroundColor: "#171717",
						pointBorderColor: "#171717",
						pointHoverBackgroundColor: "#0369a1",
						pointHoverBorderColor: "#0369a1",
						pointHoverBorderWidth: "4px",
					},
				],
			},
			options: {
				animations: null,
				transitions: null,
				plugins: {
					tooltip: {
						backgroundColor: "#737373",
						cornerRadius: 0,
					},
				},
			},
		});
	}
});
</script>

<style scoped></style>
