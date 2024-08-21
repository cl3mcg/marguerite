<template>
  <section
    class="container max-w-screen-md px-5 py-5 text-gray-900 dark:text-white md:mx-auto"
  >
    <h1 class="mb-4 text-4xl font-bold">Hi, I'm Clément.</h1>
    <div class="mb-4">
      <h2 class="mb-3 text-3xl font-bold">Contact</h2>
      <div class="flex">
        <img
          id="waving-hand"
          class="w-2/12 md:w-3/12"
          src="/src/assets/icons/wavinghand.svg"
          alt="The emoji of a welcoming waving hand"
        />
        <p class="w-10/12 md:w-9/12">
          You can follow me on Mastodon.<br />
          Alternatively, I'm also on Twitter. If you are old, you can follow me
          on LinkedIn also, but I rarely post anything there.
        </p>
      </div>
      <div class="mt-5 flex justify-center align-middle">
        <a
          class="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          href="https://fosstodon.org/@cl3mcg"
          target="_blank"
          rel="noopener noreferrer"
          tabindex="0"
        >
          <i class="bi bi-mastodon text-lg"></i>
        </a>
        <a
          class="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          href="https://twitter.com/cl3mcg"
          target="_blank"
          rel="noopener noreferrer"
          tabindex="0"
        >
          <i class="bi bi-twitter text-lg"></i>
        </a>
        <a
          class="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          href="https://www.linkedin.com/in/cl3mcg/?locale=en_US"
          target="_blank"
          rel="noopener noreferrer"
          tabindex="0"
        >
          <i class="bi bi-linkedin text-lg"></i>
        </a>
        <a
          class="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          href="https://github.com/cl3mcg"
          target="_blank"
          rel="noopener noreferrer"
          tabindex="0"
        >
          <i class="bi bi-github text-lg"></i>
        </a>
      </div>
    </div>
    <div class="mb-4">
      <h2 class="mb-3 text-3xl font-bold">Support</h2>
      <p>
        There are different ways to support this tool and maintain it. Feel free
        to drop me a Paypal.
      </p>
      <div class="mt-5 flex justify-center align-middle">
        <a
          class="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          href="https://paypal.me/clemcg?country.x=FR&locale.x=en_EN"
          target="_blank"
          rel="noopener noreferrer"
          tabindex="0"
        >
          <i class="bi bi-paypal text-lg"></i>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes wave-animation {
  0% {
    transform: rotate(0deg);
  }
  10% {
    transform: rotate(14deg);
  }
  20% {
    transform: rotate(-8deg);
  }
  30% {
    transform: rotate(14deg);
  }
  40% {
    transform: rotate(-4deg);
  }
  50% {
    transform: rotate(10deg);
  }
  60% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

img#waving-hand {
  margin: auto;
  width: 2em;
  height: 2em;
  min-width: 5em;
  min-height: 5em;
  animation-name: wave-animation;
  animation-duration: 2.5s;
  animation-iteration-count: infinite;
  transform-origin: 70% 70%;
  display: inline-block;
}
</style>
