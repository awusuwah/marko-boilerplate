<template>
  <div class="flex flex-col">
    <label :for="id" :class="labelClasses">{{ label }}</label>
    <div
      ref="outsideRef"
      :class="wrapperClasses"
      role="button"
      aria-controls="dropdown-options"
      :aria-expanded="dropdownOpen ? true : false"
      @click="toggleDropdown"
    >
      <input
        ref="inputRef"
        v-bind="$attrs"
        :id="id"
        class="bg-transparent w-full border-none focus:ring-0 focus:outline-none cursor-pointer"
        type="text"
        :readonly="!dropdownOpen"
        :value="dropdownOpen ? searchQuery : modelValue?.label ?? ''"
        @blur="handleBlur"
        @focus="handleFocus"
        @input="handleInput"
      />
      <div :class="buttonWrapperClasses">
        <button
          :class="buttonClasses"
          :aria-label="dropdownOpen ? 'Close Dropdown' : 'Open Dropdown'"
          tabindex="-1"
          @click.stop="toggleDropdown"
        >
          <ChevronUpIcon v-if="dropdownOpen" class="w-5 h-5 text-gray-400" />
          <ChevronDownIcon v-if="!dropdownOpen" class="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <!-- Options for the dropdown -->
      <Teleport to="body">
        <section
          v-if="dropdownOpen"
          ref="optionsRef"
          id="dropdown-options"
          role="menu"
          class="w-full border border-slate-600 bg-gray-800 divide-y divide-slate-600 rounded text-gray-200 overflow-auto z-50"
          :style="floatingStyles"
        >
          <div v-for="option in filteredOptions" :class="optionClasses(option)" role="menuitem" @click.stop="selectOption(option)">
            {{ option.label }}
          </div>
        </section>
      </Teleport>

      <!-- Add the optional ping -->
      <span v-if="ping" class="absolute flex h-3 w-3 -top-1.5 -right-1.5">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
      </span>

      <CheckIcon v-if="valid" class="absolute right-11 w-7 h-7 text-emerald-600" />
      <XCircleIcon v-if="invalid" class="absolute right-11 w-7 h-7 text-red-600" />
    </div>
    <span v-if="errorMessage" class="text-xs font-medium text-red-600">{{ errorMessage }}</span>
    <span v-if="helpText" class="text-xs font-medium text-gray-400">{{ helpText }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, PropType, Ref } from "vue";
import { useFloating, autoUpdate, flip, offset, size } from "@floating-ui/vue";
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
    type: Object as PropType<DropdownOption | null>,
    default: null,
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
const dropdownOpen: Ref<Boolean> = ref(false);
const filteredOptions: Ref<DropdownOption[]> = ref(props.options);
const searchQuery: Ref<String> = ref("");
const keyboardSelected: Ref<DropdownOption | null> = ref(null);

/**
 * * Component Refs
 * * All the refs which are required to make the component work.
 */
const inputRef: Ref<HTMLInputElement | null> = ref(null);
const outsideRef: Ref<HTMLDivElement | null> = ref(null);
const optionsRef: Ref<HTMLDivElement | null> = ref(null);

const { floatingStyles } = useFloating(outsideRef, optionsRef, {
  whileElementsMounted: autoUpdate,
  placement: "bottom",
  middleware: [
    offset(8),
    flip({ padding: 4 }),
    size({
      padding: 4,
      apply({ availableWidth, availableHeight, elements }) {
        // get the width of the inputref
        const inputWidth = elements.reference.offsetWidth;

        // Do things with the data, e.g.
        Object.assign(elements.floating.style, {
          maxWidth: `${inputWidth}px`,
          maxHeight: `${availableHeight}px`,
        });
      },
    }),
  ],
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

  // Add event handlers for the dropdown
  window.addEventListener("click", clickedOutsideDropdown);
  window.addEventListener("keydown", handleKeyboardNavigation);
};

/**
 * Close the dropdown. This resets the dropdown for the closed state.
 */
const closeDropdown = () => {
  dropdownOpen.value = false;

  // Remove event handlers from the dropdown
  window.removeEventListener("click", clickedOutsideDropdown);
  window.removeEventListener("keydown", handleKeyboardNavigation);
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

  // Reset the values for the options
  filteredOptions.value = props.options;
  keyboardSelected.value = null;
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

  // If only one option is left, select it
  if (filteredOptions.value.length === 1) {
    keyboardSelected.value = filteredOptions.value[0];
  }
};

/**
 * Handle when the user focuses the input. This will allow the user to open the dropdown by pressing the space bar.
 *
 * @param { Event } event - The event which fired the event.
 */
const handleFocus = (event: Event) => {
  window.addEventListener("keydown", openDropdownWithSpace);
};

/**
 * Handle when the user blurs the input. This will remove the event listener which allows the user to open the dropdown
 * using the space bar.
 *
 * @param { Event } event - The event which is being handled.
 */
const handleBlur = (event: Event) => {
  window.removeEventListener("keydown", openDropdownWithSpace);
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
 * Handle when the user opens the dropdown using the space key while it's focused.
 *
 * @param { KeyboardEvent } event - The keyboard event which is being handled.
 */
const openDropdownWithSpace = (event: KeyboardEvent) => {
  if (event.key === " " && !dropdownOpen.value) {
    event.preventDefault();
    openDropdown();
  }
};

/**
 * Handle when the user presses any of the keys on the keyboard. This will allow the user to navigate through the options, clos
 * the dropdown, etc.
 *
 * @param { KeyboardEvent } event - The keyboard event which is being handled.
 */
const handleKeyboardNavigation = (event: KeyboardEvent) => {
  switch (event.key) {
    case "Escape":
      closeDropdown();
      break;

    case "ArrowDown":
      event.preventDefault();

      // If there is no selected option, select the first option
      if (!keyboardSelected.value) {
        keyboardSelected.value = filteredOptions.value[0];
        return;
      }

      // If the selected option is the last option, select the first option
      if (filteredOptions.value.indexOf(keyboardSelected.value) === filteredOptions.value.length - 1) {
        keyboardSelected.value = filteredOptions.value[0];
        return;
      }

      // Select the next option
      keyboardSelected.value = filteredOptions.value[filteredOptions.value.indexOf(keyboardSelected.value) + 1];
      break;

    case "ArrowUp":
      event.preventDefault();

      // If there is no selected option, select the last option
      if (!keyboardSelected.value) {
        keyboardSelected.value = filteredOptions.value[filteredOptions.value.length - 1];
        return;
      }

      // If the selected option is the first option, select the last option
      if (filteredOptions.value.indexOf(keyboardSelected.value) === 0) {
        keyboardSelected.value = filteredOptions.value[filteredOptions.value.length - 1];
        return;
      }

      // Select the previous option
      keyboardSelected.value = filteredOptions.value[filteredOptions.value.indexOf(keyboardSelected.value) - 1];
      break;

    case "Enter":
      event.preventDefault();

      // If there is no selected option, do nothing
      if (!keyboardSelected.value) return;

      selectOption(keyboardSelected.value);
      break;

    default:
      break;
  }
};

/**
 * Classes which are applied to the option elements.
 *
 * @param { DropdownOption } option - The option which is being rendered.
 */
const optionClasses = (option: DropdownOption) => ({
  "w-full px-2 py-2 cursor-pointer": true,

  // Selected option
  "bg-gray-600/40": option.value === keyboardSelected.value?.value,
  "hover:bg-slate-600/20": option.value !== keyboardSelected.value?.value,
});

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
