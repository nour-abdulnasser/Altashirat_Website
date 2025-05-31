<template>
  <div class="home-button mt-3">
    <button
      class="home-button-content py-3 px-5 rounded-pill d-flex justify-space-between align-center"
      :style="{ backgroundColor: isHovered ? hoverColor : color}"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <p class="home-button-desc" :style="{ color: isHovered ? hoverTextColor : textColor }">{{ text }}</p>
      <v-icon
        class="home-button-icon rounded-circle pa-3"
        :style="{ color: isHovered ? hoverColor : color, backgroundColor: isHovered? hoverBgColor : bgColor }"
        >{{ icon }}</v-icon
      >
    </button>
  </div>
</template>

<script setup>
defineProps({
  text: String,
  color: String,
  bgColor: String,
  textColor: String,
  icon: String,
  font: String,
  hoverColor: String,
  hoverTextColor: String,
  hoverBgColor: String
});

const isHovered = ref(false)
</script>
