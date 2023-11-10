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
				labels: props.data["20GP"].map((row) => row.month),
				datasets: [
					{
						label: "20GP Rates",
						data: props.data["20GP"].map((row) => row.oceanFreight),
						fill: false,
						borderColor: "#999999",
						tension: 0.15,
						pointStyle: "rect",
						pointBackgroundColor: "#8d8d8d",
						pointBorderColor: "#8d8d8d",
						pointHoverBackgroundColor: "#003569",
						pointHoverBorderColor: "#005cb6",
						pointHoverBorderWidth: "4px",
					},
					{
						label: "40GP Rates",
						data: props.data["40GP"].map((row) => row.oceanFreight),
						fill: false,
						borderColor: "#5a5a5a",
						tension: 0.15,
						pointStyle: "rect",
						pointBackgroundColor: "#414141",
						pointBorderColor: "#414141",
						pointHoverBackgroundColor: "#003569",
						pointHoverBorderColor: "#005cb6",
						pointHoverBorderWidth: "4px",
					},
					{
						label: "40HC Rates",
						data: props.data["40HC"].map((row) => row.oceanFreight),
						fill: false,
						borderColor: "#272727",
						tension: 0.15,
						pointStyle: "rect",
						pointBackgroundColor: "#010101",
						pointBorderColor: "#010101",
						pointHoverBackgroundColor: "#003569",
						pointHoverBorderColor: "#005cb6",
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
