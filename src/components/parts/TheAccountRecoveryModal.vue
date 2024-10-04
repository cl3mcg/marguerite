<template>
  <div
    id="account-recovery-modal"
    tabindex="-1"
    aria-hidden="true"
    class="fixed left-0 right-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0"
  >
    <div
      class="relative max-h-full w-full max-w-md p-4"
      v-on-click-outside="resetAll"
    >
      <!-- Modal content -->
      <div class="relative rounded-lg bg-white shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600 md:p-5"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Account recovery
          </h3>
          <button
            type="button"
            class="close-modal-button end-2.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="account-recovery-modal"
          >
            <svg
              class="h-3 w-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="container p-4 md:p-5">
          <div
            class="mb-4 text-justify text-sm text-gray-900 dark:text-white md:mb-5"
          >
            If you lost your password, please provide your email address
            below.<br />If it matches our records, you will recieve an email
            with further instructions to recover access to your account.
          </div>
          <form v-on:submit.prevent="sendRecoveryEmail" class="space-y-4">
            <div>
              <label
                for="emailRecover"
                class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >Your email</label
              >
              <input
                v-model="emailRecover"
                v-on:input="resetErrorLabels"
                type="email"
                name="emailRecover"
                id="emailRecover"
                v-bind:class="[
                  fieldClassDefault,
                  showFieldsErrorLabel ? fieldClassInvalid : '',
                ]"
                placeholder="your@email.com"
              />
            </div>
            <button
              type="submit"
              v-bind:class="
                isLoading
                  ? buttonClassLoading
                  : 'w-full rounded-lg bg-purple-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800'
              "
            >
              <svg
                v-if="isLoading"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-flower2 me-3 inline animate-spin text-base text-white"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 16a4 4 0 0 0 4-4 4 4 0 0 0 0-8 4 4 0 0 0-8 0 4 4 0 1 0 0 8 4 4 0 0 0 4 4m3-12q0 .11-.03.247c-.544.241-1.091.638-1.598 1.084A3 3 0 0 0 8 5c-.494 0-.96.12-1.372.331-.507-.446-1.054-.843-1.597-1.084A1 1 0 0 1 5 4a3 3 0 0 1 6 0m-.812 6.052A3 3 0 0 0 11 8a3 3 0 0 0-.812-2.052c.215-.18.432-.346.647-.487C11.34 5.131 11.732 5 12 5a3 3 0 1 1 0 6c-.268 0-.66-.13-1.165-.461a7 7 0 0 1-.647-.487m-3.56.617a3 3 0 0 0 2.744 0c.507.446 1.054.842 1.598 1.084q.03.137.03.247a3 3 0 1 1-6 0q0-.11.03-.247c.544-.242 1.091-.638 1.598-1.084m-.816-4.721A3 3 0 0 0 5 8c0 .794.308 1.516.812 2.052a7 7 0 0 1-.647.487C4.66 10.869 4.268 11 4 11a3 3 0 0 1 0-6c.268 0 .66.13 1.165.461.215.141.432.306.647.487M8 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2"
                />
              </svg>
              {{ isLoading ? "Loading..." : "Send me an email" }}
            </button>
            <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
              <button
                type="button"
                data-modal-hide="account-recovery-modal"
                data-modal-target="account-login-modal"
                data-modal-toggle="account-login-modal"
                class="text-purple-700 hover:underline dark:text-purple-400"
              >
                Back to the login form
              </button>
            </div>
          </form>
        </div>
        <!-- Modal footer / Alert -->
        <!-- <div v-if=showAlert.show class="flex p-4 text-sm text-red-800 rounded-b-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
					<i class="bi bi-exclamation-circle-fill me-3 motion-safe:animate-pulse"></i>
					<span class="sr-only">Error</span>
					<span class="font-medium">{{ showAlert.message }}</span>
				</div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { accountRecoveryRequest } from "@composables/accountRecoveryRequest.js";

import { useUserStore } from "@stores/UserStore.js";
const userStore = useUserStore();

import { modalClose } from "@composables/modalClose.js";
import { vOnClickOutside } from "@vueuse/components";

import { ref } from "vue";

const fieldClassDefault = ref(
  "w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white",
);
const fieldClassValid = ref(
  "w-full bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500",
);
const fieldClassInvalid = ref(
  "w-full bg-red-50 border-2 border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500",
);
const buttonClassLoading = ref(
  "w-full text-white bg-purple-400 dark:bg-purple-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center",
);
const emailRecover = ref("");
const showFieldsErrorLabel = ref(false);
const isLoading = ref(false);

const checkFormValidity = function () {
  if (!emailRecover.value || emailRecover.value.length <= 4) {
    showFieldsErrorLabel.value = true;
    userStore.triggerFlash(
      "warning",
      "Invalid data provided",
      "The account recovery form is not properly filled.",
    );
    return false;
  }
  showFieldsErrorLabel.value = false;
  return true;
};

const resetErrorLabels = function () {
  showFieldsErrorLabel.value = false;
};

const resetAll = function () {
  emailRecover.value = "";
  isLoading.value = false;
  resetErrorLabels();
};

const sendRecoveryEmail = async function () {
  if (checkFormValidity()) {
    isLoading.value = true;
    try {
      let recoveryRequest = await accountRecoveryRequest(
        userStore,
        emailRecover.value,
      );
      if (recoveryRequest) {
        modalClose();
        return true;
      }
    } catch (error) {
      userStore.triggerFlash(
        "danger",
        "An error occurred",
        "An error occurred durring the account recovery process.",
      );
    } finally {
      isLoading.value = false;
    }
    return false;
  }
};
</script>
