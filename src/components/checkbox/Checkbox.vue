<template>
  <div class="flex flex-col">
    <div class="relative flex gap-x-2">
      <input v-bind="$attrs" :id="id" :checked="modelValue" type="checkbox" :class="inputClasses" @input="handleInput" />
      <label :for="id" :class="labelClasses">
        {{ label }}

        <!-- Add the optional ping -->
        <span v-if="ping" class="absolute flex h-3 w-3 -top-1.5 -right-1.5">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </span>
      </label>
    </div>
    <span v-if="errorMessage" class="text-xs font-medium text-red-600">{{ errorMessage }}</span>
    <span v-if="helpText" class="text-xs font-medium text-gray-400">{{ helpText }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

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
    type: Boolean,
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

/**
 * Return the new value from the input back to the parent by updating the modelValue.
 *
 * @param { Event } event ➜ The event which fired the event.
 */
const handleInput = (event: Event) => {
  const checkedValue = (event.target as HTMLInputElement).checked;
  emit("update:modelValue", checkedValue);
};

/**
 * Classes which are applied to the label.
 */
const labelClasses = computed(() => ({
  "text-sm font-medium relative": true,

  // Valid / Invalid states
  "text-white": !props.valid && !props.invalid,
  "text-emerald-600": props.valid && !props.invalid,
  "text-red-600": !props.valid && props.invalid,
}));

/**
 * Classes which are applied to the input element.
 */
const inputClasses = computed(() => ({
  "w-4 h-4 rounded": true,

  // Focus Styles
  "focus:ring-2 focus:ring-sky-600 focus:ring-offset-slate-800 focus:bg-transparent": true,

  // Checked Styles
  "checked:bg-sky-600 checked:focus:bg-sky-600 checked:hover:bg-sky-700 checked:hover:focus:bg-sky-700": true,

  // Valid / Invalid State
  "bg-gray-600/10 border-slate-600 hover:bg-gray-600/30": !props.valid && !props.invalid,
  "bg-emerald-600/10 border-emerald-600 hover:bg-emerald-600/30": props.valid && !props.invalid,
  "bg-red-600/10 border-red-600 hover:bg-red-600/30": !props.valid && props.invalid,
}));
</script>
