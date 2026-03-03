<script setup lang="ts">
defineProps<{
  id: number;
}>();
</script>

<template>
  <div v-if="!isNaN(id)">User {{ id }}</div>
  <div v-else>Enter User ID</div>
</template>
