<template>
  <div
    class="flash-wrapper md:px-auto absolute right-0 top-20 flex h-auto w-96 flex-col-reverse items-center justify-between px-4 md:right-6 md:items-end"
  >
    <TransitionScale group tag="aside" mode="out-in" appear>
      <FlashMessage
        v-for="flash in flashMessages"
        v-bind:key="flash.id"
        v-on:close-flash="closeFlash"
        v-bind:type="flash.type"
        v-bind:id="flash.id"
      >
        <template v-slot:default>{{ flash.title }}</template>
        <template v-slot:message>{{ flash.message }}</template>
      </FlashMessage>
    </TransitionScale>
  </div>
</template>

<script setup>
import FlashMessage from "@components/ui/FlashMessage.vue";
import { TransitionScale } from "@morev/vue-transitions";
import { computed } from "vue";
import { useUserStore } from "@stores/UserStore.js";

// Get the flash messages from the user store
const userStore = useUserStore();
const flashMessages = computed(() => userStore.flashMessages);

// Method to handle the close flash event
const closeFlash = function (eventPayload) {
  const index = userStore.flashMessages.findIndex(
    (flash) => flash.id === eventPayload, // Find by unique id
  );
  if (index !== -1) {
    userStore.flashMessages.splice(index, 1); // Remove the flash message
  }
};
</script>
