<script setup lang="ts">
import { ref } from "vue";

const modalRefItem = ref<HTMLDivElement | null>(null);

defineProps<{
  open: Boolean;
}>();

defineExpose({
  modalRefItem,
});
</script>

<template>
  <div class="bg-gray-600/20 fixed top-0 left-0 w-full h-full flex justify-center" v-show="open">
    <div
      class="w-full md:w-[500px] bg-white rounded-lg h-fit mt-[3%]"
      ref="modalRefItem"
      id="modal"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
#modal {
  animation: popUp 0.3s ease-out;
}

@keyframes popUp {
  0% {
    transform: scale(0.2);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
