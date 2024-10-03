<template>
  <section
    class="container max-w-screen-md px-5 py-5 text-gray-900 dark:text-white md:mx-auto"
  >
    <h1 class="mb-4 text-4xl font-bold">About this app</h1>
    <div class="mb-4">
      <h2 class="mb-3 text-3xl font-bold">Why doing this?</h2>
      <p>
        I needed a quick tool to help me visualize and get a grasp on ocean
        freight rates fluctuations on an handful of trade lanes. Additionally I
        was tired of having to rely on pricy third-party tools, so I made my
        own:
        <router-link to="/tools/sonar" class="underline hover:text-purple-700"
          ><i>Sonar</i></router-link
        >.
      </p>
      <p>
        Once done with
        <router-link to="/tools/sonar" class="underline hover:text-purple-700"
          ><i>Sonar</i></router-link
        >, I decided to build upon this tool an experiment used to retrieve data
        from the World Bank to create a dashboard with several indicators and
        made
        <router-link to="/tools/sauron" class="underline hover:text-purple-700"
          ><i>Sauron</i></router-link
        >.<br />
        At a later stage, I am planning to develop a tool used to build freight
        forwarding rate cards used in the management of tenders. Not that I am
        specifically fond of this, but I beleive that it can be interesting to
        experiment with Excel manipulation programatically.
      </p>
    </div>
    <div class="mb-4">
      <h2 class="mb-3 text-3xl font-bold">Is this available for free?</h2>
      <p>
        This tool is released under the CC BY-NC-SA 4.0 license. If you plan to
        use it for personal use, you can do so for free.
      </p>
      <p>
        If you intend to use this tool in a professional environment, you can
        still use it for free. However, it may not be used for commercial
        purposes as it is not a battle-tested tool. You are welcome to
        contribute to the code and support me.
      </p>
      <p class="mt-5 flex justify-center align-middle">
        <a
          class="m-2 mb-2 me-2 flex w-40 justify-center rounded-lg border border-gray-300 bg-white p-2 px-5 py-2.5 align-middle text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          href="http://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1"
        >
          <img
            class="ms-1 h-6 align-middle"
            src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"
          />
          <img
            class="ms-1 h-6 align-middle"
            src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"
          />
          <img
            class="ms-1 h-6 align-middle"
            src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1"
          />
          <img
            class="ms-1 h-6 align-middle"
            src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1"
          />
        </a>
      </p>
    </div>
    <div class="mb-4">
      <h2 class="mb-3 text-3xl font-bold">Can I check the code?</h2>
      <p>
        Yes of course you can, long-life to open source. Feel free to check
        everything you want (as long as you feel comfortable reading spaghettis
        code).
      </p>
      <div class="mt-5 flex justify-center align-middle">
        <a
          href="https://github.com/cl3mcg/marguerite"
          class="mb-2 me-2 flex w-40 justify-center rounded-lg border border-gray-300 bg-white px-5 py-1.5 align-middle text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        >
          <i class="bi bi-github text-xl"></i>
        </a>
      </div>
    </div>
    <div class="mb-4">
      <h2 class="mb-3 text-3xl font-bold">
        Privacy and personal data collection
      </h2>
      <p>
        This app doesn't use nasty cookies nor collect any non-essential
        personal data. The following information provided by the user would be
        collected and stored:
      </p>
      <ul class="mb-3 max-w-md list-inside list-disc space-y-1">
        <li class="ms-3">Email address</li>
      </ul>
      <p>
        If you wish to have your previously mentioned personal data deleted, you
        can do so by deleting your account through the account settings page.
        Upon deletion of your account, all information related to it, as well as
        any other associated information, will be removed. You also have the
        option to modify the email address provided on your account page. The
        app does not retain personal data nor does it sell it to third-party
        companies. The application and databases are hosted in Germany (EU) on a
        server provided by
        <a
          href="https://contabo.com/en/"
          class="underline hover:text-purple-700"
          >Contabo</a
        >.
      </p>
    </div>
    <div class="mb-3">
      <h2 class="mb-3 text-3xl font-bold">Credits</h2>
      <p>
        The home page animations are coming from different CodePen projects,
        I've just put them together and made them work with Vue.js as well as
        removing some of the unecessary CSS, adding dark mode support etc. The
        original CodePen snippets are
        <a
          href="https://codepen.io/Mark_Bowley/pen/LYZEBq"
          class="underline hover:text-purple-700"
          ><i>Animated clouds</i></a
        >
        and
        <a
          href="https://codepen.io/beyzaozer/pen/XWONzKB"
          class="underline hover:text-purple-700"
          ><i>Wavy grass</i></a
        >.
      </p>
    </div>
  </section>
</template>
