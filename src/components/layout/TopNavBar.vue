<template>
	<nav class="topnav" id="myTopnav">
		<div>
			<img src="../../assets/icons/favicon.svg" alt="Marguerite logo" />
			<router-link class="button" to="/home">Home</router-link>
			<router-link class="button" to="/tools">Tools</router-link>
			<router-link class="button" to="/contact">Contact</router-link>
			<router-link class="button" to="/about">About</router-link>
		</div>
		<div>
			<router-link class="button" to="/account">Account</router-link>
			<a
				class="button icon"
				tabindex="0"
				v-on:mousedown="toggleNav()"
				v-on:keypress.enter="toggleNav()"
				v-on:focusout="closeNav($event)"
				>{{ navResponsive ? "⨉" : "☰" }}</a
			>
		</div>
	</nav>
	<nav
		v-if="navResponsive"
		class="topnav-responsive"
		v-on:focusout="closeNav($event)"
		ref="nav"
	>
		<router-link class="button" to="/home">Home</router-link>
		<router-link class="button" to="/tools">Tools</router-link>
		<router-link class="button" to="/contact">Contact</router-link>
		<router-link class="button" to="/about">About</router-link>
		<router-link class="button" to="/account">Account</router-link>
	</nav>
</template>

<script setup>
import { ref } from "vue";

const accountInnerText = ref("");
const accountLink = ref("");
const navResponsive = ref(false);
const nav = ref(null);

const toggleNav = function () {
	return (navResponsive.value = !navResponsive.value);
};

const closeNav = function (event) {
	if (!nav.value.contains(event.relatedTarget)) {
		return (navResponsive.value = false);
	}
};
</script>

<style scoped>
.topnav-responsive {
	display: none;
}

.topnav,
.topnav div {
	background-color: var(--primary-light-nav);
	overflow: hidden;
	display: flex; /* Use flexbox */
	align-items: center; /* Center children vertically */
	justify-content: space-between;
}

a {
	margin: 0.3em;
	padding: 0.3em 1em;
}
div:nth-of-type(2) a:nth-last-child(-n + 2) {
	/* Related to the "Account button" the a right before the last a */
	margin-right: 1em;
}

div a.icon {
	width: 1.5em;
}

img {
	max-width: 2em;
	color: var(--primary-dark);
	text-align: center;
	text-decoration: none;
	margin: 0.8em 1em;
}

.icon {
	display: none;
}

@media screen and (max-width: 600px) {
	.topnav a:not(:first-child),
	.topnav a:not(:last-child) {
		display: none;
	}
	.topnav a.icon {
		float: right;
		display: block;
	}
	.topnav-responsive {
		position: absolute;
		right: 1em;
		padding: 1em;
		display: flex;
		flex-direction: column;
		align-items: end;
		justify-content: start;
		width: calc(auto + 10px);
		border: 1px solid var(--primary-dark);
		box-shadow: 5px 5px 0px var(--primary-dark);
		background-color: var(--primary-light-nav);
		z-index: 1;
	}
	.topnav-responsive a {
		width: 7rem;
	}
	.topnav-responsive a {
		float: none;
		display: block;
		text-align: left;
	}
}
</style>
