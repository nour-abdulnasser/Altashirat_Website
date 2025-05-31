<template>
  <v-app>
    <Header />
    <Drawer />
    <!-- Drawer added in default.vue in case of responsivity. default view doesnt have drawer in full view. -->
    <v-main class="py-md-13">
      <div class="content ">
        <slot />
      </div>
    </v-main>
    <Footer />
  </v-app>
</template>

<script setup>
</script>

<style lang="scss" scoped>
</style>