<template>
  <div
    class="flex size-full h-96 flex-col items-center justify-center rounded-md border"
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
  </div>
</template>
