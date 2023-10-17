<template>
  <div :class="messageCardClasses">
    <!-- The icon based on the variant. Can be overwritten by using the `icon` slot -->
    <div v-if="!withoutIcon">
      <slot name="icon">
        <component :is="messageCardIconByVariant" class="w-6 h-6" />
      </slot>
    </div>

    <!-- The message which is being displayed in the card. Can be overwritten by using the `default` slot -->
    <slot>
      <span class="font-semibold">{{ message }}</span>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";
import { CheckCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from "@heroicons/vue/24/outline";

// Props
const props = defineProps({
  // The message which is being displayed in the card.
  message: {
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

  // Render the message card without an icon.
  noIcon: {
    type: Boolean,
    default: false,
  },
});

/**
 * Determine wether the message card should be rendered without an icon based on the `noIcon` & `variant` props.
 */
const withoutIcon = computed(
  () => props.noIcon || props.variant === "primary" || props.variant === "secondary" || props.variant === "neutral"
);

/**
 * Classes which are applied to the message card.
 */
const messageCardClasses = computed(() => ({
  "flex flex-row gap-3 p-4 rounded": true,

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

/**
 * The icon which is displayed in the message card based on the variant.
 */
const messageCardIconByVariant = computed(() => {
  switch (props.variant) {
    case "success":
      return CheckCircleIcon;

    case "danger":
      return ExclamationCircleIcon;

    case "warning":
      return ExclamationTriangleIcon;

    case "info":
      return InformationCircleIcon;

    default:
      return null;
  }
});
</script>
