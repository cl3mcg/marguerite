<template>
	<div class="login-form">
		<menu class="form-type">
			<li class="button" tabindex="0" v-on:click="formType = 'login'">Login</li>
			<li class="button" tabindex="0" v-on:click="formType = 'create'">
				Create an account
			</li>
		</menu>
		<LoginForm v-show="formType === 'login'"></LoginForm>
		<CreateAccountForm
			v-show="formType === 'create'"
			v-on:switch-tab="formType = 'login'"
		></CreateAccountForm>
	</div>
</template>

<script setup>
import LoginForm from "../layout/LoginForm.vue";
import CreateAccountForm from "../layout/CreateAccountForm.vue";

import { ref } from "vue";

const formType = ref("login");
</script>

<style scoped>
.login-form {
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
	height: 75vh;
	gap: 1em;
	margin-top: 3em;
}

menu {
	padding: 1em 0.5em;
	list-style: none;
	display: flex;
	align-items: end;
	justify-content: center;
	width: auto;
	height: auto;
	border: 1px solid var(--primary-dark);
	box-shadow: 5px 5px 0px var(--primary-dark);
	background-color: var(--primary-light-nav);
}

menu li {
	cursor: pointer;
	color: var(--primary-dark);
	text-align: center;
	width: 12.5em;
	margin: 0.3em;
	padding: 0.3em 1em;
	text-decoration: none;
	background-color: var(--primary-lighter);
	border: 1px solid var(--primary-dark);
	box-shadow: 2px 2px 0px var(--primary-dark);
	transition: ease-in-out 0.1s;
}

menu li:hover {
	background-color: var(--primary-light-hover);
	box-shadow: 1px 1px 0px var(--primary-dark);
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

@media screen and (max-height: 600px) {
	.login-form {
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
