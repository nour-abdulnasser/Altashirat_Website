<template>
  <div>
    <NuxtLink :to="localizedPath" class="locale__router text-text " :class="$attrs.class" v-bind="$attrs">
      <slot />
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  to: { type: [String, Object], default: "" },
});

// Using the localePath composable from nuxt/i18n
const localePath = useLocalePath();
const localizedPath = computed(() => localePath(props.to));
</script>

<style lang="scss" scoped>
</style>