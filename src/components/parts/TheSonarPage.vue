<template>
	<section>
		<h1>Sonar</h1>
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
				<label for="selectedPOD">Port of discharge:</label>
				<select id="selectedPOD" v-model="selection.selectedPOD" required>
					<option value="" selected disabled>Select a POD</option>
					<option v-for="port in portsAvailable" v-bind:value="port">
						{{ port }}
					</option>
				</select>
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
				<div id="carrierSelectionSection">
					<span>Carrier selection</span>
					<input
						type="checkbox"
						id="hlcu"
						value="hlcu"
						v-model="selection.selectedCarriers"
					/>
					<label for="hlcu">HAPAG</label>
					<input
						type="checkbox"
						id="mscu"
						value="mscu"
						v-model="selection.selectedCarriers"
					/>
					<label for="mscu">MSC</label>
					<button type="button" v-on:click="displayMSCInformation()">
						<img
							src="../../assets/icons/information.svg"
							alt="An information icon"
						/>
					</button>
				</div>
				<button v-bind:disabled="!selection.isValid()">Apply selection</button>
			</form>
			<h2
				v-on:click="toggle('dataRecap')"
				v-on:keydown.enter="toggle('dataRecap')"
				v-bind:class="{
					expanded: displayedItems.dataRecap,
					disabled: !selection.isValid() || averageData.length === 0,
				}"
				tabindex="0"
			>
				Data recap'
			</h2>
			<div v-if="displayedItems.dataRecap">
				<h3>Selection</h3>
				<table>
					<tr>
						<td>Route</td>
						<td>{{ selection.selectedPOL }} → {{ selection.selectedPOD }}</td>
					</tr>
					<tr>
						<td>Date range</td>
						<td>{{ displayDate(0) }} → {{ displayDate(1) }}</td>
					</tr>
				</table>
				<h3>Average</h3>
				<TheAverageTable v-bind:averageData="averageData"></TheAverageTable>
				<h3>Graph</h3>
				<TheRatesLineChart v-bind:data="data"></TheRatesLineChart>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, reactive, onBeforeMount } from "vue";

import { useUserStore } from "../../stores/UserStore.js";
const userStore = useUserStore();

import months from "../../assets/json/months.json";
import Calendar from "primevue/calendar";
import TheRatesLineChart from "../ui/TheRatesLineChart.vue";
import TheAverageTable from "../ui/TheAverageTable.vue";

const minDate = ref(new Date("2023-01-01"));
const maxDate = ref(new Date());

const portsAvailable = ref([]);

onBeforeMount(async function () {
	userStore.isLoading.message = "Fetching the available port pairs.";
	userStore.isLoading.status = true;
	try {
		const response = await fetch(`/backend/rate/getPort`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const dataReceived = await response.json();

		if (response.ok) {
			portsAvailable.value = dataReceived.data;
			userStore.isLoading.status = false;
			userStore.isLoading.message = null;
			return true;
		} else {
			console.log("FAIL port request");
			console.log(response);
			userStore.isLoading.status = false;
			userStore.isLoading.message = null;
			return false;
		}
	} catch (error) {
		userStore.isLoading.status = false;
		userStore.isLoading.message = null;
		return console.error("Error:", error);
	}
});

const displayedItems = reactive({
	selectionMenu: true,
	dataRecap: false,
});

const selection = reactive({
	selectedPOL: "",
	selectedPOD: "",
	selectedDates: null,
	selectedCarriers: ["hlcu"],
	isValid: function () {
		if (
			this.selectedPOL.length === 5 &&
			this.selectedPOD.length === 5 &&
			this.selectedDates &&
			this.selectedCarriers.length > 0
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
	if (
		(!selection.isValid() || averageData.value.length === 0) &&
		item === "dataRecap"
	) {
		return;
	}
	for (const key in displayedItems) {
		if (key === item) {
			displayedItems[key] = !displayedItems[key];
		} else {
			displayedItems[key] = false;
		}
	}
};

let data = reactive({});

const averageData = ref([]);

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

	data = formattedData;
	averageData.value = dataReceived.data.average;
	console.log(data);
};

const retrieveRates = async function () {
	userStore.isLoading.status = true;
	try {
		const response = await fetch(`/backend/rate/getRate`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				portOfLoading: selection.selectedPOL,
				portOfDestination: selection.selectedPOD,
				startTimeFrame: selection.selectedDates[0],
				endTimeFrame: selection.selectedDates[1],
				carriers: selection.selectedCarriers,
			}),
		});
		const dataReceived = await response.json();

		if (response.ok) {
			console.log("Response received");
			console.log(dataReceived);
			if (dataReceived.data.months.length <= 0) {
				userStore.triggerFlash(
					"warning",
					"No match",
					"There's no data matching your selection."
				);
				userStore.isLoading.status = false;
				return false;
			}
			updateLineChartData(dataReceived);
			userStore.isLoading.status = false;
			return true;
		} else {
			console.log("FAIL rates request");
			userStore.isLoading.status = false;
			return false;
		}
	} catch (error) {
		userStore.isLoading.status = false;
		userStore.triggerFlash(
			"danger",
			"Server error",
			"The rates cannot be retrived for the time being."
		);
		return console.error("Error:", error);
	}
};

const newSelection = async function () {
	if (!selection.isValid()) {
		return;
	}
	console.log(`New selection function fired !`);
	console.log(`Current selected POL: ${selection.selectedPOL}`);
	console.log(`Current selected POD: ${selection.selectedPOD}`);
	console.log(`Current selected dates: ${selection.selectedDates}`);
	const request = await retrieveRates();
	if (request) {
		displayedItems.selectionMenu = false;
		displayedItems.dataRecap = true;
		return;
	}
};

const displayMSCInformation = function () {
	userStore.triggerModal(
		null,
		"MSCU data",
		"MSC's rates collection is not as complete as HAPAG's. To evaluate trends on a long period of time, it's better to solely rely on HAPAG's data (until June 2024).",
		["OK"]
	);
};
</script>

<style scoped>
section {
	margin: 0 25vw 2em 25vw;
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

div h2.disabled {
	cursor: not-allowed;
}

[data-theme="dark"] div h2:not(.expanded):hover {
	background-color: var(--grey-500);
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

div#carrierSelectionSection {
	margin-top: 1em;
	display: flex;
	flex-wrap: wrap;
}

div#carrierSelectionSection > span {
	display: block;
	flex-grow: 1;
	min-width: 100%;
	margin-bottom: 0.25em;
}

div#carrierSelectionSection label {
	margin-top: 0;
	margin-left: 0.5em;
}

div#carrierSelectionSection input:not(:first-of-type) {
	margin-left: 2em;
}

div#carrierSelectionSection button {
	justify-self: end;
	align-self: center;
	height: 1.25em;
	width: 1.25em;
	margin: 0 1em;
	padding: 0;
}

div#carrierSelectionSection button img {
	height: 2em;
	width: 2em;
}

@media screen and (max-width: 1300px) {
	section {
		margin: 10vh 15vw;
		margin-top: 0;
	}
}

@media screen and (max-width: 1100px) {
	section {
		margin: 10vh 9vw;
		margin-top: 0;
	}
}

@media screen and (max-width: 700px) {
	section {
		margin: 10vh 8vw;
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
