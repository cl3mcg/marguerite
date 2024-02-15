<template>
	<div class="table-container">
		<table>
			<tbody>
				<tr>
					<td colspan="2">Voyage data</td>
				</tr>
				<tr>
					<td>Average transit time</td>
					<td>{{ formatTransitTime }}</td>
				</tr>
				<tr>
					<td>Average amount of transhipment(s)</td>
					<td>{{ formatTranshipment }}</td>
				</tr>
				<tr>
					<td colspan="2">20GP container</td>
				</tr>
				<tr>
					<td>Average rate value</td>
					<td>{{ formatOceanFreight20GP }}</td>
				</tr>
				<tr>
					<td>Average surcharge value</td>
					<td>{{ formatSurcharge20GP }}</td>
				</tr>
				<tr class="totalRow">
					<td>Average total</td>
					<td>{{ formatTotal20GP }}</td>
				</tr>
				<tr>
					<td colspan="2">40GP container</td>
				</tr>
				<tr>
					<td>Average rate value</td>
					<td>{{ formatOceanFreight40GP }}</td>
				</tr>
				<tr>
					<td>Average surcharge value</td>
					<td>{{ formatSurcharge40GP }}</td>
				</tr>
				<tr class="totalRow">
					<td>Average total</td>
					<td>{{ formatTotal40GP }}</td>
				</tr>
				<tr>
					<td colspan="2">40HC container</td>
				</tr>
				<tr>
					<td>Average rate value</td>
					<td>{{ formatOceanFreight40HC }}</td>
				</tr>
				<tr>
					<td>Average surcharge value</td>
					<td>{{ formatSurcharge40HC }}</td>
				</tr>
				<tr class="totalRow">
					<td>Average total</td>
					<td>{{ formatTotal40HC }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
	averageData: {
		type: Object,
		default: {},
	},
});

const formatCurrency = function (value) {
	return `${value.toLocaleString("en-US", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})} USD`;
};

const formatTransitTime = computed(() => {
	const transitTime = Math.ceil(props.averageData.transitTime);
	return `${transitTime} days`;
});

const formatTranshipment = computed(() => {
	const transhipment = Math.round(props.averageData.transshipment);
	return `${transhipment} (estimated)`;
});

const formatOceanFreight20GP = computed(() => {
	const value = Math.ceil(props.averageData.oceanFreight20GP);
	return formatCurrency(value);
});

const formatSurcharge20GP = computed(() => {
	const value = Math.ceil(props.averageData.surcharge20GP);
	return formatCurrency(value);
});

const formatTotal20GP = computed(() => {
	const value = Math.ceil(
		props.averageData.oceanFreight20GP + props.averageData.surcharge20GP
	);
	return formatCurrency(value);
});

const formatOceanFreight40GP = computed(() => {
	const value = Math.ceil(props.averageData.oceanFreight40GP);
	return formatCurrency(value);
});

const formatSurcharge40GP = computed(() => {
	const value = Math.ceil(props.averageData.surcharge40GP);
	return formatCurrency(value);
});

const formatTotal40GP = computed(() => {
	const value = Math.ceil(
		props.averageData.oceanFreight40GP + props.averageData.surcharge40GP
	);
	return formatCurrency(value);
});

const formatOceanFreight40HC = computed(() => {
	const value = Math.ceil(props.averageData.oceanFreight40HC);
	return formatCurrency(value);
});

const formatSurcharge40HC = computed(() => {
	const value = Math.ceil(props.averageData.surcharge40HC);
	return formatCurrency(value);
});

const formatTotal40HC = computed(() => {
	const value = Math.ceil(
		props.averageData.oceanFreight40HC + props.averageData.surcharge40HC
	);
	return formatCurrency(value);
});
</script>

<style scoped>
.table-container {
	width: 100%;
	overflow-x: auto;
}

table {
	border-collapse: collapse;
	width: 100%;
}

table td[colspan="2"] {
	background-color: var(--grey-300);
	padding-left: 1em;
	font-weight: 600;
}

table tr:not([colspan="2"]) td:first-child {
	padding-left: 1em;
}

table .totalRow {
	border-top: 1px solid var(--neutral-300);
}

[data-theme="dark"] td[colspan="2"] {
	color: var(--primary-dark);
}
</style>
