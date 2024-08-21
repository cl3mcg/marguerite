<template>
  <section class="">
    <div class="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
      <div class="mx-auto max-w-screen-sm text-center">
        <img src="/src/assets/icons/questionmark.svg" alt="Logo" class="logo" />
        <h1
          class="mb-4 text-7xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 lg:text-9xl"
        >
          404
        </h1>
        <p
          class="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-4xl"
        >
          Something's missing.
        </p>
        <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
          The page requested cannot be found.
        </p>
        <router-link
          to="/home"
          class="my-4 inline-flex rounded-lg bg-purple-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-900"
          >Go back to the home page</router-link
        >
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.logo {
  margin-bottom: 3em;
  margin-left: auto;
  margin-right: auto;
  width: 150px;
  max-width: 100%;
  background-color: transparent;
  filter: drop-shadow(0px 0px 40px #c72020);
}
</style>
