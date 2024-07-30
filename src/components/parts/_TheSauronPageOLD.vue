<template>
  <section>
    <h1>Sauron</h1>
    <div>
      <h2
        v-on:click="toggle('selectionMenu')"
        v-on:keydown.enter="toggle('selectionMenu')"
        v-bind:class="displayedItems.selectionMenu ? 'expanded' : ''"
        tabindex="0"
      >
        Selection menu
      </h2>
      <form
        id="selectionForm"
        v-if="displayedItems.selectionMenu"
        v-on:submit.prevent="newSelection"
      >
        <h3
          v-on:click="toggle('geographicMenu')"
          v-on:keydown.enter="toggle('geographicMenu')"
          v-bind:class="displayedItems.geographicMenu ? 'expanded' : ''"
          tabindex="0"
        >
          Geographic coverage
          <span
            class="tag"
            v-bind:class="
              countNumTrueValues(selection.selectedCountry) <= 0
                ? 'invalid'
                : 'valid'
            "
            >{{ countNumTrueValues(selection.selectedCountry) }}</span
          >
        </h3>
        <div
          v-if="displayedItems.geographicMenu"
          v-for="countryCode in countries"
          class="countrySelector"
        >
          <input
            type="checkbox"
            v-bind:name="countryCode.toUpperCase()"
            v-bind:value="countryCode.toUpperCase()"
            v-bind:id="countryCode.toUpperCase()"
            v-model="selection.selectedCountry"
          />
          <label v-bind:for="countryCode.toUpperCase()">
            <span class="font-monospace">{{
              `${countryCode.toUpperCase()}`
            }}</span
            ><span class="countryCommonName">
              - {{ `${getCountryDetails(countryCode).name.common}` }}</span
            >
          </label>
        </div>
        <h3
          v-on:click="toggle('indicatorMenu')"
          v-on:keydown.enter="toggle('indicatorMenu')"
          v-bind:class="displayedItems.indicatorMenu ? 'expanded' : ''"
          tabindex="0"
        >
          Indicator selection
          <span
            class="tag"
            v-bind:class="
              countNumTrueValues(selection.selectedIndicator) <= 0
                ? 'invalid'
                : 'valid'
            "
            >{{ countNumTrueValues(selection.selectedIndicator) }}</span
          >
        </h3>
        <div v-if="displayedItems.indicatorMenu" id="indicatorSelectorSubMenu">
          <h4>Economy</h4>
          <div
            v-for="indicator in filteredEconomyIndicators"
            class="indicatorSelector"
          >
            <input
              type="checkbox"
              v-bind:name="indicator.name"
              v-bind:value="indicator.code"
              v-bind:id="indicator.code"
              v-model="selection.selectedIndicator"
            />
            <label v-bind:for="indicator.code">{{ indicator.name }}</label>
            <button
              type="button"
              v-on:click="displayIndicatorInformation(indicator.code)"
            >
              <img
                src="/src/assets/icons/information.svg"
                alt="An information icon"
              />
            </button>
          </div>
          <h4>Logistics</h4>
          <div
            v-for="indicator in filteredLogisticsIndicators"
            class="indicatorSelector"
          >
            <input
              type="checkbox"
              v-bind:name="indicator.name"
              v-bind:value="indicator.code"
              v-bind:id="indicator.code"
              v-model="selection.selectedIndicator"
            />
            <label v-bind:for="indicator.code">{{ indicator.name }}</label>
            <button
              type="button"
              v-on:click="displayIndicatorInformation(indicator.code)"
            >
              <img
                src="/src/assets/icons/information.svg"
                alt="An information icon"
              />
            </button>
          </div>
        </div>
        <button type="submit" v-bind:disabled="!selection.isValid()">
          Apply selection
        </button>
      </form>
      <h2
        v-on:click="toggle('dataRecap')"
        v-on:keydown.enter="toggle('dataRecap')"
        v-bind:class="[
          displayedItems.dataRecap ? 'expanded' : '',
          !selection.isValid() ? 'disabled' : '',
        ]"
        tabindex="0"
      >
        Data recap
      </h2>
      <div v-if="displayedItems.dataRecap">
        <div
          v-for="(value, key) in backendData.data"
          :key="key"
          class="graph-wrapper"
        >
          <h4>
            {{ indicators.filter((el) => el.code === key)[0].name }}
          </h4>
          <i
            >{{ indicators.filter((el) => el.code === key)[0].description }}
            <br />Source:
            {{ indicators.filter((el) => el.code === key)[0].source }}</i
          >
          <TheIndicatorLineChart :indicatorData="value" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed } from "vue";

import { useUserStore } from "../../stores/UserStore.js";
const userStore = useUserStore();

import TheIndicatorLineChart from "../ui/TheIndicatorLineChart.vue";

import countriesJSON from "/assets/json/countries.json";
import indicatorsJSON from "/assets/json/indicators.json";

const countries = ref([
  "CA",
  "FR",
  "DE",
  "IT",
  "JP",
  "GB",
  "US",
  "BR",
  "RU",
  "IN",
  "CN",
  "ZA",
  "AU",
  "AR",
  "KR",
  "TR",
]);

const indicators = indicatorsJSON;

const filteredEconomyIndicators = computed(() => {
  return indicators.filter((indicator) => indicator.category === "economy");
});

const filteredLogisticsIndicators = computed(() => {
  return indicators.filter((indicator) => indicator.category === "logistics");
});

const getCountryDetails = function (countryCode) {
  if (countryCode.length !== 2) {
    return false;
  }
  for (const country of countriesJSON) {
    if (countryCode.toUpperCase() === country.cca2) {
      return country;
    }
  }
};

const backendData = reactive({});

const displayedItems = reactive({
  selectionMenu: true,
  dataRecap: false,
  geographicMenu: false,
  indicatorMenu: false,
});

const selection = reactive({
  selectedCountry: [],
  selectedIndicator: [],
  isValid: function () {
    return this.selectedCountry.length > 0 && this.selectedIndicator.length > 0;
  },
});

const countNumTrueValues = function (array) {
  return array.length;
};

const toggle = function (item) {
  console.log("Toggle function init");
  if (!selection.isValid() && item === "dataRecap") {
    console.log("Toggle function scenario 1");
    return;
  }

  if (item === "selectionMenu" || item === "dataRecap") {
    console.log("Toggle function scenario 2");
    for (const key in displayedItems) {
      if (key === item) {
        displayedItems[key] = !displayedItems[key];
      } else {
        displayedItems[key] = false;
      }
    }
    return;
  }

  for (const key in displayedItems) {
    console.log("Toggle function scenario 3");
    if (key === item) {
      displayedItems[key] = !displayedItems[key];
      return;
    }
  }
  console.log("Toggle function scenario 4");
};

const displayIndicatorInformation = function (indicatorCode) {
  const indicatorData = indicators.find(
    (indicator) => indicator.code === indicatorCode,
  );
  if (indicatorData) {
    userStore.triggerModal(
      null,
      indicatorData.name,
      indicatorData.description,
      ["OK"],
    );
  }
};

const retrieveIndicatorData = async function () {
  try {
    userStore.isLoading.status = true;
    const response = await fetch(`/backend/indicator/getIndicator`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        countryCodes: selection.selectedCountry,
        indicatorCodes: selection.selectedIndicator,
      }),
    });
    const responseData = await response.json();

    if (response.ok) {
      userStore.isLoading.status = false;
      console.log("Data retreived");
      backendData.data = responseData.data;
      return;
    } else {
      userStore.isLoading.status = false;
      return console.log("FAIL data retreived");
    }
  } catch (error) {
    userStore.isLoading.status = false;
    return console.error("Error:", error);
  }
};

const newSelection = async function () {
  if (!selection.isValid()) {
    return;
  }
  console.log(`New selection function fired !`);
  console.log(`Selected indicators: `, selection.selectedIndicator);

  await retrieveIndicatorData(); // Wait for indicator data retrieval

  // Hide selection menu and display data recap only if successful
  displayedItems.selectionMenu = false;
  displayedItems.dataRecap = !!backendData.data; // Show data recap if data is available
};
</script>

<style scoped>
section {
  margin: 0 25vw 2em 25vw;
  display: flex;
  flex-direction: column;
  gap: 1em;
}

p {
  text-align: justify;
  text-justify: inter-word;
}

div h2 {
  font-size: 1.15em;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: 0.1s ease-in-out;
  padding: 0.5em 0;
  margin: 0.1em 0;
}

form h3 {
  font-size: 1.15em;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: 0.1s ease-in-out;
  padding: 0.35em 0;
  margin: 0.35em 0;
}

div h2:not(.expanded):hover,
form h3:not(.expanded):hover {
  background-color: var(--primary-light-hover);
}

div h2.disabled {
  cursor: not-allowed;
}

[data-theme="dark"] div h2:not(.expanded):hover,
[data-theme="dark"] form h3:not(.expanded):hover {
  background-color: var(--grey-500);
}

div h2::before,
div h3::before {
  content: "›";
  margin: 0 1em 0 0.5em;
  transition: transform 0.1s ease-in-out;
}

div h2.expanded::before,
div h3.expanded::before {
  transform: rotate(90deg);
}

h2.expanded {
  background-color: var(--primary-dark);
  color: var(--primary-light);
}

h3.expanded {
  background-color: var(--grey-500);
  color: var(--primary-light);
}

h3 span.tag {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: 1em;
  padding: 4px 8px;
  width: 1em;
  height: auto;
  font-size: 0.75em;
  cursor: default;
}

h3 span.tag.invalid {
  background-color: var(--red-100);
  border: 1px solid var(--red-700);
  box-shadow: 1px 1px 0px var(--red-700);
  color: var(--red-700);
}

h3 span.tag.valid {
  background-color: var(--green-100);
  border: 1px solid var(--green-700);
  box-shadow: 1px 1px 0px var(--green-700);
  color: var(--green-700);
}

button {
  margin: 1.75em auto;
  width: 75%;
}

form {
  width: 100%;
  margin: 1rem 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.35em;
}

form h3 {
  margin-bottom: 0.3em;
  grid-column: 1 / span 2;
}

form h4 {
  margin: 0.5em 0;
  grid-column: 1 / span 2;
}

form div {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

div.graph-wrapper {
  & *:not(h4) {
    margin: 0;
    padding: 0;
  }
  & h4 {
    margin-bottom: 0;
  }
  & i {
    font-size: 0.75em;
    line-height: 0em;
  }
}

#indicatorSelectorSubMenu {
  grid-column: 1 / span 2;
  display: flex;
  flex-direction: column;
  gap: 0.35em;
}

#indicatorSelectorSubMenu button {
  box-shadow: 3px 3px 0px var(--primary-dark);
  margin-right: 7px;
}

form label {
  margin-left: 1em;
  cursor: pointer;
}

form div.countrySelector,
form div.indicatorSelector {
  display: flex;
  align-items: center;
}
form div.indicatorSelector label {
  flex-grow: 1;
}

form div.indicatorSelector button {
  height: 1.25em;
  width: 1.25em;
  margin: 0;
  padding: 0;
}

form div.indicatorSelector button img {
  height: 2em;
  width: 2em;
}

form button {
  grid-column: 1 / span 2;
}

label:not(:first-of-type) {
  margin-top: 1em;
}

table {
  width: 100%;
}

@media screen and (max-width: 1300px) {
  section {
    margin: 10vh 15vw;
    margin-top: 0;
  }
}

@media screen and (max-width: 1100px) {
  section {
    margin: 10vh 9vw;
    margin-top: 0;
  }
}

@media screen and (max-width: 700px) {
  section {
    margin: 10vh 8vw;
    margin-top: 0;
  }
}

@media screen and (max-width: 600px) {
  section {
    margin: 10vh 8vw;
    margin-top: 0;
  }
  .countryCommonName {
    display: none;
  }
}
</style>
