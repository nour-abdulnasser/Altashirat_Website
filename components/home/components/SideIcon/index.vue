<template>
  <div class="side-icon"><v-icon :style="{color: color, fontSize: '2rem'}">{{ icon }}</v-icon></div>
</template>

<script setup>
defineProps({
    icon: String,
    color: String,
})
</script>
