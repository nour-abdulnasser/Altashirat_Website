<template>
  <div class="rating-holder mt-9">
    <div class="rating-text d-flex justify-space-between align-center">
      <h4 class="rating-title">{{ title }}</h4>
      <p
        class="rating-persent"
        :style="`margin-left: calc(99% - ${width}); margin-right: calc(99% - ${width});`"
      >
        {{ width }}
      </p>
    </div>
    <div class="rating w-100 rounded-lg">
      <div class="rate rounded-lg" :style="{ width: width }"></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  width: String,
  text: String,
});

const rateStyle = computed(() => ({
  width: props.width,
  ...($i18n.locale === 'en' ? { left: '0' } : { right: '0' })
}))
</script>
