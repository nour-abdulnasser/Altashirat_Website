<template>
  <v-container fluid class="position-relative">
    <div class="w-100 ma-3 me-3 pe-6 d-flex  position-absolute position-md-fixed top-0 justify-end">
      <Route
        class="auth-home-button rounded-pill me-3 d-flex justify-center align-center text-white bg-accent"
        to="/"
      >
        <span class="text-white me-2 py-2">
          {{ $t("button.backToHome") }}
        </span>
        <span>
          <Image name="arrow-white-bg-primary" class="back-icon" />
        </span>
      </Route>
    </div>
    <slot />
  </v-container>
</template>

