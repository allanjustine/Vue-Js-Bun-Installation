<script setup lang="ts">
defineProps<{
  toggleModal: () => void;
}>();
</script>

<template>
  <div class="border-b border-gray-300 p-5 text-xl font-bold relative">
    <h1>
      <slot />
    </h1>
    <button type="button" class="absolute top-6 right-6" @click="toggleModal">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>
