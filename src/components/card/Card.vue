<template>
  <div :class="cardClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

// Props
const props = defineProps({
  // The HTML element which should be rendered as the card.
  as: {
    type: String,
    default: "section",
  },

  // Render the card as clickable. This will apply a cursor and hover effect.
  clickable: {
    type: Boolean,
    default: false,
  },
});

/**
 * Classes which are applied to the card.
 */
const cardClasses = computed(() => ({
  "border border-bgr-600 bg-bgr-800 text-white rounded py-5 px-6": true,

  // If the card has a click or doubleclick event listener attached to it, apply the cursor pointer.
  "hover:bg-bgr-700 cursor-pointer transition-all": props.clickable,
}));
</script>
