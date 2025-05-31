<template>
  <div class="landing-card py-5 px-3 d-flex align-center flex-column ga-5">
    <div class="landing-card-image rounded-xl pa-5 d-flex justify-center align-center mb-2">
      <Image class="w-75 h-75" :name="name" alt="" />
    </div>
    <div class="landing-card-desc text-center">
      <p
        class="landing-card-desc-child rounded-pill d-flex justify-center align-center"
        :style="{ backgroundColor: color }"
      >
        {{ text }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});
</script>
