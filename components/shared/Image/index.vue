<template>
    <div class=" d-flex justify-center align-center">
      <img :class="$attrs.class" v-if="src" v-bind="$attrs" :src="src" />
    </div>
  </template>
    
  <script setup>
  import { ref, onMounted } from "vue";
  
  const props = defineProps({
    name: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
  });
  
  const src = ref("");
  
  onMounted(async () => {
    if (props.name && props.name.length) {
      try {
        const imageModule = await import(`~/public/assets/images/${props.name}.png`);
        src.value = imageModule.default;
      } catch (e) {
        console.error("Error in image path", e);
      }
    } else if (props.icon && props.icon.length) {
      try {
        const imageModule = await import(`~/public/assets/icons/${props.icon}.svg`);
        src.value = imageModule.default;
      } catch (e) {
        console.error("Error in image path", e);
      }
    } else if (props.url && props.url.length) {
      src.value = props.url;
    }
  });
  </script>
  