<template>
  <div class="asking-visa position-relative pa-15">
    <v-container>
      <div
        class="asking-visa-content rounded-pill d-flex justify-center align-center flex-column text-center"
      >
        <h3 class="asking-title">
          {{ $t("homepage.altaishirat.askingVisa.title") }}
        </h3>
        <p class="asking-desc my-5 text-center">
          {{ $t("homepage.altaishirat.askingVisa.desc") }}
        </p>
        <HomeButton
          :text="$t('homepage.altaishirat.askingVisa.button')"
          textColor="white"
          bgColor="white"
          color="var(--text-color)"
          :icon="$t('homepage.altaishirat.askingVisa.icon')"
          hoverColor="var(--text-color)"
          hoverTextColor="white"
          hoverBgColor="white"
          class="asking-bottom"
        />
      </div>
    </v-container>
  </div>
</template>
