<template>
  <div class="services">
    <v-row>
      <v-col cols="12" sm="12" md="4" lg="4" xl="4">
        <div class="services-image w-100 h-100">
          <Image class="w-100 h-100" name="services-man" />
        </div>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="4" xl="4">
        <SectionTitle
          :text="$t('homepage.services.title')"
          color="white"
          fontSize="40px"
          class="mx-5 services-title"
        />
        <p class="services-desc mt-5 mx-5">
          {{ $t("homepage.services.desc") }}
        </p>
        <ul class="services-list mt-5 mx-5">
          <li class="d-flex align-center ga-3 services-item mt-3">
            <Image name="arrow-blue" :style="imageRotate" />
            <span class="services-desc">{{
              $t("homepage.services.service.one")
            }}</span>
          </li>
          <li class="d-flex align-center ga-3 services-item mt-3">
            <Image name="arrow-green" :style="imageRotate" />
            <span class="services-desc">{{
              $t("homepage.services.service.two")
            }}</span>
          </li>
          <li class="d-flex align-center ga-3 services-item mt-3">
            <Image name="arrow-blue" :style="imageRotate" />
            <span class="services-desc">{{
              $t("homepage.services.service.three")
            }}</span>
          </li>
          <li class="d-flex align-center ga-3 services-item mt-3">
            <Image name="arrow-green" :style="imageRotate" />
            <span class="services-desc">{{
              $t("homepage.services.service.four")
            }}</span>
          </li>
          <li class="d-flex align-center ga-3 services-item mt-3">
            <Image name="arrow-blue" :style="imageRotate" />
            <span class="services-desc">{{
              $t("homepage.services.service.five")
            }}</span>
          </li>
        </ul>
      </v-col>
      <v-col class="services-plane" cols="12" sm="6" md="4" lg="4" xl="4">
        <div class="services-image w-100 h-100">
          <Image class="w-100 h-100" name="services-plane" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
const { locale } = useI18n()

const imageRotate = computed(() => ({
  transform: locale.value === 'en' ? "rotate(90deg)" : "rotate(0deg)"
}))
</script>