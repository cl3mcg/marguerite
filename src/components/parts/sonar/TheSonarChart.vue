<template>
  <div class="chart-container flex flex-col p-1 md:p-4">
    <header class="relative mb-1 flex justify-center align-middle md:mb-3">
      <span
        class="mx-auto text-center text-lg font-bold text-gray-900 dark:text-gray-900 md:text-xl"
        >{{ props.data.portOfLoading }} →
        {{ props.data.portOfDestination }}</span
      >
      <div v-if="props.data.months.length > 0" class="absolute right-0 top-0">
        <TheSonarChartMoreDetails
          v-bind:data="props.data"
          v-bind:drawerSurchargeSelection="props.drawerSurchargeSelection"
          v-on:update-surcharge-selection="updateSurchargeSelection"
          v-on:update-surcharge-display="updateSurchargeDisplay"
        ></TheSonarChartMoreDetails>
      </div>
    </header>
    <canvas
      v-if="props.data.months.length > 0"
      v-bind:id="`chart_${props.data.portOfLoading}${props.data.portOfDestination}`"
    ></canvas>
    <div v-else class="flex size-full">
      <span class="mx-auto my-auto text-lg font-semibold text-gray-500"
        >No data available</span
      >
    </div>
  </div>
</template>

<script setup>
import TheSonarChartMoreDetails from "./TheSonarChartMoreDetails.vue";
import { onMounted, watch, ref } from "vue";
import Chart from "chart.js/auto";
Chart.defaults.font.family =
  "'Fira GO', 'Noto Sans SC', 'Noto Sans TC', 'Noto Sans JP', 'Noto Sans KR', 'Liberation Sans', 'Twemoji Mozilla', 'sans-serif'";

const props = defineProps({
  data: {
    type: Object,
    defaults: {},
  },
  drawerSurchargeSelection: {
    type: Boolean,
    default: false,
  },
});

const includeSurcharge = ref(props.drawerSurchargeSelection);
const displaySurcharge = ref(false);

const updateSurchargeSelection = function (surchargeToggleValue) {
  includeSurcharge.value = surchargeToggleValue;
};

const updateSurchargeDisplay = function (surchargeDisplayValue) {
  displaySurcharge.value = surchargeDisplayValue;
};

const getArrayAverage = function (array) {
  const sum = array.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );
  const average = sum / array.length;
  return Math.round(average);
};

const formatRatesData = function (containerType, displaySurcharge) {
  let dataArray = [];
  for (let month of props.data.months) {
    console.log("Month:", month);
    console.log("props.data.absolute[month]:", props.data.absolute[month]);
    console.log(
      "props.data.absolute[month].oceanFreight:",
      props.data.absolute[month]?.oceanFreight,
    );
    console.log("containerType:", containerType);
    const arrayOfOceanFreight =
      props.data.absolute[month]?.oceanFreight[containerType];
    const arrayOfSurcharge =
      props.data.absolute[month]?.surcharge[containerType];

    const averageOceanFreight = arrayOfOceanFreight
      ? getArrayAverage(arrayOfOceanFreight)
      : null;

    const averageSurcharge = arrayOfSurcharge
      ? getArrayAverage(arrayOfSurcharge)
      : null;

    const averageAllIn =
      averageOceanFreight && averageSurcharge
        ? averageOceanFreight + averageSurcharge
        : averageOceanFreight
          ? averageOceanFreight
          : null;

    if (includeSurcharge.value === true || displaySurcharge === true) {
      dataArray.push(averageAllIn);
    } else {
      dataArray.push(averageOceanFreight);
    }
  }
  // console.log("Data array used for the graphs:", dataArray);
  return dataArray;
};

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

let chartInstance = null;

onMounted(() => {
  const chartElement = document.getElementById(
    `chart_${props.data.portOfLoading}${props.data.portOfDestination}`,
  );
  if (chartElement) {
    chartInstance = new Chart(chartElement, {
      type: "line",
      data: {
        labels: props.data.months,
        datasets: [
          {
            label: "20GP Rates",
            data: formatRatesData("20GP"),
            fill: false,
            borderColor: "#6B68FD",
            tension: 0.15,
            pointStyle: "rect",
            pointBackgroundColor: "#6B68FD",
            pointBorderColor: "#6B68FD",
            pointHoverBackgroundColor: "#020137",
            pointHoverBorderColor: "#020137",
            pointHoverBorderWidth: "4px",
          },
          {
            label: "40GP Rates",
            data: formatRatesData("40GP"),
            fill: false,
            borderColor: "#0703D8",
            tension: 0.15,
            pointStyle: "rect",
            pointBackgroundColor: "#0703D8",
            pointBorderColor: "#0703D8",
            pointHoverBackgroundColor: "#0502AB",
            pointHoverBorderColor: "#0502AB",
            pointHoverBorderWidth: "4px",
          },
          {
            label: "40HC Rates",
            data: formatRatesData("40HC"),
            fill: false,
            borderColor: "#03015B",
            tension: 0.15,
            pointStyle: "rect",
            pointBackgroundColor: "#03015B",
            pointBorderColor: "#03015B",
            pointHoverBackgroundColor: "#EBEBFF",
            pointHoverBorderColor: "#EBEBFF",
            pointHoverBorderWidth: "4px",
          },
        ],
      },
      options: {
        animations: null,
        transitions: null,
        scales: {
          y: {
            ticks: {
              // Include a dollar sign in the ticks
              callback: function (value, index, ticks) {
                return `USD ${value.toLocaleString("en")}`;
              },
            },
          },
        },
        plugins: {
          tooltip: {
            backgroundColor: "#737373",
            // cornerRadius: ,
          },
        },
      },
    });
  }
});

const updateChart = () => {
  if (chartInstance) {
    chartInstance.data.labels = props.data.months;
    chartInstance.data.datasets[0].data = formatRatesData("20GP");
    chartInstance.data.datasets[1].data = formatRatesData("40GP");
    chartInstance.data.datasets[2].data = formatRatesData("40HC");
    chartInstance.update();
  }
};

const updateChartDisplaySurcharge = (displayed) => {
  if (chartInstance && displayed === true) {
    chartInstance.data.labels = props.data.months;
    if (chartInstance.data.datasets[3]) {
      chartInstance.data.datasets[3].data = formatRatesData("20GP", true);
    } else {
      chartInstance.data.datasets[3] = {
        label: "20GP All-in",
        data: formatRatesData("20GP", true),
        fill: false,
        borderColor: "#FB923C",
        tension: 0.15,
        pointStyle: "rect",
        pointBackgroundColor: "#FB923C",
        pointBorderColor: "#FB923C",
        pointHoverBackgroundColor: "#431407",
        pointHoverBorderColor: "#431407",
        pointHoverBorderWidth: "4px",
      };
    }
    if (chartInstance.data.datasets[4]) {
      chartInstance.data.datasets[4].data = formatRatesData("40GP", true);
    } else {
      chartInstance.data.datasets[4] = {
        label: "40GP All-in",
        data: formatRatesData("40GP", true),
        fill: false,
        borderColor: "#EA580C",
        tension: 0.15,
        pointStyle: "rect",
        pointBackgroundColor: "#EA580C",
        pointBorderColor: "#EA580C",
        pointHoverBackgroundColor: "#431407",
        pointHoverBorderColor: "#431407",
        pointHoverBorderWidth: "4px",
      };
    }
    if (chartInstance.data.datasets[5]) {
      chartInstance.data.datasets[5].data = formatRatesData("40HC", true);
    } else {
      chartInstance.data.datasets[5] = {
        label: "40HC All-in",
        data: formatRatesData("40HC", true),
        fill: false,
        borderColor: "#7C2D12",
        tension: 0.15,
        pointStyle: "rect",
        pointBackgroundColor: "#7C2D12",
        pointBorderColor: "#7C2D12",
        pointHoverBackgroundColor: "#431407",
        pointHoverBorderColor: "#431407",
        pointHoverBorderWidth: "4px",
      };
    }
    chartInstance.update();
  }
  if (chartInstance && displayed === false) {
    chartInstance.data.labels = props.data.months;
    const filteredDataSet = chartInstance.data.datasets.filter(
      (dataset) => !dataset.label.includes("All-in"),
    );
    chartInstance.data.datasets = filteredDataSet;
    chartInstance.update();
  }
};

onMounted(() => {
  initFlowbite();
});

watch(props, (newValue, oldValue) => {
  updateChart();
});

watch(includeSurcharge, (newValue, oldValue) => {
  updateChart();
});

watch(displaySurcharge, (newValue, oldValue) => {
  updateChartDisplaySurcharge(newValue);
});
</script>
