<template>
	<div class="landing-page">
		<img src="../../assets/icons/questionmark.svg" alt="Logo" class="logo" />
		<h1>Error 404</h1>
		<p class="description">The page requested cannot be found</p>
		<router-link to="/home" class="button"
			>Go back to the home page</router-link
		>
	</div>
</template>

<script setup></script>

<style scoped>
h1 {
	margin-bottom: 0.5em;
	font-weight: 600;
	font-size: xx-large;
}
a.button {
	width: 15em;
	margin-top: 1em;
}
.landing-page {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 75vh;
}

.logo {
	margin-bottom: 3em;
	width: 150px;
	max-width: 100%;
	background-color: transparent;
	filter: drop-shadow(0px 0px 40px #c72020);
}

.description {
	text-align: center;
	margin-top: 1em;
	color: var(--primary-dark);
}
</style>
