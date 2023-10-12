<template>
  <div class="flex flex-col">
    <label :for="id" :class="labelClasses">{{ label }}</label>
    <div ref="outsideRef" :class="wrapperClasses" @click="toggleDropdown">
      <input
        ref="inputRef"
        v-bind="$attrs"
        :id="id"
        class="bg-transparent w-full border-none focus:ring-0 focus:outline-none cursor-pointer"
        type="text"
        :readonly="!dropdownOpen"
        :value="dropdownOpen ? searchQuery : modelValue.label"
        @input="handleInput"
      />
      <div :class="buttonWrapperClasses">
        <button :class="buttonClasses" @click.stop="toggleDropdown">
          <ChevronUpIcon v-if="dropdownOpen" class="w-5 h-5 text-gray-400" />
          <ChevronDownIcon v-if="!dropdownOpen" class="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <!-- Options for the dropdown -->
      <section
        v-if="dropdownOpen"
        ref="optionsRef"
        class="z-50 w-full border border-slate-600 bg-gray-800 divide-y divide-slate-600 rounded text-gray-200"
        :style="floatingStyles"
      >
        <div
          v-for="option in filteredOptions"
          class="w-full px-2 py-2 hover:bg-slate-600/20 cursor-pointer"
          @click.stop="selectOption(option)"
        >
          {{ option.label }}
        </div>
      </section>

      <!-- Add the optional ping -->
      <span v-if="ping" class="absolute flex h-3 w-3 -top-1.5 -right-1.5">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
      </span>

      <CheckIcon v-if="valid" class="absolute right-12 w-7 h-7 text-emerald-600" />
      <XCircleIcon v-if="invalid" class="absolute right-12 w-7 h-7 text-red-600" />
    </div>
    <span v-if="errorMessage" class="text-xs font-medium text-red-600">{{ errorMessage }}</span>
    <span v-if="helpText" class="text-xs font-medium text-gray-400">{{ helpText }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, PropType, Ref } from "vue";
import { useFloating, autoPlacement, offset } from "@floating-ui/vue";
import { CheckIcon, XCircleIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/24/outline";

type DropdownOption = {
  label: String;
  value: String | Number;
};

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
    type: Object as PropType<DropdownOption>,
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

  // The options which are displayed in the dropdown.
  options: {
    type: Array<DropdownOption>,
    required: true,
  },
});

/**
 * * Component State
 * * All the state variables which are required to make the component work.
 */
const dropdownOpen = ref(false);
const filteredOptions = ref(props.options);
const searchQuery = ref("");

/**
 * * Component Refs
 * * All the refs which are required to make the component work.
 */
const inputRef: Ref<HTMLInputElement | null> = ref(null);
const outsideRef: Ref<HTMLDivElement | null> = ref(null);
const optionsRef: Ref<HTMLDivElement | null> = ref(null);

const { floatingStyles } = useFloating(outsideRef, optionsRef, {
  placement: "bottom",
  middleware: [autoPlacement({ padding: 4 }), offset(8)],
});

/**
 * * Component Methods
 * * All the methods which are required to make the component work.
 */

/**
 * Toggle the dropdown by clicking on the chevron.
 */
const toggleDropdown = () => {
  dropdownOpen.value ? closeDropdown() : openDropdown();
};

/**
 * Open the dropdown. This prepares the dropdown for the open state.
 */
const openDropdown = () => {
  dropdownOpen.value = true;

  // Reset the search query & focus the input
  searchQuery.value = "";
  (inputRef.value as unknown as HTMLInputElement)?.focus(); // Cast to unknown to avoid TS error

  // Add the event handle to close the dropdown when clicking outside of the dropdown
  window.addEventListener("click", clickedOutsideDropdown);
};

/**
 * Close the dropdown. This resets the dropdown for the closed state.
 */
const closeDropdown = () => {
  dropdownOpen.value = false;

  // Remove the event handler to close the dropdown when clicking outside of the dropdown
  window.removeEventListener("click", clickedOutsideDropdown);
};

/**
 * Select an option from the dropdown. This will emit the selected option to the parent component so that no
 * state needs to be managed within this component. The options will be closed after selecting an option.
 *
 * @param { DropdownOption } option - The option which has been selected.
 */
const selectOption = (option: DropdownOption) => {
  emit("update:modelValue", option);

  closeDropdown();
};

/**
 * Handle when the user types into the input. This will filter the options based on the input value if the
 * dropdown is in "searching" mode.
 *
 * @param { Event } event - The event which fired the event.
 */
const handleInput = (event: Event) => {
  // If the dropdown is not in "searching" mode, we don't need to filter the options
  if (!dropdownOpen.value) return;

  // Filter the options based on the input value
  searchQuery.value = (event.target as HTMLInputElement).value;
  const searchedOptions = props.options.filter((option) => option.label.toLowerCase().includes(searchQuery.value.toLowerCase()));

  // Set the filtered options
  filteredOptions.value = searchedOptions;
};

/**
 * Handle when the user has clicked outside of the dropdown or it's options. This will automatically close the dropdown.
 *
 * @param { MouseEvent } event - The click event which is being handled.
 */
const clickedOutsideDropdown = (event: MouseEvent) => {
  if (outsideRef.value && !outsideRef.value.contains(event.target as Node)) {
    closeDropdown();
  }
};

/**
 * * Component Computed
 * * All the computed properties which are required to make the component work.
 */

/**
 * Classes which are applied to the wrapper element.
 */
const wrapperClasses = computed(() => ({
  "flex items-center relative": true,
  "w-full rounded border cursor-pointer": true,

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
  "w-10 h-10 border-l": true,

  // Valid / Invalid states
  "border-slate-600": !props.valid && !props.invalid,
  "border-emerald-600": props.valid && !props.invalid,
  "border-red-600": !props.valid && props.invalid,
}));

/**
 * Classes which are applied to the increment/decrement buttons.
 */
const buttonClasses = computed(() => ({
  "flex items-center justify-center h-full w-full text-xs select-none": true,

  // Valid / Invalid states
  "hover:bg-slate-600/20": !props.valid && !props.invalid,
  "hover:bg-emerald-600/20": props.valid && !props.invalid,
  "hover:bg-red-600/20": !props.valid && props.invalid,
}));
</script>
