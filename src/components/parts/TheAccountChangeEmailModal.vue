<template>
  <div
    id="account-change-email-modal"
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
            Change your email address
          </h3>
          <button
            type="button"
            class="close-modal-button end-2.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="account-change-email-modal"
            v-on:click="resetAll"
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
        <div class="container space-y-4 p-4 md:p-5">
          <div class="text-justify text-sm">
            After updating your email, you'll be logged out and need to sign in
            again with your new credentials.<br />
            You'll also receive a message with a verification link to validate
            your updated email address.
          </div>
          <form
            v-on:submit.prevent="accountChangeEmailSubmit"
            class="space-y-4"
          >
            <div>
              <label
                for="currentPassword"
                class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >Current password</label
              >
              <input
                v-model="currentPassword"
                v-on:input="resetErrorLabels"
                type="password"
                name="currentPassword"
                id="currentPassword"
                v-bind:class="[
                  fieldClassDefault,
                  showFieldsErrorLabel ? fieldClassInvalid : '',
                ]"
                placeholder="*******"
              />
            </div>
            <div>
              <label
                for="emailChange1"
                class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >New email address</label
              >
              <input
                v-model="emailChange1"
                v-on:input="resetErrorLabels"
                type="email"
                name="emailChange1"
                id="emailChange1"
                v-bind:class="[
                  fieldClassDefault,
                  showFieldsErrorLabel ? fieldClassInvalid : '',
                ]"
                placeholder="your@new_email.com"
              />
            </div>
            <div>
              <label
                for="emailChange2"
                class="block text-sm font-medium text-gray-900 dark:text-white"
                >Confirm your new email address</label
              >
              <input
                v-model="emailChange2"
                v-on:input="resetErrorLabels"
                type="email"
                name="emailChange2"
                id="emailChange2"
                v-bind:class="[
                  fieldClassDefault,
                  showFieldsErrorLabel ? fieldClassInvalid : '',
                ]"
                placeholder="your@new_email.com"
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
                aria-hidden="true"
                role="status"
                class="me-3 inline h-4 w-4 animate-spin text-white"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              {{ isLoading ? "Loading..." : "Update my email address" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@stores/UserStore.js";
const userStore = useUserStore();

import { useRouter } from "vue-router";
const router = useRouter();
import { vOnClickOutside } from "@vueuse/components";
import { accountChangeEmail } from "@composables/accountChangeEmail.js";

import { ref, watch } from "vue";

const currentPassword = ref("");
const emailChange1 = ref("");
const emailChange2 = ref("");
const showFieldsErrorLabel = ref(false);
const isLoading = ref(false);

const fieldClassDefault = ref(
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white",
);
const fieldClassValid = ref(
  "bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500",
);
const fieldClassInvalid = ref(
  "bg-red-50 border-2 border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500",
);
const buttonClassLoading = ref(
  "w-full text-white bg-purple-400 dark:bg-purple-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center",
);

const checkFormValidity = function () {
  if (
    !currentPassword.value ||
    !emailChange1.value ||
    !emailChange2.value ||
    emailChange1.value !== emailChange2.value
  ) {
    userStore.triggerFlash(
      "warning",
      "Invalid data provided",
      "The email address update form is not properly filled.",
    );
    showFieldsErrorLabel.value = true;
    return false;
  }
  return true;
};

const resetErrorLabels = function () {
  showFieldsErrorLabel.value = false;
};

const resetInputs = function () {
  emailChange1.value = "";
  emailChange2.value = "";
};

const resetAll = function () {
  resetErrorLabels();
  resetInputs();
};

const accountChangeEmailSubmit = async function () {
  if (checkFormValidity()) {
    isLoading.value = true;
    const data = {
      newEmail: emailChange1.value,
      password: currentPassword.value,
    };
    const result = await accountChangeEmail(userStore, router, data);
    if (result) {
      isLoading.value = false;
      return true;
    } else {
      isLoading.value = false;
      return false;
    }
  }
  isLoading.value = false;
  return false;
};
</script>
