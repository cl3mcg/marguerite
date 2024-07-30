<template>
  <nav
    class="border-gray-400 bg-gray-200 dark:border-gray-700 dark:bg-gray-800"
  >
    <div
      class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-4 py-2 md:flex-nowrap md:justify-start md:gap-10"
    >
      <router-link
        to="/"
        class="flex w-8 items-center space-x-3 rtl:space-x-reverse"
      >
        <div class="h-8"><iconMarguerite></iconMarguerite></div>
      </router-link>
      <div class="flex gap-2">
        <button
          class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
        >
          <TheDarkModeButton></TheDarkModeButton>
        </button>
        <button
          data-collapse-toggle="navbar-solid-bg"
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          aria-controls="navbar-solid-bg"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="h-5 w-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      <div class="hidden w-full md:block" id="navbar-solid-bg">
        <div
          class="mt-4 flex flex-col rounded-lg bg-gray-50 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:justify-between md:space-x-8 md:border-0 md:bg-transparent md:dark:bg-transparent rtl:space-x-reverse"
        >
          <div class="flex flex-col md:flex-row md:gap-5 md:align-baseline">
            <router-link to="/"
              ><button
                class="block items-center justify-center rounded-lg px-3 py-2 text-center text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                Home
              </button>
            </router-link>
            <router-link to="/tools"
              ><button
                class="block items-center justify-center rounded-lg px-3 py-2 text-center text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                Tools
              </button></router-link
            >

            <router-link to="/about"
              ><button
                class="block items-center justify-center rounded-lg px-3 py-2 text-center text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                About
              </button></router-link
            >
            <router-link to="/contact"
              ><button
                class="block items-center justify-center rounded-lg px-3 py-2 text-center text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                Contact
              </button></router-link
            >
          </div>
          <div>
            <div class="flex flex-col md:flex-row md:gap-2">
              <button
                class="hidden items-center justify-center rounded-lg text-center text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:block"
              >
                <TheDarkModeButton></TheDarkModeButton>
              </button>
              <button
                data-modal-target="account-login-modal"
                data-modal-toggle="account-login-modal"
                class="block items-center justify-center rounded-lg px-3 py-2 text-start text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                v-bind:class="userIsLoggedIn ? 'hidden' : ''"
              >
                Login
              </button>
              <router-link
                to="/account"
                v-bind:class="!userIsLoggedIn ? 'hidden' : ''"
              >
                <button
                  class="block items-center justify-center rounded-lg px-3 py-2 text-center text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                >
                  Account
                </button></router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <TheAccountLoginModal></TheAccountLoginModal>
    <TheAccountCreateModal></TheAccountCreateModal>
    <TheAccountRecoveryModal></TheAccountRecoveryModal>
  </nav>
</template>

<script setup>
import { useUserStore } from "@stores/UserStore.js";
const userStore = useUserStore();

import { useRouter } from "vue-router";
const router = useRouter();

import { initFlowbite } from "flowbite";

import iconMarguerite from "@components/icons/iconMarguerite.vue";
import TheDarkModeButton from "@components/ui/TheDarkModeButton.vue";
// import TheLanguageButton from "../ui/TheLanguageButton.vue";
import TheAccountLoginModal from "@components/parts/TheAccountLoginModal.vue";
import TheAccountCreateModal from "@components/parts/TheAccountCreateModal.vue";
import TheAccountRecoveryModal from "@components/parts/TheAccountRecoveryModal.vue";
import { isLoggedIn } from "@composables/isLoggedIn.js";
import { accountLogout } from "@composables/accountLogout.js";

import { ref, onMounted, watch } from "vue";

const userIsLoggedIn = ref(false);

const logout = function () {
  accountLogout(userStore, router);
};

onMounted(async () => {
  if (!userStore.accountToken) {
    return (userIsLoggedIn.value = false);
  }
  return (userIsLoggedIn.value = await isLoggedIn());
});

onMounted(() => {
  initFlowbite();
});

watch(
  () => userStore.accountToken,
  async (newToken, oldToken) => {
    if (!newToken) {
      return (userIsLoggedIn.value = false);
    }
    if (newToken !== oldToken) {
      console.log(userIsLoggedIn.value);
      return (userIsLoggedIn.value = await isLoggedIn());
    }
    return;
  },
);
</script>
