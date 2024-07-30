<template>
  <div
    id="account-change-language-modal"
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
            Change the application language
          </h3>
          <button
            type="button"
            class="close-modal-button end-2.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="account-change-language-modal"
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
            You can select the application language below.
          </div>
          <form v-on:submit.prevent="accountChangeLanguageSubmit">
            <ul class="mb-5 grid w-full grid-cols-1 gap-3">
              <li v-for="language in languageList" key="language.code">
                <input
                  type="radio"
                  v-bind:id="language.code"
                  v-bind:name="language.name"
                  v-bind:value="language.code"
                  class="peer hidden"
                  v-model="languageSelection"
                />
                <label
                  v-bind:for="language.code"
                  class="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 peer-checked:border-purple-600 peer-checked:bg-purple-200 peer-checked:text-purple-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-500 dark:peer-checked:bg-purple-800 dark:peer-checked:text-purple-200"
                >
                  <div class="flex w-full items-center">
                    <span class="mr-4 text-2xl">{{ language.flag }}</span>
                    <span class="text-sm">{{ language.name }}</span>
                  </div>
                </label>
              </li>
            </ul>
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
              {{ isLoading ? "Loading..." : "Update the application language" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "../../stores/UserStore.js";
const userStore = useUserStore();

import { vOnClickOutside } from "@vueuse/components";

import { modalClose } from "@composables/modalClose.js";
import { accountChangeLanguage } from "@composables/accountChangeLanguage.js";

import languageList from "@assets/data/languages.json";

import { ref, onMounted } from "vue";

const emit = defineEmits(["switchLanguage"]);

const buttonClassLoading = ref(
  "text-white bg-purple-400 dark:bg-purple-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center",
);

const isLoading = ref(false);
const languageSelection = ref("");

const resetAll = function () {
  if (userStore.language) {
    languageSelection.value = userStore.language;
  } else {
    languageSelection.value = "en-GB";
  }
};

const accountChangeLanguageSubmit = async function () {
  isLoading.value = true;
  const result = await accountChangeLanguage(
    userStore,
    languageSelection.value,
  );
  console.log(result);
  if (result) {
    emit("switchLanguage", languageSelection.value);
    modalClose();
  }
  isLoading.value = false;
};

onMounted(function () {
  if (userStore.language) {
    languageSelection.value = userStore.language;
  } else {
    languageSelection.value = "en-GB";
  }
});
</script>
