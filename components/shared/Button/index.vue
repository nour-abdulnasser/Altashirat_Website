<template>
  <v-btn v-bind="$attrs" :class="['button', $attrs.class, 'px-6', 'py-2', 'd-flex', 'justify-center', 'align-center']">
    <span class="me-2 pt-1">
      <Image :icon="icon" />
    </span>
    <span>
      {{ text }}
    </span>
  </v-btn>
</template>
  <script setup>
import { defineProps } from "vue";
const props = defineProps({
  text: String,
  icon: String,
});
</script> 
  