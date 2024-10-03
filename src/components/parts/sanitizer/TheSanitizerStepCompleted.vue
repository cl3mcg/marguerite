<template>
  <div class="relative size-full p-4">
    <div class="rounded-lg bg-green-100 shadow dark:bg-green-800">
      <div class="p-4 text-center text-4xl font-bold text-green-500 md:p-5">
        <i class="bi bi-hand-thumbs-up"></i>
        <h3
          class="mb-3 mt-3 text-xl font-normal text-green-500 dark:text-green-400"
        >
          This step is completed
        </h3>
        <button
          type="button"
          v-on:click="reopen"
          class="rounded-lg bg-purple-700 px-3 py-2 text-center text-xs font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
        >
          Bring modifications
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const emits = defineEmits(["reopen"]);
const reopen = () => emits("reopen");
</script>
