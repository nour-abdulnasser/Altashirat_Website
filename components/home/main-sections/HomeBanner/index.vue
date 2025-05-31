<template>
  <div class="home-banner text-center">
    <v-container>
      <div class="home-banner-content">
        <h2
          class="home-banner-title rounded-pill py-3 pl-7 pr-3 d-flex justify-center align-center"
        >
          <div class="home-banner-fill">
            {{ $t("homepage.heroPanal.title.partOne") }}
          </div>
          <div class="home-banner-empty"></div>
          <div class="home-banner-fill">
            {{ $t("homepage.heroPanal.title.partTwo") }}
          </div>
        </h2>
        <div class="home-banner-image">
          <Image class="w-100 h-100" name="home-banner" />
        </div>
        <p class="home-banner-info mt-3">{{ $t("homepage.heroPanal.desc") }}</p>
      </div>
    </v-container>
  </div>
</template>
