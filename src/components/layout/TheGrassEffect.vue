<!-- src/components/effects/TheGrassEffect.vue -->
<template>
  <div class="grass-css-container">
    <!-- Front Row -->
    <div
      v-for="(blade, index) in blades"
      :key="index"
      :class="`blade-front-${index + 1}`"
      :style="{ left: `${index * 25 - 100}px` }"
    ></div>

    <!-- Back Row -->
    <div
      v-for="(blade, index) in blades"
      :key="index"
      :class="`blade-back-${index + 1}`"
      :style="{ left: `${index * 25 - 85}px` }"
    ></div>
    <div class="sand"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const blades = ref(Array.from({ length: 100 }, (_, index) => index + 1));
</script>

<style scoped>
.grass-css-container {
  position: relative; /* Make sure the parent container is positioned relative to contain absolutely positioned children */
  height: 100px; /* Set a fixed height to prevent overflow */
  width: 100%; /* Ensure it spans the full width of the viewport */
  overflow: hidden; /* Prevent overflow */
  bottom: 0; /* Align it to the bottom */
}

/*Front Row*/

div[class^="blade-front-"] {
  border-radius: 1em;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 55px solid #156a32;
  position: absolute;
  animation: grass-move-front 5s infinite;
  transition-timing-function: ease-in-out;
  z-index: 7;
  bottom: 0px;
}

@keyframes grass-move-front {
  0% {
    border-left: 10px solid transparent;
    border-right: 25px solid transparent;
    border-bottom: 55px solid #156a32;
  }
  25% {
    border-left: 25px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 55px solid #156a32;
  }
  50% {
    border-left: 10px solid transparent;
    border-right: 25px solid transparent;
    border-bottom: 55px solid #156a32;
  }
  75% {
    border-left: 25px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 55px solid #156a32;
  }
  100% {
    border-left: 10px solid transparent;
    border-right: 25px solid transparent;
    border-bottom: 55px solid #156a32;
  }
}

/*Back Row*/

div[class^="blade-back-"] {
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 55px solid #1e4018;
  position: absolute;
  animation: grass-move-back 5s infinite;
  transition-timing-function: ease-in-out;
  z-index: 5;
  bottom: 0px;
}

@keyframes grass-move-back {
  0% {
    border-left: 10px solid transparent;
    border-right: 25px solid transparent;
    border-bottom: 55px solid #1e4018;
  }
  25% {
    border-left: 25px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 55px solid #1e4018;
  }
  50% {
    border-left: 10px solid transparent;
    border-right: 25px solid transparent;
    border-bottom: 55px solid #1e4018;
  }
  75% {
    border-left: 25px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 55px solid #1e4018;
  }
  100% {
    border-left: 10px solid transparent;
    border-right: 25px solid transparent;
    border-bottom: 55px solid #1e4018;
  }
}
</style>
