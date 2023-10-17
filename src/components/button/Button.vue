<template>
  <component :is="is" :class="buttonClasses">
    <slot>
      {{ label }}
    </slot>
  </component>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";

const props = defineProps({
  // The HTML element which should be rendered as the button.
  is: {
    type: String,
    default: "button",
  },

  // The label of the button.
  label: {
    type: String,
    default: null,
  },

  // The color variant the button will take on.
  variant: {
    type: String as PropType<"primary" | "secondary" | "neutral" | "success" | "danger" | "warning" | "info">,
    default: "neutral",
  },

  // The style variant the button will take on.
  styleVariant: {
    type: String as PropType<"solid" | "outline" | "tinted">,
    default: "solid",
  },
});

/**
 * Classes which are applied to the button.
 */
const buttonClasses = computed(() => ({
  "flex items-center justify-center px-4 py-2 rounded-md font-semibold transition-all": true,

  // Primary Variant
  "bg-pri hover:bg-pri-hover active:bg-pri-active text-pri-contrast": props.variant === "primary" && props.styleVariant === "solid",
  "bg-pri/50 hover:bg-pri-hover/50 active:bg-pri-active/50 text-pri-contrast":
    props.variant === "primary" && props.styleVariant === "tinted",
  "bg-transparent hover:bg-pri/50 active:bg-pri-active/50 text-pri-contrast ring-1 ring-inset ring-pri":
    props.variant === "primary" && props.styleVariant === "outline",

  // Secondary Variant
  "bg-sec hover:bg-sec-hover active:bg-sec-active text-sec-contrast": props.variant === "secondary" && props.styleVariant === "solid",
  "bg-sec/50 hover:bg-sec-hover/50 active:bg-sec-active/50 text-sec-contrast":
    props.variant === "secondary" && props.styleVariant === "tinted",
  "bg-transparent hover:bg-sec/50 active:bg-sec-active/50 text-sec-contrast ring-1 ring-inset ring-sec":
    props.variant === "secondary" && props.styleVariant === "outline",

  // Neutral Variant
  "bg-neu hover:bg-neu-hover active:bg-neu-active text-neu-contrast": props.variant === "neutral" && props.styleVariant === "solid",
  "bg-neu/50 hover:bg-neu-hover/50 active:bg-neu-active/50 text-neu-contrast":
    props.variant === "neutral" && props.styleVariant === "tinted",
  "bg-transparent hover:bg-neu/50 active:bg-neu-active/50 text-neu-contrast ring-1 ring-inset ring-neu":
    props.variant === "neutral" && props.styleVariant === "outline",

  // Success Variant
  "bg-suc hover:bg-suc-hover active:bg-suc-active text-suc-contrast": props.variant === "success" && props.styleVariant === "solid",
  "bg-suc/50 hover:bg-suc-hover/50 active:bg-suc-active/50 text-suc-contrast":
    props.variant === "success" && props.styleVariant === "tinted",
  "bg-transparent hover:bg-suc/50 active:bg-suc-active/50 text-suc-contrast ring-1 ring-inset ring-suc":
    props.variant === "success" && props.styleVariant === "outline",

  // Danger Variant
  "bg-dng hover:bg-dng-hover active:bg-dng-active text-dng-contrast": props.variant === "danger" && props.styleVariant === "solid",
  "bg-dng/50 hover:bg-dng-hover/50 active:bg-dng-active/50 text-dng-contrast":
    props.variant === "danger" && props.styleVariant === "tinted",
  "bg-transparent hover:bg-dng/50 active:bg-dng-active/50 text-dng-contrast ring-1 ring-inset ring-dng":
    props.variant === "danger" && props.styleVariant === "outline",

  // Warning variant
  "bg-wrn hover:bg-wrn-hover active:bg-wrn-active text-wrn-contrast": props.variant === "warning" && props.styleVariant === "solid",
  "bg-wrn/50 hover:bg-wrn-hover/50 active:bg-wrn-active/50 text-wrn-contrast":
    props.variant === "warning" && props.styleVariant === "tinted",
  "bg-transparent hover:bg-wrn/50 active:bg-wrn-active/50 text-wrn-contrast ring-1 ring-inset ring-wrn":
    props.variant === "warning" && props.styleVariant === "outline",

  // Info variant
  "bg-inf hover:bg-inf-hover active:bg-inf-active text-inf-contrast": props.variant === "info" && props.styleVariant === "solid",
  "bg-inf/50 hover:bg-inf-hover/50 active:bg-inf-active/50 text-inf-contrast": props.variant === "info" && props.styleVariant === "tinted",
  "bg-transparent hover:bg-inf/50 active:bg-inf-active/50 text-inf-contrast ring-1 ring-inset ring-inf":
    props.variant === "info" && props.styleVariant === "outline",
}));
</script>
