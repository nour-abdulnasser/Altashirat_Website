<template>
  <div class="terms">
    <Banner name="terms" :title="$t('navbar.termsAndConditions')" />
    <v-container>
      <v-row
        class="d-flex py-10 py-sm-6 justify-space-evenly align-center flex-column-reverse flex-md-row"
      >
        <v-col
          cols="12"
          class="d-flex justify-center align-center mt-6 mt-md-0"
        >
          <div
            class="terms-text line-spacing-2 py-4 px-2 text-text"
            v-html="settings.terms_and_conditions"
          ></div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script setup>
import { storeToRefs } from "pinia";
useSeoMeta({
  title: "Terms",
});
const settingsStore = useSettingsStore();
const { settings } = storeToRefs(settingsStore);
</script>
