<template>
  <div class="employment-card position-relative">
    <v-card style="overflow: visible" class="rounded-sm py-3 pl-3">
      <div
        @mouseenter="isHover = true"
        @mouseleave="isHover = false"
        class="employment-image rounded-lg pa-2 position-relative border-sm d-flex justify-center align-center"
        :style="{ backgroundColor: isHover ? 'var(--primary-color)' : 'white' }"
      >
        <svg
          width="100%"
          height="100%"
          :viewBox="viewBox"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g :fill="isHover ? 'white' : 'var(--primary-color)'" fill-rule="nonzero" v-html="pathData"></g>
        </svg>
      </div>
      <h4 class="employment-card-title pr-3">{{ title }}</h4>
      <p class="employment-card-desc pr-3">{{ desc }}</p>
    </v-card>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  title: String,
  desc: String,
  color: String,
  pathData: String,
  viewBox: String
});

const isHover = ref(false)
</script>
