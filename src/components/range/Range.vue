<template>
  <div class="flex flex-col">
    <label :for="id" :class="labelClasses">{{ label }}</label>
    <div class="relative flex flex-row gap-2">
      <input v-bind="$attrs" :id="id" :value="modelValue" type="range" :min="min" :max="max" :class="inputClasses" @input="handleInput" />
      <span :class="resultClasses">
        {{ modelValue }}
      </span>

      <!-- Add the optional ping -->
      <span v-if="ping" class="absolute flex h-3 w-3 -top-1.5 -right-1.5">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
      </span>

      <CheckIcon v-if="valid" class="w-5 h-5 text-emerald-600" />
      <XCircleIcon v-if="invalid" class="w-5 h-5 text-red-600" />
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
  // The unique id for the einput. Needs to be unique for each input on the page.
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

  // The minimum value of the input.
  min: {
    type: Number,
    default: 0,
  },

  // The maximum value of the input.
  max: {
    type: Number,
    default: 100,
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

/**
 * Return the new value from the input back to the parent by updating the modelValue.
 *
 * @param { Event } event ➜ The event which fired the event.
 */
const handleInput = (event: Event) => {
  emit("update:modelValue", parseInt((event.target as HTMLInputElement).value));
};

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
 * Classes which are applied to the input.
 */
const inputClasses = computed(() => ({
  "flex-1": true,

  // Valid / Invalid states
  valid: props.valid && !props.invalid,
  invalid: !props.valid && props.invalid,
}));

/**
 * Classes which are applied to the result.
 */
const resultClasses = computed(() => ({
  "text-sm font-medium font-mono": true,

  // Valid / Invalid states
  "text-white": !props.valid && !props.invalid,
  "text-emerald-600": props.valid && !props.invalid,
  "text-red-600": !props.valid && props.invalid,
}));
</script>

<style scoped>
input[type="range"] {
  -webkit-appearance-: none;
  width: 100%;
}

input[type="range"]:focus {
  outline: none;
}

input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  background: #475569;
  border-radius: 100px;
}

input[type="range"].valid::-webkit-slider-runnable-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  background: rgba(5, 150, 105, 1);
  border-radius: 100px;
}

input[type="range"].invalid::-webkit-slider-runnable-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  background: #dc2626;
  border-radius: 100px;
}

input[type="range"]::-webkit-slider-thumb {
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -4px;
}

input[type="range"]:focus::-webkit-slider-runnable-track {
  background: #60a5fa;
}
</style>
