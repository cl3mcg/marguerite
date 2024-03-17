<template>
  <section
    class="container max-w-screen-md px-5 py-5 text-gray-900 dark:text-white md:mx-auto"
  >
    <header class="mb-4 flex">
      <h1 class="mx-4 whitespace-nowrap pt-2 align-middle text-4xl font-bold">
        Account page
      </h1>
      <div
        class="ml-auto flex justify-center justify-self-end px-4 py-4 align-top"
      >
        <button
          type="button"
          v-on:click="logout"
          class="whitespace-nowrap rounded-lg border border-red-700 px-3 py-2 text-center text-xs font-medium text-red-700 hover:bg-red-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-500 dark:hover:text-white dark:focus:ring-red-800"
        >
          <i class="bi bi bi-box-arrow-left me-2"></i>Logout
        </button>
      </div>
    </header>

    <div class="relative mb-4">
      <div class="overflow-x-hidden rounded-lg shadow-md">
        <table
          class="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right"
        >
          <caption
            class="bg-white px-2 py-5 text-left text-lg font-semibold text-gray-900 dark:bg-gray-800 dark:text-white sm:px-3 md:p-5 rtl:text-right"
          >
            General account information
            <p
              class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400"
            >
              Find the account details below.
            </p>
          </caption>
          <tbody>
            <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <th
                scope="row"
                class="w-2/6 px-2 py-2 font-medium text-gray-900 dark:text-white sm:px-3 md:w-1/6 md:whitespace-nowrap md:px-6 md:py-4"
              >
                Account ID
              </th>
              <td
                class="w-4/6 px-2 py-2 font-mono text-xs sm:px-3 md:w-5/6 md:px-6 md:py-4 md:text-sm"
                colspan="2"
              >
                {{ userAccount.id }}
              </td>
            </tr>
            <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <th
                scope="row"
                class="w-2/6 px-2 py-2 font-medium text-gray-900 dark:text-white sm:px-3 md:w-1/6 md:whitespace-nowrap md:px-6 md:py-4"
              >
                Email address
              </th>
              <td
                class="w-2/6 px-2 py-2 font-mono text-xs sm:px-3 md:w-4/6 md:px-6 md:py-4 md:text-sm"
              >
                <div class="whitespace-nowrap">
                  {{ userAccount.email }}
                  <i
                    class="ms-1 md:ms-3"
                    v-bind:class="
                      userAccount.emailVerified
                        ? 'bi bi-check-circle-fill text-green-700 dark:text-green-500'
                        : 'bi bi-x-circle-fill text-red-700 dark:text-red-500'
                    "
                    v-bind:data-popover-target="
                      userAccount.emailVerified ? '' : 'popover-email-verify'
                    "
                  >
                  </i>
                </div>
                <div
                  data-popover
                  id="popover-email-verify"
                  role="tooltip"
                  class="invisible absolute z-20 inline-block w-64 rounded-lg border border-gray-200 bg-gray-50 font-sans text-sm text-gray-500 opacity-0 shadow-xl transition-opacity duration-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
                >
                  <div
                    class="rounded-t-lg border-b border-gray-300 bg-gray-200 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                  >
                    <h3 class="font-semibold text-gray-900 dark:text-white">
                      Your email is not verified
                    </h3>
                  </div>
                  <div class="px-3 py-2">
                    <p>
                      You'll need to verify your email to benefit of all
                      features.<br />
                      Click the button below and we'll send you an message to
                      verify your email address.
                    </p>
                    <button
                      type="button"
                      class="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                    >
                      Verify email
                    </button>
                  </div>
                  <div data-popper-arrow></div>
                </div>
              </td>
              <td class="px-2 py-2 sm:w-2/6 sm:px-3 md:w-1/6 md:px-6 md:py-4">
                <button
                  type="button"
                  class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                  data-modal-target="account-change-email-modal"
                  data-modal-toggle="account-change-email-modal"
                >
                  <i class="bi bi-pencil-square me-2"></i>Edit
                </button>
              </td>
            </tr>
            <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <th
                scope="row"
                class="w-2/6 px-2 py-2 font-medium text-gray-900 dark:text-white sm:px-3 md:w-1/6 md:whitespace-nowrap md:px-6 md:py-4"
              >
                Password
              </th>
              <td
                class="w-2/6 px-2 py-2 font-mono text-xs sm:px-3 md:w-4/6 md:px-6 md:py-4 md:text-sm"
              >
                ********
              </td>
              <td class="px-2 py-2 sm:w-2/6 sm:px-3 md:w-1/6 md:px-6 md:py-4">
                <button
                  type="button"
                  class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                  data-modal-target="account-change-password-modal"
                  data-modal-toggle="account-change-password-modal"
                >
                  <i class="bi bi-pencil-square me-2"></i>Edit
                </button>
              </td>
            </tr>
            <tr class="bg-white dark:border-gray-700 dark:bg-gray-800">
              <th
                scope="row"
                colspan="2"
                class="w-4/6 px-2 py-2 font-medium text-gray-900 dark:text-white sm:px-3 md:w-5/6 md:whitespace-nowrap md:px-6 md:py-4"
              >
                Delete my account
              </th>
              <td class="px-2 py-2 sm:w-2/6 sm:px-3 md:w-1/6 md:px-6 md:py-4">
                <button
                  type="button"
                  class="whitespace-nowrap rounded-lg border border-red-700 px-3 py-2 text-center text-xs font-medium text-red-700 hover:bg-red-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-500 dark:hover:text-white dark:focus:ring-red-800"
                >
                  <i class="bi bi-trash3-fill me-2"></i>Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="relative mb-4">
      <div class="overflow-x-hidden rounded-lg shadow-md">
        <table
          class="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right"
        >
          <caption
            class="bg-white px-2 py-5 text-left text-lg font-semibold text-gray-900 dark:bg-gray-800 dark:text-white sm:px-3 md:p-5 rtl:text-right"
          >
            Settings
            <p
              class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400"
            >
              Find the application settings below.
            </p>
          </caption>
          <tbody>
            <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <th
                scope="row"
                class="w-2/6 px-2 py-2 font-medium text-gray-900 dark:text-white sm:px-3 md:w-1/6 md:whitespace-nowrap md:px-6 md:py-4"
              >
                Language
              </th>
              <td
                class="w-2/6 px-2 py-2 text-xs sm:px-3 md:w-4/6 md:px-6 md:py-4 md:text-sm"
              >
                <span class="mr-3 align-middle text-base">{{
                  languagePrefered.flag
                }}</span>
                <span class="align-middle font-mono">{{
                  languagePrefered.name
                }}</span>
              </td>
              <td class="px-2 py-2 sm:w-2/6 sm:px-3 md:w-1/6 md:px-6 md:py-4">
                <button
                  type="button"
                  class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                  data-modal-target="account-change-language-modal"
                  data-modal-toggle="account-change-language-modal"
                >
                  <i class="bi bi-pencil-square me-2"></i>Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <TheAccountChangeEmailModal></TheAccountChangeEmailModal>
    <TheAccountChangePasswordModal></TheAccountChangePasswordModal>
    <TheAccountChangeLanguageModal
      v-on:switchLanguage="defineLanguagePrefered"
    ></TheAccountChangeLanguageModal>
  </section>
</template>

<script setup>
import { ref, reactive, onBeforeMount, onMounted } from "vue";

import { initFlowbite } from "flowbite";
import TheAccountChangeEmailModal from "../parts/TheAccountChangeEmailModal.vue";
import TheAccountChangePasswordModal from "../parts/TheAccountChangePasswordModal.vue";
import TheAccountChangeLanguageModal from "../parts/TheAccountChangeLanguageModal.vue";

import { accountGetDetails } from "../../composables/accountGetDetails.js";
import { accountLogout } from "../../composables/accountLogout.js";

import { useUserStore } from "../../stores/UserStore.js";
const userStore = useUserStore();

import { useRouter } from "vue-router";
const router = useRouter();

import languageList from "../../../public/assets/json/languages.json";

const userAccount = reactive({
  id: null,
  email: null,
  emailVerified: null,
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

const languagePrefered = ref("");

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
        newPaswordData,
      );
      if (attempt) {
        router.push(`/login`);
        userStore.triggerFlash(
          `success`,
          `Password modified`,
          `The password has been updated, please login again with your new credentials.`,
        );
        return true;
      } else {
        userStore.triggerFlash(
          `danger`,
          `Password modification failed`,
          `The password has not been updated, please try again later.`,
        );
      }
    } catch (error) {
      console.log(error);
      userStore.triggerFlash(
        `danger`,
        `Password modification failed`,
        `The password has not been updated, please try again later.`,
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
        newEmailData,
      );
      if (attempt) {
        router.push(`/login`);
        userStore.triggerFlash(
          `success`,
          `Email modified`,
          `The email address has been updated, please login again with your new credentials.`,
        );
        return true;
      } else {
        userStore.triggerFlash(
          `danger`,
          `Email modification failed`,
          `The email address has not been updated, please try again later.`,
        );
      }
    } catch (error) {
      console.log(error);
      userStore.triggerFlash(
        `danger`,
        `Email modification failed`,
        `The email address has not been updated, please try again later.`,
      );
      return false;
    }
  }
  return false;
};

const logout = function () {
  accountLogout(userStore, router);
};

const deleteAccount = function () {
  // function to send an API request to the backend to update the email of the user.
  return false;
};

const defineLanguagePrefered = function (languageCode) {
  languagePrefered.value = languageList.find((el) => el.code === languageCode);
};

onBeforeMount(async function () {
  const accountDetails = await accountGetDetails();
  userAccount.id = accountDetails.id;
  userAccount.email = accountDetails.email;
  userAccount.type = accountDetails.isAdmin
    ? "Admin. account"
    : "Regular account";
  userAccount.emailVerified = accountDetails.isVerifiedEmail ? true : false;
});

onMounted(() => {
  initFlowbite();
});

onMounted(() => {
  languagePrefered.value = languageList.find(
    (el) => el.code === userStore.language,
  );
});
</script>
