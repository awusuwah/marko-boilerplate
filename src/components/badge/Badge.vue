<template>
  <component :is="is" :class="badgeClasses">
    <slot>
      {{ label }}
    </slot>

    <button v-if="dismissable" class="flex items-center justify-center" @click.stop="emit('dismiss')">
      <XMarkIcon class="w-4 h-4" aria-hidden="true" />
    </button>
  </component>
</template>

<script setup lang="ts">
import { computed, defineEmits, PropType } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";

const emit = defineEmits(["dismiss"]);

const props = defineProps({
  // The HTML element which should be rendered as the badge.
  is: {
    type: String,
    default: "span",
  },

  // The label of the badge.
  label: {
    type: String,
    default: null,
  },

  // The color variant the badge will take on.
  variant: {
    type: String as PropType<"primary" | "secondary" | "neutral" | "success" | "danger" | "warning" | "info">,
    default: "neutral",
  },

  // The style variant the badge will take on.
  styleVariant: {
    type: String as PropType<"solid" | "outline" | "tinted">,
    default: "solid",
  },

  // Enable the badge to be dismissable.
  dismissable: {
    type: Boolean,
    default: false,
  },
});

/**
 * Classes which are applied to the badge.
 */
const badgeClasses = computed(() => ({
  "flex items-center gap-x-2 rounded-md text-sm font-semibold": true,

  // Dismissable
  "pl-3 pr-2 py-0.5": props.dismissable,
  "px-3 py-0.5": !props.dismissable,

  // Primary Variant
  "bg-pri text-pri-contrast": props.variant === "primary" && props.styleVariant === "solid",
  "bg-pri/50 text-pri-contrast": props.variant === "primary" && props.styleVariant === "tinted",
  "bg-transparent text-pri-contrast ring-1 ring-inset ring-pri": props.variant === "primary" && props.styleVariant === "outline",

  // Secondary Variant
  "bg-sec text-sec-contrast": props.variant === "secondary" && props.styleVariant === "solid",
  "bg-sec/50 text-sec-contrast": props.variant === "secondary" && props.styleVariant === "tinted",
  "bg-transparent text-sec-contrast ring-1 ring-inset ring-sec": props.variant === "secondary" && props.styleVariant === "outline",

  // Neutral Variant
  "bg-neu text-neu-contrast": props.variant === "neutral" && props.styleVariant === "solid",
  "bg-neu/50 text-neu-contrast": props.variant === "neutral" && props.styleVariant === "tinted",
  "bg-transparent text-neu-contrast ring-1 ring-inset ring-neu": props.variant === "neutral" && props.styleVariant === "outline",

  // Success Variant
  "bg-suc text-suc-contrast": props.variant === "success" && props.styleVariant === "solid",
  "bg-suc/50 text-suc-contrast": props.variant === "success" && props.styleVariant === "tinted",
  "bg-transparent text-suc-contrast ring-1 ring-inset ring-suc": props.variant === "success" && props.styleVariant === "outline",

  // Danger Variant
  "bg-dng text-dng-contrast": props.variant === "danger" && props.styleVariant === "solid",
  "bg-dng/50 text-dng-contrast": props.variant === "danger" && props.styleVariant === "tinted",
  "bg-transparent text-dng-contrast ring-1 ring-inset ring-dng": props.variant === "danger" && props.styleVariant === "outline",

  // Warning Variant
  "bg-wrn text-wrn-contrast": props.variant === "warning" && props.styleVariant === "solid",
  "bg-wrn/50 text-wrn-contrast": props.variant === "warning" && props.styleVariant === "tinted",
  "bg-transparent text-wrn-contrast ring-1 ring-inset ring-wrn": props.variant === "warning" && props.styleVariant === "outline",

  // Info Variant
  "bg-inf text-inf-contrast": props.variant === "info" && props.styleVariant === "solid",
  "bg-inf/50 text-inf-contrast": props.variant === "info" && props.styleVariant === "tinted",
  "bg-transparent text-inf-contrast ring-1 ring-inset ring-inf": props.variant === "info" && props.styleVariant === "outline",
}));
</script>
