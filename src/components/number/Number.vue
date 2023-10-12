<template>
  <div class="flex flex-col">
    <label :for="id" :class="labelClasses">{{ label }}</label>
    <div :class="wrapperClasses">
      <input
        v-bind="$attrs"
        :id="id"
        class="bg-transparent w-full border-none focus:ring-0 focus:outline-none"
        type="number"
        :value="modelValue"
        @input="handleInput"
      />
      <div :class="buttonWrapperClasses">
        <button :class="buttonClasses" @click="increment">+</button>
        <button :class="buttonClasses" @click="decrement">-</button>
      </div>

      <!-- Add the optional ping -->
      <span v-if="ping" class="absolute flex h-3 w-3 -top-1.5 -right-1.5">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
      </span>

      <CheckIcon v-if="valid" class="absolute right-10 w-7 h-7 text-emerald-600" />
      <XCircleIcon v-if="invalid" class="absolute right-10 w-7 h-7 text-red-600" />
    </div>
    <span v-if="errorMessage" class="text-xs font-medium text-red-600">{{ errorMessage }}</span>
    <span v-if="helpText" class="text-xs font-medium text-gray-400">{{ helpText }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { CheckIcon, XCircleIcon } from "@heroicons/vue/24/outline";

defineOptions({
  inheritAttrs: false,
});

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  // The unique id for the input. Needs to be unique for each input on the page.
  id: {
    type: String,
    required: true,
  },

  // The label for the input.
  label: {
    type: String,
    required: true,
  },

  // Mark the component as valid.
  valid: {
    type: Boolean,
    default: false,
  },

  // Mark the component as invalid.
  invalid: {
    type: Boolean,
    default: false,
  },

  // The value of the input.
  modelValue: {
    type: Number,
    required: true,
  },

  // Add a ping to the top right corner of the input.
  ping: {
    type: Boolean,
    default: false,
  },

  // Add a helptext below the input.
  helpText: {
    type: String,
    default: null,
  },

  // Add an error message below the input & above the helptext.
  errorMessage: {
    type: String,
    default: null,
  },
});

const increment = () => emit("update:modelValue", props.modelValue + 1);
const decrement = () => emit("update:modelValue", props.modelValue - 1);

/**
 * Make sure that the value returned is always a number. If the conversion into
 * a number doesn't work, 0 is returned.
 *
 * @param { Event } event ➜ The event which fired the event.
 */
const handleInput = (event: Event) => {
  const valueNumber = (event.target as HTMLInputElement).valueAsNumber;
  emit("update:modelValue", Number.isNaN(valueNumber) ? 0 : valueNumber);
};

/**
 * Classes which are applied to the wrapper element.
 */
const wrapperClasses = computed(() => ({
  "flex items-center relative": true,
  "w-full rounded border": true,

  // Valid / Invalid states
  "bg-gray-800 border-slate-600 text-white": !props.valid && !props.invalid,
  "bg-emerald-600/10 border-emerald-600 text-emerald-600": props.valid && !props.invalid,
  "bg-red-600/10 border-red-600 text-red-600": !props.valid && props.invalid,

  // Focus styles
  "focus-within:border-transparent focus-within:ring-2 focus-within:ring-blue-500": true,
}));

/**
 * Classes which are applied to the label.
 */
const labelClasses = computed(() => ({
  "text-sm font-medium": true,

  // Valid / Invalid states
  "text-white": !props.valid && !props.invalid,
  "text-emerald-600": props.valid && !props.invalid,
  "text-red-600": !props.valid && props.invalid,
}));

/**
 * Classes which are applied to the increment/decrement button wrapper.
 */
const buttonWrapperClasses = computed(() => ({
  "flex flex-col w-8 border-l divide-y": true,

  // Valid / Invalid states
  "border-slate-600 divide-slate-600": !props.valid && !props.invalid,
  "border-emerald-600 divide-emerald-600": props.valid && !props.invalid,
  "border-red-600 divide-red-600": !props.valid && props.invalid,
}));

/**
 * Classes which are applied to the increment/decrement buttons.
 */
const buttonClasses = computed(() => ({
  "text-xs h-5 select-none": true,

  // Valid / Invalid states
  "hover:bg-slate-600/20": !props.valid && !props.invalid,
  "hover:bg-emerald-600/20": props.valid && !props.invalid,
  "hover:bg-red-600/20": !props.valid && props.invalid,
}));
</script>

<style>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield; /* Hide for Firefox */
}
</style>
