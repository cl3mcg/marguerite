<template>
	<canvas id="chart"></canvas>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";
Chart.defaults.font.family =
	"'Fira Mono', Menlo, Consolas, 'Courier New', monospace";

const data = ref([
	{ year: 2010, count: 10 },
	{ year: 2011, count: 20 },
	{ year: 2012, count: 15 },
	{ year: 2013, count: 25 },
	{ year: 2014, count: 22 },
	{ year: 2015, count: 30 },
	{ year: 2016, count: 28 },
]);

onMounted(() => {
	const chartElement = document.getElementById("chart");
	if (chartElement) {
		new Chart(chartElement, {
			type: "line",
			data: {
				labels: data.value.map((row) => row.year),
				datasets: [
					{
						label: "Rates",
						data: data.value.map((row) => row.count),
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
