<template>
  <v-container class="pa-0">
    <v-pagination
      v-model="page"
      :length="length"
      :total-visible="5"
      color="secondary"
      rounded="circle"
      class="mt-6"
      @update:modelValue="$emit('update:page', Number(page))"
    />
  </v-container>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  length: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
    validator: (value) => {
      const num = Number(value);
      if (isNaN(num) || num < 1) {
        console.warn(`Invalid currentPage value: ${value}. Must be a number >= 1.`);
        return false;
      }
      return true;
    },
  },
});

const emit = defineEmits(["update:page"]);

const page = ref(Number(props.currentPage) || 1);

watch(
  () => props.currentPage,
  (newPage) => {
    const numPage = Number(newPage);
    page.value = isNaN(numPage) || numPage < 1 ? 1 : numPage;
  }
);
</script>

<style scoped>
.v-pagination .v-btn:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease;
}
</style>