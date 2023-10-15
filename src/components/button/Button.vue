<template>
  <component :is="as">
    <slot>
      {{ label }}
    </slot>
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";

/**
 * * Component Props
 * * All the props for the component.
 */
const props = defineProps({
  // Render the component as this element.
  as: {
    type: String,
    default: "button",
  },

  // Render the text on the button.
  label: {
    type: String,
    default: null,
  },

  // Render the button in the specified variant
  variant: {
    type: "primary" | "secondary" | "tertiary", "neutral" | "success" | "warning" | "danger" | "info",
    default: "neutral",
  }
});

/**
 * * Computed properties
 * * All the computed properties for the component.
 */
const classes = computed(() => ({
  ''
}))
</script>
