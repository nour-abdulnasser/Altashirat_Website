<template>
  <v-skeleton-loader
    :height="height"
    :type="type"
    class="skeleton"
  ></v-skeleton-loader>
</template>

<script setup>
defineProps({
  height: {
    type: [Number, String],
    default: 400,
  },
  type: {
    type: String,
    default: "table",
  },
});
</script>

<style scoped>
.skeleton {
  width: 100%;
}
</style>
