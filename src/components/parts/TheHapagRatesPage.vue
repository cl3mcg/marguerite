<template>
	<section>
		<h1>Hapag rates</h1>
		<div>
			<h2
				v-on:click="toggle('selectionMenu')"
				v-on:keydown.enter="toggle('selectionMenu')"
				v-bind:class="displayedItems.selectionMenu ? 'expanded' : ''"
				tabindex="0"
			>
				Selection menu
			</h2>
			<form
				v-if="displayedItems.selectionMenu"
				v-on:submit.prevent="newSelection"
				id="selectionForm"
			>
				<label for="selectedPOL">Port of loading:</label>
				<select id="selectedPOL" v-model="selection.selectedPOL" required>
					<option value="" selected disabled>Select a POL</option>
					<option v-for="port in portsAvailable" v-bind:value="port">
						{{ port }}
					</option>
				</select>
				<!-- <input
					type="text"
					id="selectedPOL"
					list="ports"
					placeholder="5-letter POL code"
					minlength="5"
					maxlength="5"
					v-model="selection.selectedPOL"
					required
				/> -->
				<label for="selectedPOD">Port of discharge:</label>
				<select id="selectedPOD" v-model="selection.selectedPOD" required>
					<option value="" selected disabled>Select a POD</option>
					<option v-for="port in portsAvailable" v-bind:value="port">
						{{ port }}
					</option>
				</select>
				<!-- <input
					type="text"
					id="selectedPOD"
					placeholder="5-letter POD code"
					minlength="5"
					maxlength="5"
					v-model="selection.selectedPOD"
					required
				/> -->
				<label for="selectedDates">Date range</label>
				<datalist id="ports">
					<option v-for="port in portsAvailable" v-bind:value="port">
						{{ port }}
					</option>
				</datalist>
				<Calendar
					v-model="selection.selectedDates"
					selectionMode="range"
					dateFormat="dd-M-yy"
					v-bind:minDate="minDate"
					v-bind:maxDate="maxDate"
					hideOnRangeSelection
					showButtonBar
					placeholder="Select a date range"
					inputId="selectedDates"
				/>
				<button>Apply selection</button>
			</form>
			<h2
				v-on:click="toggle('dataRecap')"
				v-on:keydown.enter="toggle('dataRecap')"
				v-bind:class="displayedItems.dataRecap ? 'expanded' : ''"
				tabindex="0"
			>
				Data recap'
			</h2>
			<div v-if="displayedItems.dataRecap">
				<h3>Selection</h3>
				<table>
					<tr>
						<td>Port of loading</td>
						<td>{{ selection.selectedPOL }}</td>
					</tr>
					<tr>
						<td>Port of discharge</td>
						<td>{{ selection.selectedPOD }}</td>
					</tr>
					<tr>
						<td>Date range</td>
						<td>{{ displayDate(0) }} → {{ displayDate(1) }}</td>
					</tr>
				</table>
				<h3>Average</h3>
				The average data lol
				<h3>Graph</h3>
				<LineChart v-bind:data="data"></LineChart>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, reactive, onBeforeMount } from "vue";

import { useUserStore } from "../../stores/UserStore.js";
const userStore = useUserStore();

import { useRouter } from "vue-router";
const router = useRouter();

import months from "../../assets/json/months.json";
import Calendar from "primevue/calendar";
import LineChart from "../ui/TheLineChart.vue";

const minDate = ref(new Date("2023-01-01"));
const maxDate = ref(new Date());

const portsAvailable = ref([]);

onBeforeMount(async function () {
	try {
		const response = await fetch(`http://localhost:3000/rate/getPort`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const dataReceived = await response.json();

		if (response.ok) {
			portsAvailable.value = dataReceived.data;
			return true;
		} else {
			console.log("FAIL port request");
			console.log(response);
			return false;
		}
	} catch (error) {
		return console.error("Error:", error);
	}
});

const displayedItems = reactive({
	selectionMenu: false,
	dataRecap: false,
	// danger: false,
});

const selection = reactive({
	selectedPOL: "",
	selectedPOD: "",
	selectedDates: null,
	isValid: function () {
		if (
			this.selectedPOL.length === 5 &&
			this.selectedPOD.length === 5 &&
			this.selectedDates
		) {
			return true;
		}
		return false;
	},
});

const displayDate = function (index) {
	if (!selection.isValid()) {
		return;
	}
	!index ? (index = 0) : index;
	const date = new Date(selection.selectedDates[index]);
	const day = date.getDate().toString().padStart(2, "0");
	const month = months[date.getMonth() + 1]; // Months are zero-based, so we add 1
	const year = date.getFullYear().toString(); // Get the last two digits of the year
	const formattedDate = `${day}-${month}-${year}`;
	return formattedDate;
};

const toggle = function (item) {
	if (!selection.isValid() && item === "dataRecap") {
		return;
	}
	const object = displayedItems;
	for (const key in object) {
		if (key === item) {
			object[key] = !object[key];
		} else {
			object[key] = false;
		}
	}
};

let data = reactive({
	"20GP": [
		{ month: 2010, rate: 10 },
		{ month: 2011, rate: 20 },
		{ month: 2012, rate: 15 },
		{ month: 2013, rate: 25 },
		{ month: 2014, rate: 22 },
		{ month: 2015, rate: 30 },
		{ month: 2016, rate: 28 },
	],
	"40GP": [
		{ month: 2010, rate: 40 },
		{ month: 2011, rate: 45 },
		{ month: 2012, rate: 34 },
		{ month: 2013, rate: 70 },
		{ month: 2014, rate: 56 },
		{ month: 2015, rate: 26 },
		{ month: 2016, rate: 35 },
	],
	"40HC": [
		{ month: 2010, rate: 78 },
		{ month: 2011, rate: 65 },
		{ month: 2012, rate: 54 },
		{ month: 2013, rate: 43 },
		{ month: 2014, rate: 79 },
		{ month: 2015, rate: 85 },
		{ month: 2016, rate: 98 },
	],
});

const updateLineChartData = function (dataReceived) {
	const average = function (array) {
		if (!array || array.length === 0) {
			return 0;
		}

		const sum = array.reduce((acc, value) => acc + value, 0);
		return sum / array.length;
	};

	const formattedData = {};

	for (const month in dataReceived.data.absolute) {
		if (dataReceived.data.absolute.hasOwnProperty(month)) {
			const oceanFreightData = dataReceived.data.absolute[month].oceanFreight;
			const surchargeData = dataReceived.data.absolute[month].surcharge;

			for (const containerType in oceanFreightData) {
				if (!formattedData[containerType]) {
					formattedData[containerType] = [];
				}

				const averageOceanFreight = average(oceanFreightData[containerType]);
				const averageSurcharge = average(surchargeData[containerType]);

				formattedData[containerType].push({
					month: month,
					oceanFreight: averageOceanFreight,
					surcharge: averageSurcharge,
				});
			}
		}
	}

	// Assuming your data variable is reactive
	data = formattedData;
	console.log(data);
};

const retrieveRates = async function () {
	try {
		const response = await fetch(`http://localhost:3000/rate/getRate`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				portOfLoading: selection.selectedPOL,
				portOfDestination: selection.selectedPOD,
				startTimeFrame: selection.selectedDates[0],
				endTimeFrame: selection.selectedDates[1],
			}),
		});
		const dataReceived = await response.json();

		if (response.ok) {
			console.log("Response received");
			console.log(dataReceived);
			updateLineChartData(dataReceived);
			return true;
		} else {
			console.log("FAIL rates request");
			return false;
		}
	} catch (error) {
		return console.error("Error:", error);
	}
};

const newSelection = async function () {
	if (!selection.isValid()) {
		return;
	}
	await retrieveRates();
	displayedItems.selectionMenu = false;
	displayedItems.dataRecap = true;
	console.log(`New selection function fired !`);
	console.log(`Current selected POL: ${selection.selectedPOL}`);
	console.log(`Current selected POD: ${selection.selectedPOD}`);
	console.log(`Current selected dates: ${selection.selectedDates}`);
};
</script>

<style scoped>
section {
	margin: 0 30vw 2em 30vw;
	display: flex;
	flex-direction: column;
	gap: 1em;
}

p {
	text-align: justify;
	text-justify: inter-word;
}

div h2 {
	font-size: 1.15em;
	cursor: pointer;
	display: flex;
	align-items: center;
	transition: 0.1s ease-in-out;
	padding: 0.5em 0;
	margin: 0.1em 0;
}

div h2:not(.expanded):hover {
	background-color: var(--primary-light-hover);
}

div h2::before {
	content: "›";
	margin: 0 1em 0 0.5em;
	transition: transform 0.1s ease-in-out;
}

div h2.expanded::before {
	transform: rotate(90deg);
}

h2.expanded {
	background-color: var(--primary-dark);
	color: var(--primary-light);
}

button {
	margin: 1.75em auto;
	width: 75%;
}

form {
	width: 100%;
	display: flex;
	flex-direction: column;
	margin: 1rem 0;
}

label:not(:first-of-type) {
	margin-top: 1em;
}

input {
	margin: 0;
}

table {
	width: 100%;
}

@media screen and (max-width: 930px) {
	section {
		margin: 10vh;
		margin-top: 0;
	}
}

@media screen and (max-width: 600px) {
	section {
		margin: 10vh 8vw;
		margin-top: 0;
	}
}
</style>

<style>
div[data-pc-section="panel"] {
	user-select: none;
	box-sizing: border-box;
	margin-top: 0.5em;
	background-color: var(--primary-light-grey);
	padding: 0.75em;
	border: 1px solid var(--primary-dark);
}

div[data-pc-section="panel"] * {
	transition: ease-in-out 0.1s;
}

@media screen and (max-width: 600px) {
	div[data-pc-section="panel"] {
		padding: 0.5em;
	}
}

div[data-pc-section="buttonbar"] {
	display: flex;
	justify-content: space-around;
	margin-top: 0.5em;
}

div[data-pc-section="buttonbar"] button {
	width: 5em;
	height: 2em;
	padding: 0 1em;
}

span[data-pc-name="calendar"] {
	width: 100%;
	height: 2em;
	line-height: 1.15;
}

span[data-pc-name="calendar"] input {
	box-sizing: border-box;
	font-family: var(--font-monospace);
	font-size: 0.9em;
	border: 1px solid var(--primary-dark);
	background-color: var(--primary-lighter);
	border-radius: 0%;
	width: 100%;
	height: 2em;
	padding: 0 0.5em;
}
div[data-pc-section="group"] {
	display: flex;
	flex-direction: column;
}

div[data-pc-section="group"] div[data-pc-section="header"] {
	display: flex;
	justify-content: center;
}

div[data-pc-section="group"] div[data-pc-section="header"] > button {
	width: 3em;
}

div[data-pc-section="group"] div[data-pc-section="header"] > div button {
	width: 10em;
}

div[data-pc-section="header"] {
	margin-bottom: 1em;
}

div[data-pc-section="header"],
div[data-pc-section="title"] {
	display: flex;
}

div[data-pc-section="container"] {
	display: flex;
	width: 100%;
}

div[data-pc-section="container"] table {
	width: 100%;
	margin-top: 0.8em;
	text-align: center;
	color: var(--primary-dark);
	background-color: var(--primary-lighter);
	border: 1px solid var(--primary-dark);
}

div[data-pc-section="container"]
	table
	td:not([data-p-other-month="true"])
	span {
	cursor: pointer;
	display: inline-block;
	width: 2.5em;
}

span[data-pc-section="decadetitle"] {
	font-family: var(--font-special);
	font-size: 0.85em;
	color: var(--neutral-500);
	border: 1px solid var(var(--neutral-500));
	background-color: var(--primary-lighter);
	box-shadow: 5px 5px 0px var(--neutral-500);
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	text-decoration: none;
	margin: 0 0.5em;
	padding: 0 0.5em;
	cursor: default;
}

div[data-pc-section="monthpicker"],
div[data-pc-section="yearpicker"] {
	margin-bottom: 0.5em;
	display: flex;
	width: 100%;
	color: var(--primary-dark);
	background-color: var(--primary-lighter);
	border: 1px solid var(--primary-dark);
}

div[data-pc-section="monthpicker"] span,
div[data-pc-section="yearpicker"] span {
	cursor: pointer;
	text-align: center;
	flex-grow: 1;
}

div[data-pc-section="monthpicker"] span:not([data-p-disabled="true"]):hover,
div[data-pc-section="yearpicker"] span:not([data-p-disabled="true"]):hover,
div[data-pc-section="container"]
	table
	td:not([data-p-other-month])
	span:not([data-p-disabled="true"]):hover {
	background-color: var(--neutral-300);
}

*[data-p-other-month],
*[data-p-disabled="true"],
* span[data-p-disabled="true"] {
	color: var(--neutral-300);
	cursor: not-allowed !important;
}

td[data-p-today="true"] span {
	background-color: var(--primary-dark);
	color: var(--primary-light);
	font-weight: bold;
}

td[data-p-today="true"] span:hover {
	color: var(--primary-dark);
}
</style>
