<template>
  <div
    class="flash-wrapper md:px-auto absolute right-0 top-20 flex h-auto w-96 flex-col-reverse items-center justify-between px-4 md:right-6 md:items-end"
  >
    <FlashMessage
      v-for="flash in flashMessages"
      v-bind:key="flashMessages.indexOf(flash)"
      v-on:close-flash="closeFlash"
      v-bind:type="flash.type"
      v-bind:id="flashMessages.indexOf(flash)"
    >
      <template v-slot:default>{{ flash.title }}</template>
      <template v-slot:message>{{ flash.message }}</template>
    </FlashMessage>
  </div>
</template>

<script setup>
import FlashMessage from "../ui/FlashMessage.vue";

import { computed } from "vue";

import { useUserStore } from "../../stores/UserStore.js";
const userStore = useUserStore();
const flashMessages = computed(() => userStore.flashMessages);

const closeFlash = function (index) {
  userStore.flashMessages.splice(index, 1);
};
</script>
