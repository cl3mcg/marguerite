<template>
	<section>
		<h1>Account page</h1>
		<div>
			<h2>General information</h2>
			<table>
				<tr>
					<td>Account id</td>
					<td class="font-mono">{{ userAccount.id }}</td>
				</tr>
				<tr>
					<td>Account type</td>
					<td class="font-mono">
						{{ userAccount.type }}
					</td>
				</tr>
				<tr>
					<td>Email</td>
					<td class="font-mono">{{ userAccount.email }}</td>
				</tr>
			</table>
			<button v-on:click="logout" v-on:keydown.enter="logout">Logout</button>
		</div>
		<div>
			<h2
				v-on:click="toggle('password')"
				v-on:keydown.enter="toggle('password')"
				v-bind:class="displayedItems.password ? 'expanded' : ''"
				tabindex="0"
			>
				Change password
			</h2>
			<form v-if="displayedItems.password" v-on:submit.prevent="newPassword">
				<label for="currentPassword">Current password:</label>
				<input
					type="password"
					id="currentPassword"
					v-model="currentPassword"
					required
				/>
				<label for="newPassword1">New password:</label>
				<input
					type="password"
					id="newPassword1"
					v-model="newPasswordValues.newPassword1"
					required
				/>
				<label for="newPassword2">Confirm new password:</label>
				<input
					type="password"
					id="newPassword2"
					v-model="newPasswordValues.newPassword2"
					required
				/>
				<button>Change password</button>
			</form>
		</div>
		<div>
			<h2
				v-on:click="toggle('email')"
				v-on:keydown.enter="toggle('email')"
				v-bind:class="displayedItems.email ? 'expanded' : ''"
				tabindex="0"
			>
				Change Email
			</h2>
			<form v-if="displayedItems.email" v-on:submit.prevent="newEmail">
				<label for="newEmail1">New email:</label>
				<input
					type="email"
					id="newEmail1"
					v-model="newEmailValues.newEmail1"
					required
				/>
				<label for="newEmail2">Confirm new email:</label>
				<input
					type="email"
					id="newEmail2"
					v-model="newEmailValues.newEmail2"
					required
				/>
				<button>Change email</button>
			</form>
		</div>
		<div>
			<h2
				v-on:click="toggle('danger')"
				v-on:keydown.enter="toggle('danger')"
				v-bind:class="displayedItems.danger ? 'expanded' : ''"
				tabindex="0"
			>
				Danger zone
			</h2>
			<div v-if="displayedItems.danger">
				<strong>Delete my account and all personal data</strong>
				<p>
					This website and app doesn't collect personal data except your email
					address which is used as an identifier to log in your account. If you
					wish you can always delete your account as well as all information
					related to it.
				</p>
				<p class="danger">
					The deletion of your account is permanent and irreversible.
				</p>
				<p>
					To confirm the deletion of your account, write '<code
						>delete everything</code
					>' using lowercases, in the text field below and click the '<i
						>Delete my account</i
					>' button.
				</p>
				<form v-on:submit.prevent="deleteAccount">
					<label for="deleteAccount">Confirmation</label>
					<input
						type="text"
						id="deleteAccount"
						v-model="deleteConfirmation"
						placeholder="Enter 'delete everything' here"
						required
					/>
					<button
						class="danger"
						v-bind:disabled="deleteConfirmation !== 'delete everything'"
					>
						Delete my account
					</button>
				</form>
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

const userAccount = reactive({
	id: null,
	email: null,
	type: null,
});

const displayedItems = reactive({
	email: false,
	password: false,
	danger: false,
});

const newPasswordValues = reactive({
	newPassword1: null,
	newPassword2: null,
});

const currentPassword = ref("");

const newEmailValues = reactive({
	newEmail1: null,
	newEmail2: null,
});

const deleteConfirmation = ref("");

const toggle = function (item) {
	const object = displayedItems;
	for (const key in object) {
		if (key === item) {
			object[key] = !object[key];
		} else {
			object[key] = false;
		}
	}
};

const checkFormValidity = function (object) {
	let firstValue;
	for (const key in object) {
		if (firstValue === undefined) {
			firstValue = object[key];
		} else if (object[key] !== firstValue) {
			return false;
		}
	}
	return true;
};

const getAccountDetails = async function () {
	const accountDetails = await userStore.getAccountDetails(
		`/backend/user/userDetails`,
		localStorage.getItem("accountToken")
	);
	userAccount.id = accountDetails.id;
	userAccount.email = accountDetails.email;
	userAccount.type = accountDetails.isAdmin
		? "Admin. account"
		: "Regular account";
};

const newPassword = async function () {
	if (checkFormValidity(newPasswordValues)) {
		const newPaswordData = {
			currentPassword: currentPassword.value,
			newPassword: newPasswordValues.newPassword1,
			token: localStorage.getItem("accountToken"),
		};
		console.log(newPaswordData);
		try {
			const attempt = await userStore.changePassword(
				`/backend/user/changePassword`,
				newPaswordData
			);
			if (attempt) {
				router.push(`/login`);
				userStore.triggerFlash(
					`success`,
					`Password modified`,
					`The password has been updated, please login again with your new credentials.`
				);
				return true;
			} else {
				userStore.triggerFlash(
					`danger`,
					`Password modification failed`,
					`The password has not been updated, please try again later.`
				);
			}
		} catch (error) {
			console.log(error);
			userStore.triggerFlash(
				`danger`,
				`Password modification failed`,
				`The password has not been updated, please try again later.`
			);
			return false;
		}
	}
	return false;
};

const newEmail = async function () {
	if (checkFormValidity(newEmailValues)) {
		const newEmailData = {
			newEmail: newEmailValues.newEmail1,
			token: localStorage.getItem("accountToken"),
		};
		try {
			const attempt = await userStore.changeEmail(
				`/backend/user/changeEmail`,
				newEmailData
			);
			if (attempt) {
				router.push(`/login`);
				userStore.triggerFlash(
					`success`,
					`Email modified`,
					`The email address has been updated, please login again with your new credentials.`
				);
				return true;
			} else {
				userStore.triggerFlash(
					`danger`,
					`Email modification failed`,
					`The email address has not been updated, please try again later.`
				);
			}
		} catch (error) {
			console.log(error);
			userStore.triggerFlash(
				`danger`,
				`Email modification failed`,
				`The email address has not been updated, please try again later.`
			);
			return false;
		}
	}
	return false;
};

const logout = function () {
	try {
		userStore.logoutAccount();
		userStore.triggerFlash(
			"success",
			"Logged out",
			"You are now logged out of your account"
		);
		router.push("/home");
	} catch (error) {
		console.log(error);
		userStore.triggerFlash(
			"danger",
			"Error while logging out",
			"There's been a problem logging out, please try again later"
		);
		return false;
	}
};

const deleteAccount = function () {
	// function to send an API request to the backend to update the email of the user.
	return false;
};

onBeforeMount(getAccountDetails);
</script>

<style scoped>
section {
	margin: 0 25vw 2em 25vw;
	display: flex;
	flex-direction: column;
	gap: 1em;
}

div:not(:first-of-type) h2 {
	font-size: 1.15em;
	cursor: pointer;
	display: flex;
	align-items: center;
	transition: 0.1s ease-in-out;
	padding: 0.5em 0;
	margin: 0.1em 0;
}

div:not(:first-of-type) h2:not(.expanded):hover {
	background-color: var(--primary-light-hover);
}

div:not(:first-of-type) h2::before {
	content: "›";
	margin: 0 1em 0 0.5em;
	transition: transform 0.1s ease-in-out;
}

div:not(:first-of-type) h2.expanded::before {
	transform: rotate(90deg);
}

h2.expanded {
	background-color: var(--primary-dark);
	color: var(--primary-light);
}

legend {
	align-self: start;
}

div label:not(:first-of-type) {
	margin-top: 1em;
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

input {
	margin: 0;
}

input#deleteAccount::placeholder {
	text-transform: none;
}

div > div {
	margin: 1rem 0;
}

div > div p {
	text-align: justify;
}

table {
	width: 100%;
}

.font-mono {
	font-family: var(--font-monospace);
}

p.danger {
	font-weight: 600;
	color: var(--red-500);
	text-decoration: 5px solid underline var(--red-500);
	text-decoration-skip-ink: none;
	text-underline-offset: 3px;
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
