<template>
	<form v-on:submit.prevent="login">
		<legend><h1>Login</h1></legend>
		<div class="form-group">
			<label for="email">Email:</label>
			<input type="email" id="email" v-model="email" required />
		</div>
		<div class="form-group">
			<label for="password">Password:</label>
			<input type="password" id="password" v-model="password" required />
		</div>
		<div class="form-group">
			<input type="checkbox" id="remember-me" v-model="rememberMe" />
			<label for="remember-me">Remember me</label>
		</div>
		<div class="form-button">
			<button type="submit">Login</button>
			<a class="button" tabindex="0">Forgot my password</a>
		</div>
	</form>
</template>

<script setup>
import { useUserStore } from "../../stores/UserStore.js";
const userStore = useUserStore();

import { useRouter } from "vue-router";
const router = useRouter();

import { ref } from "vue";

const email = ref("");
const password = ref("");
const rememberMe = ref(false);

const checkFormValidity = function () {
	if (!email.value || !password.value) {
		userStore.triggerFlash(
			"warning",
			"Invalid data provided",
			"The login form is not properly filled"
		);
		return false;
	}
	return true;
};

const login = async function () {
	let url = `/backend/user/login`;
	let data = {
		email: email.value,
		password: password.value,
		rememberMe: rememberMe.value,
	};
	if (checkFormValidity()) {
		let login = await userStore.loginAccount(url, data);
		if (login) {
			userStore.intendedRoute
				? router.push(userStore.intendedRoute)
				: router.push("/account");
			userStore.intendedRoute = null;
			return true;
		} else {
			return false;
		}
	}
};
</script>

<style scoped>
form {
	width: 25em;
	height: 40em;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 1em;
}

legend {
	align-self: start;
	margin: 1em 0;
}

button,
a.button {
	height: 2.5em;
	width: 75%;
}

.form-group {
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-bottom: 1rem;
}
.form-group:nth-of-type(3) {
	align-self: start;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	gap: 1em;
	margin-bottom: 1.5rem;
}
.form-button {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: 2em;
}

.form-button *:last-child {
	margin-top: 1em;
}

@media screen and (max-width: 930px) {
	form {
		width: 22.5em;
		height: 35em;
	}
	legend {
		font-size: 0.8em;
	}
}

@media screen and (max-width: 600px) {
	form {
		width: 20em;
		height: 35em;
		justify-content: start;
	}
}

@media screen and (max-height: 600px) {
	form {
		width: 20em;
		height: 35em;
		justify-content: start;
		padding: 0 1em;
	}
	.form-button {
		margin-top: 1em;
		flex-direction: row;
		font-size: small;
		gap: 0.5em;
	}
	.form-button *:last-child {
		margin-top: 0;
	}
	legend {
		font-size: 0.8em;
		margin-top: 0;
	}
}

@media screen and (max-height: 400px) {
	form {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1em;
	}
	legend {
		align-self: center;
		margin: 0;
	}
	.form-group:not(last) {
		margin: 0;
	}
	.form-group:nth-of-type(3) {
		margin-top: 0.75em;
		margin-bottom: 1.25em;
	}
	.form-button {
		display: flex;
		flex-direction: row;
		gap: 1em;
		margin-top: 0;
	}
	.form-button button:last-of-type {
		margin-top: 0;
	}

	.form-button *:last-child {
		margin-top: 0;
	}
}
</style>
