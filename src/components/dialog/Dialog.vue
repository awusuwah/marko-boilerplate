<template>
  <slot name="trigger">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="openDialog">Open Dialog</button>
  </slot>

  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" ref="dialogRef" class="fixed inset-0 flex items-end md:items-center md:justify-center z-40">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50"></div>

        <!-- Modal -->
        <div class="dialog bg-slate-800 w-full md:w-1/2 p-6 rounded-t-xl md:rounded-xl shadow-lg z-10 relative">
          <h2 v-if="title" class="text-xl font-semibold text-white mb-2">{{ title }}</h2>

          <button class="absolute top-3 right-3" @click="closeDialog">
            <XMarkIcon class="w-6 h-6 text-slate-400" />
          </button>

          <slot>Default Dialog Content</slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";

// * State
const open = ref(false);

// * Refs
const dialogRef: Ref<HTMLDivElement | null> = ref(null);

// * Props
const props = defineProps({
  // The title of the dialog.
  title: {
    type: String,
    default: null,
  },
});

/**
 * Open the dialog in the modal mode.
 */
const openDialog = () => {
  open.value = true;
};

/**
 * Close the dialog. This will remove all the event handlers from the component.
 */
const closeDialog = () => {
  open.value = false;
};
</script>

<style>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .dialog,
.modal-leave-active .dialog {
  transition: all ease-out 0.3s;
}
.modal-enter-from .dialog,
.modal-leave-to .dialog {
  opacity: 0;
  transform: translateY(100%);
}
.modal-enter-to .dialog,
.modal-leave-from .dialog {
  opacity: 1;
  transform: translateY(0);
}
</style>
