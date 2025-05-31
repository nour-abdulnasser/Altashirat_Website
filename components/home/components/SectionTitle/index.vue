<template>
  <div class="section-title">
    <div class="section-title-content">
      <h3 class="section-title-main" :style="{color: color, fontSize: fontSize,}">{{ text }}</h3>
      <div class="section-title-colors">
        <span class="section-title-accent big-width"></span>
        <span class="section-title-transparent"></span>
        <span class="section-title-primary small-width"></span>
        <span class="section-title-transparent"></span>
        <span class="section-title-accent small-width"></span>
        <span class="section-title-transparent"></span>
        <span class="section-title-accent big-width"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
    text: String,
    color: String,
    fontSize: String
})
</script>
