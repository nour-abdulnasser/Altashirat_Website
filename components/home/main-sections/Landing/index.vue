<template>
  <div class="home-landing position-relative pa-15">
    <v-container>
      <div class="landing-content text-center">
        <h2 class="landing-title mb-10">
          <span class="top rounded-pill px-3 py-2">{{
            $t("homepage.landing.title.top")
          }}</span>
          <br />
          <span class="bottom d-block mt-2">{{
            $t("homepage.landing.title.bottom")
          }}</span>
        </h2>
      </div>
      <div class="landing-cards d-flex justify-center align-center flex-wrap">
        <LandingCard name="landing-world" :text="$t('homepage.landing.offerVise')" color="var(--primary-color)"/>
        <LandingCard name="landing-bag" :text="$t('homepage.landing.employmentVisa')" color="var(--accent-color)"/>
        <LandingCard name="landing-user" :text="$t('homepage.landing.touristVisa')" color="var(--primary-color)"/>
      </div>
      <div class="landing-plane position-absolute h-100">
        <Image class="w-100 h-100" name="landing-plane" />
      </div>
    </v-container>
  </div>
</template>
