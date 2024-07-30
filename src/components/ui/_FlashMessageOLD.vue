<template>
  <div>
    <header v-bind:class="props.type">
      <span><slot name="default">Message</slot></span>
      <button v-on:click="closeFlash"><span>x</span></button>
    </header>
    <main>
      <slot name="message"></slot>
    </main>
    <div class="progress">
      <progress
        id="progressBar"
        max="100"
        v-bind:value="progressValue"
      ></progress>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps(["id", "type"]);
const emit = defineEmits(["close-flash"]);
const closeFlash = function () {
  emit("close-flash", props.id);
};

// Local state for progress
const progressValue = ref(100); // Start at  100

// Update progress every second
const updateProgress = () => {
  setInterval(() => {
    if (progressValue.value > 0) {
      progressValue.value -= 0.4; // Decrease by  1 every time
    } else {
      closeFlash();
    }
  }, 20); //  1000ms divided by  7 seconds equals ~142.86ms per decrement
};

// Call autoClose and updateProgress when the component mounts
onMounted(() => {
  updateProgress();
});
</script>

<style scoped>
div {
  height: auto;
  padding: 0.25em 0.5em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: var(--primary-lighter);
  border: 3px solid var(--primary-dark);
  width: 100%;
}

div:has(header) {
  background-color: var(--grey-100);
}

div:has(header) header::before {
  content: url(/src/assets/icons/sparkle.svg);
  height: 32px;
  width: 32px;
}

header {
  height: 20%;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 1em;
  gap: 0.5em;
}

header > span {
  font-size: 1.15em;
  font-weight: 600;
  align-self: center;
  background-color: var(--grey-700);
  color: var(--grey-100);
  padding: 0 0.25em;
}

div:has(header.success) {
  background-color: var(--green-100);
}

header.success > span {
  background-color: var(--green-700);
  color: var(--green-100);
}

div:has(header.success) header.success::before {
  content: url(/assets/icons/checkmark.svg);
  height: 32px;
  width: 32px;
}

div:has(header.warning) {
  background-color: var(--orange-100);
}

header.warning > span {
  background-color: var(--orange-700);
  color: var(--orange-100);
}

div:has(header.warning) header.warning::before {
  content: url(/assets/icons/warning.svg);
  height: 32px;
  width: 32px;
}

div:has(header.danger) {
  background-color: var(--red-100);
}

header.danger > span {
  background-color: var(--red-700);
  color: var(--red-100);
}

div:has(header.danger) header.danger::before {
  content: url(/assets/icons/crossmark.svg);
  height: 32px;
  width: 32px;
}

div:has(header.info) {
  background-color: var(--cyan-100);
}

header.info > span {
  background-color: var(--cyan-700);
  color: var(--cyan-100);
}

div:has(header.info) header.info::before {
  content: url(/assets/icons/information.svg);
  height: 32px;
  width: 32px;
}

header button {
  border: 2px solid var(--primary-dark);
  color: var(--primary-darker);
  padding: 0;
  height: 1.7rem;
  width: 1.7rem;
  margin-left: auto;
  display: flex;
  align-self: start;
  justify-self: end;
}

header > button span {
  font-size: 1rem;
  align-self: center;
  justify-self: center;
}

main {
  height: auto;
  font-size: 1em;
  flex-grow: 1;
  width: 100%;
  margin: 0.5em;
  font-size: 0.85em;
}

.progress {
  position: relative;
  width: 100%;
  max-width: 480px;
  background: none;
  border: 0;
  height: auto;
  margin-bottom: -1em;
  /* margin-left: -1em; */
  padding-right: 0em;
  padding-left: 0em;
  pointer-events: none;
}

.progress progress {
  position: relative;
  display: block;
  height: 0.7em;
  width: 100%;
  border: 0;
  background-color: transparent;
}

.progress::-moz-progress-bar {
  background-image: linear-gradient(
    60deg,
    var(--neutral-900),
    var(--neutral-900)
  );
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}

.progress::-webkit-progress-bar {
  background-color: transparent;
}

.progress ::-webkit-progress-value {
  background-image: linear-gradient(132deg, #f4d03f 0%, #16a085 100%);
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}
</style>
