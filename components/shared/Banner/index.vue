<template>
    <div class="banner position-relative">
        <Image class="banner-image" :name="name" alt="" />
        <h2 class="banner-title text-center position-relative rounded-pill py-3 px-6">{{ title }}</h2>
    </div>
</template>

<script setup>
defineProps({
    name: String,
    title: String,
})
</script>