<template>
  <div>
    <div class="about">
      <Banner name="about-us" :title="$t('navbar.about')" />
    </div>
    <div class="banner"></div>
    <v-container class="main-section px-10 px-sm-6 px-xs-4">
      <v-row class="px-4 d-flex flex-column align-center">
        <v-col cols="12" md="11" lg="10">
          <div
            class="about1 line-spacing-2 pb-6 text-text"
            v-html="settings.about1"
          ></div>
        </v-col>
      </v-row>
      <v-row class="d-flex my-10 my-sm-6 justify-space-evenly align-center">
        <v-col
          cols="12"
          sm="6"
          md="5"
          lg="4"
          class="checklist d-flex justify-center align-center"
        >
          <Image class="w-100 h-100" name="about1" />
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="6"
          lg="5"
          class="checklist d-flex justify-start align-center mt-6 mt-sm-0"
        >
          <v-list>
            <v-list-item>
              <template v-slot:prepend>
                <Image icon="green-tick" />
              </template>
              <template v-slot:default>
                <p class="ms-3">{{ $t("services.touristVisa") }}</p>
              </template>
            </v-list-item>
            <v-list-item>
              <template v-slot:prepend>
                <Image icon="blue-tick" />
              </template>
              <template v-slot:default>
                <p class="ms-3">{{ $t("services.employmentVisa") }}</p>
              </template>
            </v-list-item>
            <v-list-item>
              <template v-slot:prepend>
                <Image icon="green-tick" />
              </template>
              <template v-slot:default>
                <p class="ms-3">{{ $t("services.embassyServices") }}</p>
              </template>
            </v-list-item>
            <v-list-item>
              <template v-slot:prepend>
                <Image icon="blue-tick" />
              </template>
              <template v-slot:default>
                <p class="ms-3">{{ $t("services.consularServices") }}</p>
              </template>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
      <v-row
        class="d-flex py-10 py-sm-6 justify-space-evenly align-center flex-column-reverse flex-md-row"
      >
        <v-col
          cols="12"
          md="6"
          lg="5"
          class="bg-bg-input d-flex justify-center align-center mt-6 mt-md-0"
        >
          <div
            class="about2 line-spacing-2 py-4 px-2 text-text"
            v-html="settings.about2"
          ></div>
        </v-col>
        <v-col
          cols="12"
          md="5"
          lg="4"
          class="d-flex justify-center align-start ms-md-4"
        >
          <Image class="w-100 h-100 pb-5" name="about2" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
  
  <script setup>
useSeoMeta({
  title: "About AlTahsirat",
});
import { storeToRefs } from "pinia";

const settingsStore = useSettingsStore();
const { settings } = storeToRefs(settingsStore);
</script>
  



  
