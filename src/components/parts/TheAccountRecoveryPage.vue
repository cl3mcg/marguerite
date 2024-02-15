<template>
	<section>
		<form v-on:submit.prevent="sendRecoverPasswordForm">
			<legend><h1>Reset your password</h1></legend>
			<div class="form-group">
				<label for="newPassword">Password:</label>
				<input
					type="password"
					id="newPassword"
					v-model="formData.newPassword"
					required
				/>
			</div>
			<div class="form-group">
				<label for="newPasswordConfirm">Confirm the password:</label>
				<input
					type="password"
					id="newPasswordConfirm"
					v-model="formData.newPasswordConfirm"
					required
				/>
			</div>
			<button>Reset the password</button>
		</form>
	</section>
</template>

<script setup>
import { reactive } from "vue";
import { processPasswordRecovery } from "../../composables/processPasswordRecovery.js";

import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const formData = reactive({
	newPassword: "",
	newPasswordConfirm: "",
});

const validateFormData = function () {
	if (
		!formData ||
		!formData.newPassword ||
		!formData.newPasswordConfirm ||
		formData.newPassword !== formData.newPasswordConfirm
	) {
		return false;
	}
	return true;
};

const sendRecoverPasswordForm = async function () {
	if (validateFormData()) {
		console.log("The form is valid");
		try {
			const recoveryKey = route.params.recoveryKey;
			const newPassword = formData.newPassword;
			await processPasswordRecovery(recoveryKey, newPassword, router);
		} catch (error) {
			console.error(error);
		}
	} else {
		console.log("The form is NOT valid");
	}
};
</script>

<style scoped>
section {
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
	height: 75vh;
	gap: 1em;
	margin-top: 3em;
}

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

button {
	margin-top: 1em;
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

@media screen and (max-width: 930px) {
	menu {
		font-size: small;
		justify-content: center;
	}
	.login-form {
		gap: 1em;
	}
}

@media screen and (max-width: 600px) {
	menu {
		font-size: small;
		justify-content: center;
	}
	.login-form {
		gap: 0em;
		justify-content: start;
	}
}

@media screen and (max-width: 365px) {
	menu {
		width: 90%;
	}
}

@media screen and (max-height: 600px) {
	.login-form {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		height: 75vh;
		gap: 1em;
		margin-top: 1em;
	}
}

@media screen and (max-height: 400px) {
	.login-form {
		margin-top: 1em;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: start;
		height: 100%;
		gap: 1em;
	}
	menu {
		padding: 2em;
		margin: 1em;
		list-style: none;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 25vw;
		height: 30vh;
	}
	menu li {
		width: 110%;
	}
}
</style>
