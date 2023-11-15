<template>
	<div class="landing-page">
		<img src="../../assets/icons/favicon.svg" alt="Logo" class="logo" />
		<h1>Marguerite project</h1>
		<p class="description">Home of simple things.</p>
	</div>
</template>

<script setup></script>

<style scoped>
h1 {
	margin-top: 2em;
	margin-bottom: 0.5em;
	font-weight: 600;
	font-size: xx-large;
}
.landing-page {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 75vh;
}

.logo {
	width: 150px;
	max-width: 100%;
	background-color: transparent;
	transition: ease-in-out 0.25s;
}

.logo:hover {
	filter: drop-shadow(0px 0px 40px #333333bb);
}

.description {
	text-align: center;
	margin-top: 20px;
}
[data-theme="dark"] img.logo {
	filter: invert(100%) sepia(8%) saturate(239%) hue-rotate(242deg)
		brightness(118%) contrast(92%);
}
[data-theme="dark"] img.logo:hover {
	filter: invert(100%) sepia(8%) saturate(239%) hue-rotate(242deg)
		brightness(118%) contrast(92%) drop-shadow(0px 0px 40px #b9b9b9bb);
}

@media screen and (max-height: 600px) {
	.logo {
		width: 100px;
		margin-top: 1em;
	}
	h1 {
		margin-top: 0.5em;
		margin-bottom: 0.25em;
		font-weight: 600;
		font-size: xx-large;
	}
	.description {
		text-align: center;
		margin-top: 0.75em;
	}
}

@media (prefers-color-scheme: dark) {
	.logo {
		filter: invert(100%) sepia(8%) saturate(239%) hue-rotate(242deg)
			brightness(118%) contrast(92%);
	}

	.logo:hover {
		filter: invert(100%) sepia(8%) saturate(239%) hue-rotate(242deg)
			brightness(118%) contrast(92%) drop-shadow(0px 0px 40px #b9b9b9bb);
	}
}
</style>
