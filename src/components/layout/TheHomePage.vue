<template>
  <div class="flex h-full flex-col items-center justify-center">
    <section
      class="mb-20 mt-20 flex flex-col items-center justify-center align-middle md:mb-40 md:mt-40"
    >
      <div class="h-48 w-48"><iconMarguerite></iconMarguerite></div>
      <h1
        class="mt-12 text-center text-4xl font-bold text-slate-900 dark:text-slate-100 md:text-5xl"
      >
        Marguerite project
      </h1>
      <div
        class="mt-12 text-center text-xl font-semibold text-slate-700 dark:text-slate-300 md:text-2xl"
      >
        <span class="mx-4 block sm:mx-3 md:mx-0 md:inline-block">
          A launchpad for freight forwarding <br class="inline sm:hidden" />
          and logistics
          <br />
          tools and projects
        </span>
      </div>
    </section>
  </div>
</template>

<script setup>
import iconMarguerite from "@components/icons/iconMarguerite.vue";
</script>
