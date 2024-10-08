<template>
  <section
    class="container max-w-screen-md px-5 py-5 text-gray-900 dark:text-white md:mx-auto"
  >
    <header class="mb-4 flex">
      <h1 class="mx-4 whitespace-nowrap pt-2 align-middle text-4xl font-bold">
        Account details
      </h1>
      <div
        class="ml-auto flex justify-center justify-self-end py-4 ps-4 align-top sm:pe-4"
      >
        <button
          type="button"
          v-on:click="logout"
          class="whitespace-nowrap rounded-lg border border-red-700 px-3 py-2 text-center text-xs font-medium text-red-700 hover:bg-red-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:bg-red-800 dark:text-red-200 dark:hover:bg-red-500 dark:hover:text-white dark:focus:ring-red-800"
          data-tooltip-target="tooltip-logout"
          data-tooltip-placement="left"
        >
          <i class="bi bi-box-arrow-left sm:me-2"></i
          ><span class="hidden sm:inline">Logout</span>
        </button>
        <div
          id="tooltip-logout"
          role="tooltip"
          class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm dark:bg-gray-700 sm:hidden"
        >
          Logout
          <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
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
                      v-on:click="sendVerificationEmail"
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
                <div class="flex justify-end">
                  <button
                    type="button"
                    class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                    data-modal-target="account-change-email-modal"
                    data-modal-toggle="account-change-email-modal"
                    data-tooltip-target="tooltip-change-email"
                    data-tooltip-placement="left"
                  >
                    <i class="bi bi-pencil-square sm:me-2"></i
                    ><span class="hidden sm:inline">Edit</span>
                  </button>
                  <div
                    id="tooltip-change-email"
                    role="tooltip"
                    class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm dark:bg-gray-700 sm:hidden"
                  >
                    Change the email
                    <div class="tooltip-arrow" data-popper-arrow></div>
                  </div>
                </div>
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
                <div class="flex justify-end">
                  <button
                    type="button"
                    class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                    data-modal-target="account-change-password-modal"
                    data-modal-toggle="account-change-password-modal"
                    data-tooltip-target="tooltip-change-password"
                    data-tooltip-placement="left"
                  >
                    <i class="bi bi-pencil-square sm:me-2"></i
                    ><span class="hidden sm:inline">Edit</span>
                  </button>
                  <div
                    id="tooltip-change-password"
                    role="tooltip"
                    class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm dark:bg-gray-700 sm:hidden"
                  >
                    Change the password
                    <div class="tooltip-arrow" data-popper-arrow></div>
                  </div>
                </div>
              </td>
            </tr>
            <tr class="bg-white dark:border-gray-700 dark:bg-gray-800">
              <th
                scope="row"
                colspan="2"
                class="w-4/6 px-2 py-2 font-medium text-gray-900 dark:text-white sm:px-3 md:w-5/6 md:whitespace-nowrap md:px-6 md:py-4"
              >
                Delete your account
              </th>
              <td class="px-2 py-2 sm:w-2/6 sm:px-3 md:w-1/6 md:px-6 md:py-4">
                <div class="flex justify-end">
                  <button
                    type="button"
                    class="whitespace-nowrap rounded-lg border border-red-700 px-3 py-2 text-center text-xs font-medium text-red-700 hover:bg-red-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:bg-red-800 dark:text-red-200 dark:hover:bg-red-500 dark:hover:text-white dark:focus:ring-red-800"
                    data-modal-target="account-deletion-modal"
                    data-modal-toggle="account-deletion-modal"
                    data-tooltip-target="tooltip-deletion"
                    data-tooltip-placement="left"
                  >
                    <i class="bi bi-trash3-fill sm:me-2"></i>
                    <span class="hidden sm:inline">Delete</span>
                  </button>
                  <div
                    id="tooltip-deletion"
                    role="tooltip"
                    class="tooltip invisible absolute z-10 inline-block rounded-lg bg-red-900 px-3 py-2 text-sm font-medium text-red-100 opacity-0 shadow-sm dark:bg-red-700 sm:hidden"
                  >
                    ⚠️ Delete your account
                    <div class="tooltip-arrow" data-popper-arrow></div>
                  </div>
                </div>
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
                class="w-2/6 px-2 py-2 font-mono text-xs sm:px-3 md:w-4/6 md:px-6 md:py-4 md:text-sm"
              >
                <span class="mr-3 align-middle text-base">{{
                  languagePrefered.flag
                }}</span>
                <span class="align-middle font-mono">{{
                  languagePrefered.name
                }}</span>
              </td>
              <td
                class="justify-end px-2 py-2 sm:w-2/6 sm:px-3 md:w-1/6 md:px-6 md:py-4"
              >
                <div class="flex justify-end">
                  <button
                    type="button"
                    class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                    data-modal-target="account-change-language-modal"
                    data-modal-toggle="account-change-language-modal"
                    data-tooltip-target="tooltip-change-language"
                    data-tooltip-placement="left"
                  >
                    <i class="bi bi-pencil-square sm:me-2"></i
                    ><span class="hidden sm:inline">Edit</span>
                  </button>
                  <div
                    id="tooltip-change-language"
                    role="tooltip"
                    class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm dark:bg-gray-700 sm:hidden"
                  >
                    Change the language
                    <div class="tooltip-arrow" data-popper-arrow></div>
                  </div>
                </div>
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
    <TheAccountDeletionModal></TheAccountDeletionModal>
  </section>
</template>

<script setup>
import { ref, reactive, onBeforeMount, onMounted } from "vue";

import { initFlowbite } from "flowbite";
import TheAccountChangeEmailModal from "@components/parts/TheAccountChangeEmailModal.vue";
import TheAccountChangePasswordModal from "@components/parts/TheAccountChangePasswordModal.vue";
import TheAccountChangeLanguageModal from "@components/parts/TheAccountChangeLanguageModal.vue";
import TheAccountDeletionModal from "@components/parts/TheAccountDeletionModal.vue";

import { accountGetDetails } from "@composables/accountGetDetails.js";
import { accountLogout } from "@composables/accountLogout.js";

import { useUserStore } from "@stores/UserStore.js";
const userStore = useUserStore();

import { useRouter } from "vue-router";
const router = useRouter();

import languageList from "@assets/data/languages.json";

const userAccount = reactive({
  id: null,
  email: null,
  emailVerified: null,
  type: null,
});

const languagePrefered = ref("");

const logout = function () {
  accountLogout(userStore, router);
};

const defineLanguagePrefered = function (languageCode) {
  languagePrefered.value = languageList.find((el) => el.code === languageCode);
};

const sendVerificationEmail = function () {
  userStore.triggerFlash(
    "info",
    "Work in Progress",
    "The email address verification feature is currently under development. You can continue to use the app in its entirety even if your email is not verified.",
  );
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
