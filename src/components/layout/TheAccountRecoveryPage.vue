<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0"
    >
      <div
        class="mb-6 flex items-center text-nowrap text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <div class="me-3 h-7 w-7"><iconMarguerite></iconMarguerite></div>
        Maguerite project
      </div>
      <div
        class="w-full rounded-lg bg-white p-6 shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md sm:p-8 md:mt-0"
      >
        <h2
          class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl"
        >
          Password reset
        </h2>
        <div class="mt-4 space-y-4 md:space-y-5 lg:mt-5" action="#">
          <div>
            <label
              for="email"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >Your email</label
            >
            <input
              v-model="formData.email"
              type="email"
              name="email"
              id="email"
              class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-600 focus:ring-purple-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              for="password"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >New Password</label
            >
            <input
              v-model="formData.newPassword"
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-600 focus:ring-purple-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              for="confirm-password"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >Confirm password</label
            >
            <input
              v-model="formData.newPasswordConfirm"
              type="password"
              name="confirm-password"
              id="confirm-password"
              placeholder="••••••••"
              class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-600 focus:ring-purple-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              required
            />
          </div>
          <button
            v-on:click.prevent="sendRecoverPasswordForm"
            type="button"
            v-bind:class="
              isLoading
                ? 'me-2 w-full rounded-lg bg-purple-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-800 dark:hover:bg-purple-900 dark:focus:ring-purple-800'
                : 'me-2 w-full rounded-lg bg-purple-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800'
            "
            v-bind:disabled="isLoading"
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
            {{ isLoading ? "Loading..." : "Reset your password" }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import iconMarguerite from "@components/icons/iconMarguerite.vue";

import { reactive, ref } from "vue";
import { processPasswordRecovery } from "@composables/processPasswordRecovery.js";

import { useUserStore } from "@stores/UserStore.js";
const userStore = useUserStore();

import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const isLoading = ref(false);

const formData = reactive({
  email: "",
  newPassword: "",
  newPasswordConfirm: "",
});

const validateFormData = function () {
  if (
    !formData ||
    !formData.email ||
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
    isLoading.value = true;
    try {
      const recoveryKey = route.params.recoveryKey;
      const newPassword = formData.newPassword;
      const email = formData.email;
      await processPasswordRecovery(
        userStore,
        router,
        recoveryKey,
        newPassword,
        email,
      );
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  } else {
    userStore.triggerFlash(
      "warning",
      "Invalid data provided",
      "The password reset form is not properly filled.",
    );
  }
};
</script>
