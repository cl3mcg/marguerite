<template>
  <div class="chart-container flex flex-col p-1 md:p-4">
    <header class="relative mb-1 flex justify-center align-middle md:mb-3">
      <span
        class="mx-auto text-center text-lg font-bold text-gray-900 dark:text-gray-900 md:text-xl"
        >{{
          indicators.filter((el) => el.code === props.indicatorCode)[0].name
        }}</span
      >
      <div>
        <div class="absolute right-0 top-0">
          <TheSauronChartMoreDetails
            v-bind:indicatorCode="props.indicatorCode"
          ></TheSauronChartMoreDetails>
        </div>
      </div>
    </header>
    <div v-if="Object.keys(props.indicatorData).length > 0">
      <canvas v-bind:id="chartId"></canvas>
    </div>
    <div v-else class="flex size-full">
      <span class="mx-auto my-auto text-lg font-semibold text-gray-500"
        >No data available</span
      >
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import Chart from "chart.js/auto";

import TheSauronChartMoreDetails from "@components/parts/sauron/TheSauronChartMoreDetails.vue";

import indicatorsJSON from "@assets/data/indicators.json";
const indicators = indicatorsJSON;

Chart.defaults.font.family =
  "'Fira Mono', Menlo, Consolas, 'Courier New', monospace";

const props = defineProps({
  indicatorCode: {
    type: String,
    default: "",
  },
  indicatorData: {
    type: Object,
    default: () => ({}),
  },
});

const chartId = ref(`chart-${Math.floor(Math.random() * 100)}`);

function getRandomColor(index) {
  const colors = [
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#FFFF99",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#99FF99",
    "#B34D4D",
  ];
  return colors[index % colors.length];
}

const countryColorMapping = {
  CA: "#D80621", // Canada: Red
  FR: "#000599", // France: Navy Blue
  DE: "#000000", // Germany: Black
  IT: "#0F9E16", // Italy: Green
  JP: "#F4C5C2", // Japan: Pink
  GB: "#285B7A", // UK: Dark Blue
  US: "#F05454", // USA: Orange
  BR: "#95E062", // Brazil: Olive Light Green
  RU: "#832D2A", // Russia: Brick Red
  IN: "#FF8C00", // India: Orange
  CN: "#EEDD82", // China: Yellow
  ZA: "#6B8080", // South Africa: Grey
  AU: "#CD4F22", // Australia: Burnt Orange
  AR: "#29ABEA", // Argentina: Blue
  KR: "#3F60AD", // Korea: Blue
  TR: "#E73B32", // Turkey: Red
};

let chartInstance = null;

const updateChart = () => {
  if (chartInstance) {
    chartInstance.data.labels = Object.keys(
      props.indicatorData[Object.keys(props.indicatorData)[0]],
    ); // Assuming all countries have the same years
    chartInstance.data.datasets = Object.entries(props.indicatorData).map(
      ([countryCode, countryData], index) => ({
        label: countryCode,
        data: Object.values(countryData),
        fill: false,
        borderColor: countryColorMapping[countryCode],
        tension: 0.15,
        pointStyle: "rect",
        pointBackgroundColor: countryColorMapping[countryCode],
        pointBorderColor: "#414141",
        pointHoverBackgroundColor: "#003569",
        pointHoverBorderColor: "#005cb6",
        pointHoverBorderWidth: "4px",
      }),
    );
    chartInstance.update();
  }
};

onMounted(() => {
  const chartElement = document.getElementById(chartId.value);
  if (chartElement) {
    chartInstance = new Chart(chartElement, {
      type: "line",
      data: {
        labels: Object.keys(
          props.indicatorData[Object.keys(props.indicatorData)[0]],
        ), // Assuming all countries have the same years
        datasets: Object.entries(props.indicatorData).map(
          ([countryCode, countryData], index) => ({
            label: countryCode,
            data: Object.values(countryData),
            fill: false,
            borderColor: countryColorMapping[countryCode],
            tension: 0.15,
            pointStyle: "rect",
            pointBackgroundColor: countryColorMapping[countryCode],
            pointBorderColor: "#414141",
            pointHoverBackgroundColor: "#003569",
            pointHoverBorderColor: "#005cb6",
            pointHoverBorderWidth: "4px",
          }),
        ),
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

watch(
  props,
  (newValue, oldValue) => {
    updateChart();
  },
  { deep: true },
);
</script>
