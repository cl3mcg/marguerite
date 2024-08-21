<template>
  <div
    class="relative flex size-full h-96 max-w-screen-md flex-col items-center justify-center overflow-hidden rounded-md border"
  >
    <div
      class="bg-primary-100 dark:bg-primary-900 mb-4 flex h-10 w-10 items-center justify-center rounded-full lg:h-12 lg:w-12"
    >
      <i class="bi bi-patch-question-fill text-4xl dark:text-gray-100"></i>
    </div>
    <h3 class="mb-2 text-xl font-bold dark:text-white">No selection</h3>
    <p class="text-center text-gray-500 dark:text-gray-400">
      <slot></slot>
    </p>
    <div
      class="absolute -bottom-4 -right-4 hidden max-h-20 max-w-20 sm:block md:-bottom-5 md:-right-5 md:max-h-28 md:max-w-28"
    >
      <iconSonar v-if="props.toolName.toLowerCase() === 'sonar'"></iconSonar>
      <iconSauron v-if="props.toolName.toLowerCase() === 'sauron'"></iconSauron>
      <iconSuperviseur
        v-if="props.toolName.toLowerCase() === 'superviseur'"
      ></iconSuperviseur>
    </div>
  </div>
</template>

<script setup>
import iconSonar from "@components/icons/iconSonar.vue";
import iconSauron from "@components/icons/iconSauron.vue";
import iconSuperviseur from "@components/icons/iconSuperviseur.vue";

const props = defineProps({
  toolName: {
    type: String,
    default: "",
  },
});
</script>
