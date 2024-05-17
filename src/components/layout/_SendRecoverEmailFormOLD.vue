<template>
  <form v-on:submit.prevent="sendRecoverEmail">
    <legend><h1>Account recovery</h1></legend>
    <div class="form-group">
      <label for="recoveryEmailAddress">Email linked to the account:</label>
      <input
        type="email"
        id="recoveryEmailAddress"
        v-model.trim="recoveryEmailAddress"
        required
      />
    </div>
    <button>Recover the password</button>
    <footer>
      Upon form validation, an email with the password recovery instructions
      will be sent to the email address linked to your account.
    </footer>
  </form>
</template>

<script setup>
import { ref } from "vue";

import { useUserStore } from "../../stores/UserStore.js";
const userStore = useUserStore();

// import { requestPasswordRecovery } from "../../composables/requestPasswordRecovery.js";

const recoveryEmailAddress = ref("");

const checkFormValidity = function () {
  if (!recoveryEmailAddress.value || recoveryEmailAddress.value.length <= 4) {
    console.log(recoveryEmailAddress.value, recoveryEmailAddress.value.length);
    userStore.triggerFlash(
      "warning",
      "Invalid data provided",
      "The account recovery form is not properly filled",
    );
    return false;
  }
  return true;
};

const sendRecoverEmail = async function () {
  if (checkFormValidity()) {
    let recoveryRequest = await requestPasswordRecovery(
      recoveryEmailAddress.value,
    );
    if (recoveryRequest) {
      userStore.triggerFlash(
        "success",
        "Check your inbox",
        "You will receive an email with instructions to recover your account.",
      );
    } else {
      userStore.triggerFlash(
        "warning",
        "Recovery error",
        "There was an error during the account recovery process. Please try again later.",
      );
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
  gap: 2em;
}

legend {
  align-self: start;
  margin: 1em 0;
}

button {
  width: 75%;
}

.form-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

form footer {
  font-size: 0.75em;
  font-style: italic;
  margin-top: 1em;
}

@media screen and (max-width: 930px) {
  form {
    width: 22.5em;
    height: 40em;
    justify-content: center;
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
    margin: auto 0 !important;
    padding: auto 0;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 0 1em;
  }
  legend {
    flex: 100%;
    margin: 0;
  }
  .form-group:nth-of-type(1),
  .form-group:nth-of-type(2) {
    flex: 45%;
  }
  .form-group:not(last) {
    margin: 0;
  }
  .form-group:nth-of-type(3) {
    margin: 0.5em 0;
  }
  .form-button {
    display: flex;
    flex-direction: row;
    gap: 1em;
    margin-top: 0;
  }

  button:last-of-type {
    margin-top: 0.25em;
    width: 75%;
    height: 2em;
  }
  menu {
    margin: 0;
  }
  input {
    height: 1.75em;
    font-size: 0.85em;
  }
}
</style>
