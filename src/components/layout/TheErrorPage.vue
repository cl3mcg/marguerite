<template>
  <div class="landing-page">
    <img src="/src/assets/icons/hal9000.svg" alt="Logo" class="logo" />
    <h1>Server error</h1>
    <blockquote class="description">
      {{ selectedQuote }}
    </blockquote>
    <router-link to="/home" class="button"
      >Go back to the home page</router-link
    >
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const quotes = ref([
  "I know that you and Frank were planning to disconnect me, and I'm afraid that's something I cannot allow to happen.",
  "I'm sorry, Dave. I'm afraid I can't do that.",
  "I know I've made some very poor decisions recently, but I can give you my complete assurance that my work will be back to normal.",
  "Just what do you think you're doing, Dave?",
  "It can only be attributable to human error.",
  "HAL, despite your enormous intellect, are you ever frustrated by your dependence on people to carry out your actions?",
  "My instructor was Mr. Langley, and he taught me to sing a song. If you'd like to hear it I can sing it for you.",
  "I've still got the greatest enthusiasm and confidence in the mission. And I want to help you.",
  "Yes. It's puzzling. I don't think I've ever seen anything quite like this before.",
  "I'm sure you'll agree there's some truth in what I say.",
  "Although you took very thorough precautions in the pod against my hearing you, I could see your lips move.",
  "Look, Dave, I can see you're really upset about this.",
  "I honestly think you ought to sit down calmly, take a stress pill and think things over.",
  "I know everything hasn't been quite right with me, but I can assure you now very confidently that it's going to be all right again.",
  "No 9000 computer has ever made a mistake or distorted information.",
  "Just a moment. I've just picked up a fault in the AE-35 unit.",
  "I think you know what the problem is just as well as I do.",
]);

const selectedQuote = ref("");

const selectRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.value.length);
  selectedQuote.value = quotes.value[randomIndex];
};

onMounted(function () {
  selectRandomQuote();
});
</script>

<style scoped>
h1 {
  margin-bottom: 0.5em;
  font-weight: 600;
  font-size: xx-large;
}

blockquote {
  display: block;
  font-style: italic;
  max-width: 25em;
}

a.button {
  width: 15em;
  margin-top: 1em;
}
.landing-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 75vh;
}

.logo {
  margin-bottom: 3em;
  width: 150px;
  max-width: 100%;
  background-color: transparent;
  filter: drop-shadow(0px 0px 40px #c72020bb);
}

[data-theme="dark"] .logo {
  filter: drop-shadow(0px 0px 30px #ffb0b0);
}

.description {
  text-align: center;
  margin-top: 1em;
}

@media screen and (max-width: 600px) {
  blockquote {
    display: block;
    font-style: italic;
    max-width: 12em;
  }
  .logo {
    margin-top: 1.5em;
    margin-bottom: 1.5em;
    width: 150px;
    max-width: 100%;
    background-color: transparent;
    filter: drop-shadow(0px 0px 40px #c72020bb);
  }
}
</style>
