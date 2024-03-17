<template>
  <Calendar
    v-model="selectedDates"
    selectionMode="range"
    dateFormat="dd-M-yy"
    v-bind:minDate="minDate"
    v-bind:maxDate="maxDate"
    hideOnRangeSelection
    showButtonBar
    placeholder="Select a date range"
    inputId="selectedDates"
    :pt="calendar"
  >
  </Calendar>
</template>

<script setup>
import Calendar from "primevue/calendar";

import { ref, watch } from "vue";

const props = defineProps({
  predefinedDateRange: {
    type: Object,
  },
});

watch(
  () => props.predefinedDateRange,
  (newValue) => {
    if (newValue && newValue.length > 0) {
      selectedDates.value = newValue;
    }
  },
);

const minDate = ref(new Date("2023-01-01"));
const maxDate = ref(new Date());

const selectedDates = ref("");

const calendar = {
  root: ({ props }) => ({
    class: [
      // Display and Position
      "inline-flex",
      "w-full",
      "relative",
      // Misc
      {
        "opacity-60 select-none pointer-events-none cursor-default":
          props.disabled,
      },
    ],
  }),
  input: ({ props }) => ({
    class: [
      // Display
      "cursor-pointer",
      // Display
      "flex flex-auto",
      // Font
      "font-sans text-sm font-medium leading-none",
      // Colors
      "text-grey-900 dark:text-gray-200",
      "placeholder:text-gray-900 dark:placeholder:text-gray-100",
      "bg-gray-0 dark:bg-gray-800",
      "border",
      { "border-gray-300 dark:border-gray-600": !props.invalid },
      // Invalid State
      { "border-red-500 dark:border-red-400": props.invalid },
      // Spacing
      "m-0 px-5 py-3",
      // Shape
      "appearance-none",
      { "rounded-lg": !props.showIcon || props.iconDisplay == "input" },
      {
        "rounded-l-md  flex-1 pr-9":
          props.showIcon && props.iconDisplay !== "input",
      },
      {
        "rounded-lg flex-1 pr-9":
          props.showIcon && props.iconDisplay === "input",
      },
      // Transitions
      "transition-colors",
      "duration-200",
      // States
      {
        "dark:hover:border-gray-600": !props.invalid,
      },
      "hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700",
    ],
  }),
  dropdownbutton: {
    root: {
      class: [
        "relative",
        "items-center inline-flex text-center align-bottom",
        "rounded-r-md",
        "px-4 py-3 leading-none",
        "text-gray-100 dark:text-gray-900",
        "bg-gray-500 dark:bg-gray-400",
        "border border-gray-500 dark:border-gray-400",
        "focus:outline-none focus:outline-offset-0 focus:ring",
        "hover:bg-gray-600 dark:hover:bg-gray-300 hover:border-gray-600 dark:hover:border-gray-300",
        "focus:ring-gray-400/50 dark:focus:ring-gray-300/50",
      ],
    },
  },
  panel: ({ props }) => ({
    class: [
      // Display & Position
      {
        absolute: !props.inline,
        "inline-block": props.inline,
      },
      // Size
      { "w-80 p-2 ": !props.inline },
      { "min-w-[80vw] w-auto p-2 ": props.touchUI },
      { "p-2 min-w-full": props.inline },
      // Shape
      "border rounded-lg",
      {
        "shadow-md": !props.inline,
      },
      // Colors
      "bg-gray-50 dark:bg-gray-800",
      "border-gray-200 dark:border-gray-700",
      //misc
      { "overflow-x-auto": props.inline },
    ],
  }),
  datepickerMask: {
    class: [
      "fixed top-0 left-0 w-full h-full",
      "flex items-center justify-center",
      "bg-black bg-opacity-90",
    ],
  },
  header: {
    class: [
      "font-semibold",
      "flex items-center justify-between",
      "p-2",
      "m-0",
      "border-b",
      "rounded-t-md",
      "text-gray-700 dark:text-white/80",
      "bg-gray-50 dark:bg-gray-800",
      "border-gray-200 dark:border-gray-700",
    ],
  },
  previousbutton: {
    class: [
      "relative",
      "inline-flex items-center justify-center",
      "w-8 h-8",
      "p-0 m-0",
      "rounded-lg",
      "text-gray-600 dark:text-gray-100",
      "border-0",
      "bg-transparent",
      "transition-colors duration-200 ease-in-out",
      "hover:text-gray-700 dark:hover:text-white/80",
      "hover:bg-gray-100 dark:hover:bg-gray-800/80",
      "cursor-pointer overflow-hidden",
    ],
  },
  title: {
    class: ["leading-8", "mx-auto my-0"],
  },
  monthTitle: {
    class: [
      "text-sm leading-5",
      "font-semibold",
      "text-gray-700 dark:text-white/80",
      "transition duration-200",
      "p-2",
      "m-0 mr-2",
      "hover:text-primary-500 dark:hover:text-primary-400",
      "cursor-pointer",
    ],
  },
  yearTitle: {
    class: [
      "text-sm leading-5",
      "font-semibold",
      "text-gray-700 dark:text-white/80",
      "transition duration-200",
      "p-2",
      "m-0",
      "hover:text-primary-500 dark:hover:text-primary-400",
      "cursor-pointer",
    ],
  },
  nextbutton: {
    class: [
      "relative",
      "inline-flex items-center justify-center",
      "w-8 h-8",
      "p-0 m-0",
      "rounded-lg",
      "text-gray-600 dark:text-white/70",
      "border-0",
      "bg-transparent",
      "transition-colors duration-200 ease-in-out",
      "hover:text-gray-700 dark:hover:text-white/80",
      "hover:bg-gray-100 dark:hover:bg-gray-800/80",
      "cursor-pointer overflow-hidden",
    ],
  },
  table: {
    class: ["text-base leading-none", "border-collapse", "w-full", "mx-0 my-2"],
  },
  tableheadercell: {
    class: ["p-0 md:p-1"],
  },
  weekheader: {
    class: [
      "leading-5",
      "text-gray-600 dark:text-white/70",
      "opacity-60 cursor-default",
    ],
  },
  weeknumber: {
    class: ["text-gray-600 dark:text-white/70", "opacity-60 cursor-default"],
  },
  weekday: {
    class: ["text-gray-500 dark:text-white/60"],
  },
  day: {
    class: ["p-0"],
  },
  weeklabelcontainer: ({ context }) => ({
    class: [
      // Flexbox and Alignment
      "flex items-center justify-center",
      "mx-auto",
      // Shape & Size
      "w-8 h-8",
      "rounded-lg",
      "border-transparent border",
      // Colors
      {
        "text-gray-600 dark:text-white/70 bg-transparent":
          !context.selected && !context.disabled,
        "text-primary-700 bg-primary-100":
          context.selected && !context.disabled,
      },
      // States
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
      {
        "hover:bg-gray-100 dark:hover:bg-gray-800/80":
          !context.selected && !context.disabled,
        "hover:bg-primary-200": context.selected && !context.disabled,
      },
      {
        "opacity-80 cursor-default": context.disabled,
        "cursor-pointer": !context.disabled,
      },
    ],
  }),
  daylabel: ({ context }) => ({
    class: [
      // Flexbox and Alignment
      "flex items-center justify-center",
      "mx-auto",
      // Shape & Size
      "w-8 h-8",
      "rounded-lg",
      "border-transparent border",
      // Colors
      {
        "outline outline-offset-0 outline-2 outline-blue-500 dark:outline-blue-400 outline-dotted dark:text-blue-400":
          context.date.today,
        "text-gray-700 dark:text-gray-200 bg-transparent":
          !context.selected && !context.disabled && !context.date.today,
        "text-blue-700 bg-blue-100 dark:text-gray-0 dark:bg-blue-300/40":
          context.selected && !context.disabled,
      },
      // States
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-blue-400/50 dark:focus:ring-blue-300/50",
      {
        "hover:bg-gray-100 dark:hover:bg-gray-600/80":
          !context.selected && !context.disabled,
        "hover:bg-blue-200 dark:hover:bg-blue-200/40 dark:text-blue-200":
          context.selected && !context.disabled,
      },
      {
        "text-gray-200 dark:text-gray-700 cursor-default": context.disabled,
        "cursor-pointer": !context.disabled,
      },
    ],
  }),
  monthpicker: {
    class: ["my-2"],
  },
  month: ({ context }) => ({
    class: [
      // Flexbox and Alignment
      "inline-flex items-center justify-center",
      // Size
      "w-1/3",
      "p-2",
      // Shape
      "rounded-lg",
      // Colors
      {
        "text-gray-600 dark:text-white/70 bg-transparent":
          !context.selected && !context.disabled,
        "text-primary-700 bg-primary-100 dark:text-gray-0 dark:bg-primary-300/40":
          context.selected && !context.disabled,
      },
      // States
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
      {
        "hover:bg-gray-100 dark:hover:bg-gray-600/80":
          !context.selected && !context.disabled,
        "hover:bg-primary-200 dark:hover:bg-primary-200/40":
          context.selected && !context.disabled,
      },
      // Misc
      {
        "text-gray-200 dark:text-gray-800 cursor-default": context.disabled,
        "cursor-pointer": !context.disabled,
      },
    ],
  }),
  yearpicker: {
    class: ["my-2"],
  },
  year: ({ context }) => ({
    class: [
      // Flexbox and Alignment
      "inline-flex items-center justify-center",
      // Size
      "w-1/3",
      "p-2",
      // Shape
      "rounded-lg",
      // Colors
      {
        "text-gray-600 dark:text-white/70 bg-transparent":
          !context.selected && !context.disabled,
        "text-primary-700 bg-primary-100 dark:text-gray-0 dark:bg-primary-300/40":
          context.selected && !context.disabled,
      },
      // States
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
      {
        "hover:bg-gray-100 dark:hover:bg-gray-600/80":
          !context.selected && !context.disabled,
        "hover:bg-primary-200 dark:hover:bg-primary-200/40":
          context.selected && !context.disabled,
      },
      // Misc
      {
        "text-gray-200 dark:text-gray-800 cursor-default": context.disabled,
        "cursor-pointer": !context.disabled,
      },
    ],
  }),
  timepicker: {
    class: [
      "flex",
      "justify-center items-center",
      "border-t-1",
      "border-solid border-gray-200",
      "p-2",
    ],
  },
  separatorcontainer: {
    class: ["flex", "items-center", "flex-col", "px-2"],
  },
  separator: {
    class: ["text-xl"],
  },
  hourpicker: {
    class: ["flex", "items-center", "flex-col", "px-2"],
  },
  minutepicker: {
    class: ["flex", "items-center", "flex-col", "px-2"],
  },
  secondPicker: {
    class: ["flex", "items-center", "flex-col", "px-2"],
  },
  ampmpicker: {
    class: ["flex", "items-center", "flex-col", "px-2"],
  },
  incrementbutton: {
    class: [
      "relative",
      "inline-flex items-center justify-center",
      "w-8 h-8",
      "p-0 m-0",
      "rounded-lg",
      "text-gray-600 dark:text-white/70",
      "border-0",
      "bg-transparent",
      "transition-colors duration-200 ease-in-out",
      "hover:text-gray-700 dark:hover:text-white/80",
      "hover:bg-gray-100 dark:hover:bg-gray-800/80",
      "cursor-pointer overflow-hidden",
    ],
  },
  decrementbutton: {
    class: [
      "relative",
      "inline-flex items-center justify-center",
      "w-8 h-8",
      "p-0 m-0",
      "rounded-full",
      "text-gray-600 dark:text-white/70",
      "border-0",
      "bg-transparent",
      "transition-colors duration-200 ease-in-out",
      "hover:text-gray-700 dark:hover:text-white/80",
      "hover:bg-gray-100 dark:hover:bg-gray-800/80",
      "cursor-pointer overflow-hidden",
    ],
  },
  groupcontainer: {
    class: ["flex"],
  },
  group: {
    class: [
      "flex-1",
      "border-l",
      "border-gray-200",
      "pr-0.5",
      "pl-0.5",
      "pt-0",
      "pb-0",
      "first:pl-0",
      "first:border-l-0",
    ],
  },
  buttonbar: {
    class: [
      "flex justify-between items-center",
      "py-3 px-0",
      "border-t border-gray-200 dark:border-gray-700",
    ],
  },
  todaybutton: {
    root: {
      class: [
        "inline-flex items-center justify-center",
        "px-3 py-2 leading-none",
        "rounded-lg",
        "text-xs font-medium text-center text-gray-100",
        "bg-blue-700 dark:bg-blue-600",
        "hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
        "cursor-pointer",
      ],
    },
  },
  clearbutton: {
    root: {
      class: [
        "inline-flex items-center justify-center",
        "px-3 py-2 leading-none",
        "rounded-lg",
        "text-xs font-medium text-center text-gray-100",
        "bg-blue-700 dark:bg-blue-600",
        "hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
        "cursor-pointer",
      ],
    },
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass:
      "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0",
  },
};
</script>
