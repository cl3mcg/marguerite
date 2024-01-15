<template>
	<form v-on:submit.prevent="register">
		<legend><h1>Create an account</h1></legend>
		<div class="form-group">
			<label for="emailCreate1">Email:</label>
			<input
				type="email"
				id="emailCreate1"
				v-model="emailCreate1"
				v-on:update="checkEmailConcurrency"
				required
			/>
		</div>
		<div class="form-group">
			<label for="emailCreate2">Confirm email:</label>
			<input
				type="email"
				id="emailCreate2"
				v-model="emailCreate2"
				v-on:update="checkEmailConcurrency"
				required
			/>
		</div>
		<div class="form-group">
			<label for="passwordCreate">Password:</label>
			<input
				type="password"
				id="passwordCreate"
				v-model="passwordCreate"
				required
			/>
		</div>
		<button>Create your account</button>
	</form>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../../stores/UserStore.js";
const userStore = useUserStore();
const emit = defineEmits(["switch-tab"]);

const emailCreate1 = ref("");
const emailCreate2 = ref("");
const passwordCreate = ref("");

const checkFormValidity = function () {
	if (
		!emailCreate1.value ||
		!emailCreate2.value ||
		!passwordCreate.value ||
		emailCreate1.value !== emailCreate2.value
	) {
		userStore.triggerFlash(
			"warning",
			"Invalid data provided",
			"The registration form is not properly filled"
		);
		return false;
	}
	return true;
};

const register = async function () {
	let url = `/backend/user/register`;
	let data = {
		email: emailCreate1.value,
		password: passwordCreate.value,
	};
	if (checkFormValidity()) {
		let registration = await userStore.registerAccount(url, data);
		if (registration) {
			userStore.triggerFlash(
				"success",
				"Welcome",
				"Your account has been successfully created. You can now login to your account."
			);
			return emit("switch-tab");
		} else {
			userStore.triggerFlash(
				"warning",
				"Registration error",
				"There was an error during the registration process. Please try again later."
			);
		}
	}
	return false;
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

button {
	width: 75%;
}

button:last-of-type {
	margin-top: 1.5em;
}
.form-group {
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-bottom: 1rem;
}

@media screen and (max-width: 930px) {
	form {
		width: 22.5em;
		height: 40em;
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
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1em;
	}
	.form-group {
		margin: 0;
	}
	legend {
		align-self: center;
		margin: 0;
	}
	button {
		margin-top: 0;
	}
}
</style>
