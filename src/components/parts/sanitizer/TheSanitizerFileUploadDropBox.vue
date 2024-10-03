<!-- TheSanitizerFileUploadDropBox.vue -->
<template>
  <div
    class="mx-auto flex w-full items-center justify-center sm:max-w-md md:max-w-lg lg:max-w-2xl"
  >
    <label
      for="dropzone-file"
      v-on:mouseover="boxHovered = true"
      v-on:mouseleave="boxHovered = false"
      v-bind:class="[
        validFile
          ? 'border-green-300 bg-green-50 hover:bg-green-100 dark:border-green-600 dark:bg-green-700 dark:hover:border-green-500 dark:hover:bg-green-600'
          : 'border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600',
        'relative flex h-36 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-4',
      ]"
    >
      <div
        class="pointer-events-none absolute right-3 top-3 flex flex-col gap-2"
      >
        <button
          v-if="validFile"
          type="button"
          class="pointer-events-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-center text-xs font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        >
          <i class="bi bi-arrow-repeat sm:me-2"></i
          ><span class="hidden sm:inline">Change file</span>
        </button>
        <button
          v-if="validFile"
          v-on:click.prevent="clearFile"
          type="button"
          class="pointer-events-auto rounded-lg bg-red-700 px-3 py-2 text-center text-xs font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          <i class="bi bi-trash3-fill sm:me-2"></i
          ><span class="hidden sm:inline">Remove file</span>
        </button>
      </div>
      <div
        v-if="!validFile"
        class="flex flex-col items-center justify-center pb-6 pt-5"
      >
        <i
          v-bind:class="[
            boxHovered && !file ? 'animate-bounce' : '',
            'bi bi-cloud-upload mb-4 h-8 w-8 text-3xl text-gray-500 dark:text-gray-400',
          ]"
        ></i>
        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span class="font-semibold"
            >Click to select a file from your computer</span
          >
          or drag and drop
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400">
          Excel spreadsheets only (.xlsx files)
        </p>
      </div>
      <div v-else class="flex flex-col items-center justify-center pb-6 pt-5">
        <i
          class="bi bi-file-earmark-spreadsheet mb-4 h-8 w-8 text-3xl text-green-500 dark:text-green-300"
        ></i>
        <p class="mb-2 text-sm text-green-500 dark:text-green-300">
          <span class="font-semibold">Spreadsheet selected</span>
        </p>
        <p class="text-xs text-green-500 dark:text-green-300">
          {{ fileName.length > 30 ? `${fileName.slice(0, 27)}...` : fileName }}
          ({{ formattedFileSize }})
        </p>
      </div>
      <input
        v-on:change="handleFileUpload"
        id="dropzone-file"
        type="file"
        accept=".xlsx"
        class="hidden"
      />
    </label>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useUserStore } from "@stores/UserStore.js";

const userStore = useUserStore();
const maxFileSize = 10 * 1024 * 1024; // 10 MB in bytes

// Replacing the reactive object with ref for each property
const file = ref(null);
const validFile = ref(false);
const boxHovered = ref(false);

// Computed properties
const fileName = computed(() => file.value?.name || "");
const fileExtension = computed(() =>
  fileName.value
    ? fileName.value.substr(fileName.value.lastIndexOf(".") + 1)
    : "",
);
const fileSize = computed(() => file.value?.size || 0);
const formattedFileSize = computed(() => {
  const sizeInKB = fileSize.value / 1024;
  const sizeInMB = sizeInKB / 1024;

  // Return size in MB if greater than 1MB, otherwise KB
  return sizeInMB >= 1
    ? `${sizeInMB.toFixed(2)} MB`
    : `${sizeInKB.toFixed(2)} KB`;
});

const emit = defineEmits([
  "fileDropped",
  "fileError",
  "clearErrMsg",
  "filePurged",
]);

// Function to handle file upload
const handleFileUpload = (event) => {
  file.value = event.target.files[0];
};

// Function to clear file data
const clearFile = () => {
  validFile.value = false;
  file.value = null;
  emit("clearErrMsg");
  emit("filePurged");
};

// Watcher to validate the file when it changes
watch(file, () => {
  if (
    file.value &&
    fileExtension.value === "xlsx" &&
    fileSize.value <= maxFileSize
  ) {
    try {
      validFile.value = true;
      emit("fileDropped", {
        file: file.value,
        fileName: fileName.value,
      });
      emit("clearErrMsg");
    } catch (error) {
      clearFile();
      userStore.triggerFlash(
        "danger",
        "An error occurred",
        "An error occurred during the file upload.",
      );
      console.error("Error uploading file:", error);
    }
  } else if (file.value && fileSize.value > maxFileSize) {
    clearFile();
    emit("fileError", {
      errorMessage: "File size exceeds the maximum limit of 10 MB.",
    });
  } else if (file.value && fileExtension.value !== "xlsx") {
    clearFile();
    emit("fileError", {
      errorMessage: "Invalid file format. Please upload an Excel file (.xlsx).",
    });
  }
});
</script>
