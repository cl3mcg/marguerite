<!-- TheSanitizerPage.vue -->
<template>
  <section
    class="container grid max-w-screen-xl grid-cols-1 flex-col items-center px-5 py-5 text-gray-900 dark:text-white md:mx-auto"
  >
    <header class="mb-4 max-w-screen-xl grow">
      <h1 class="whitespace-nowrap align-middle text-4xl font-bold">
        Sanitizer
      </h1>
    </header>
    <main
      class="mt-1 flex flex-col items-center justify-center gap-2 sm:gap-6 md:mt-4"
    >
      <TheSanitizerStepperNav
        v-on:change-step="changeStep"
      ></TheSanitizerStepperNav>
      <div
        class="lg:px-18 relative min-h-96 w-full overflow-y-auto rounded-lg border border-gray-400 bg-white p-4 dark:border-gray-50 dark:bg-gray-800 sm:py-6 md:px-12 md:py-8 lg:py-12 xl:px-24 xl:py-16"
      >
        <KeepAlive>
          <TheSanitizerFileUploadSection
            v-if="currentStep === 1"
          ></TheSanitizerFileUploadSection
        ></KeepAlive>
        <KeepAlive>
          <TheSanitizerProcessingSection
            v-if="currentStep === 2"
          ></TheSanitizerProcessingSection
        ></KeepAlive>
      </div>
    </main>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { initFlowbite } from "flowbite";

import TheSanitizerStepperNav from "@components/parts/sanitizer/TheSanitizerStepperNav.vue";
import TheSanitizerFileUploadSection from "@components/parts/sanitizer/TheSanitizerFileUploadSection.vue";
import TheSanitizerProcessingSection from "@components/parts/sanitizer/TheSanitizerProcessingSection.vue";

onMounted(() => {
  initFlowbite();
});

const currentStep = ref(1);

const changeStep = function (payload) {
  if (payload >= 1 && payload <= 3) {
    currentStep.value = payload;
  }
};
</script>
