<template>
  <!-- TODO: List icons need mirroring for ltr -->
  <div>
    <v-footer
      class="w-100 footer text-text d-flex flex-column justify-center align-center"
    >
      <div class="w-100 bg-footer">
        <v-container>
          <v-row class="w-100 bg-footer">
            <!-- App installation column - 12 cols on xs, 6 on sm, 3 on md and up -->
            <v-col cols="12" sm="6" md="3" class="column__wrapper px-0">
              <div class="footer__title ps-3">
                <span class="ms-2    " :class="[pseudoClassDirection]">
                  {{ $t("footer.install.title") }}
                </span>
              </div>
              <div class="footer__content">
                <v-list>
                  <v-list-item>
                    <Image name="googleplay" class=" w-75 footer__image" />
                  </v-list-item>
                  <v-list-item>
                    <Image name="appstore" class="w-75 footer__image" />
                  </v-list-item>
                </v-list>
              </div>
            </v-col>

            <!-- Requests column - 12 cols on xs, 6 on sm, 3 on md and up -->
            <v-col cols="12" sm="6" md="3" class="column__wrapper px-0">
              <div class="footer__title ps-3">
                <span class="ms-2" :class="[pseudoClassDirection]">
                  {{ $t("footer.requests.title") }}
                </span>
              </div>
              <div class="footer__content w-100">
                <v-list class="w-100" dense>
                  <v-list-item class="pa-0 text-text">
                    <div class="list-item__inner d-flex align-center">
                      <div class="d-flex justify-center align-center mr-2 footer__list-icon ">
                        <Image icon="arrow-secondary" class="footer__list-icon" />
                      </div>
                      <span class="ms-3 pb-0">{{
                        $t("footer.requests.tourism")
                      }}</span>
                    </div>
                  </v-list-item>
                  <v-list-item class="pa-0 text-text">
                    <div class="list-item__inner d-flex align-center">
                      <div class="d-flex justify-center align-center mr-2 footer__list-icon ">
                        <Image icon="arrow-secondary" class="footer__list-icon" />
                      </div>
                      <span class="ms-3 pb-0">{{
                        $t("footer.requests.employment")
                      }}</span>
                    </div>
                  </v-list-item>
                  <v-list-item class="pa-0">
                    <!-- <Route to="/requests"> -->
                    <Route to="/">
                      <div class="list-item__inner d-flex align-center">
                        <div class="d-flex justify-center align-center mr-2 footer__list-icon ">
                          <Image icon="arrow-secondary" class="footer__list-icon" />
                        </div>
                        <span class="ms-3">{{
                          $t("footer.requests.show")
                        }}</span>
                      </div>
                    </Route>
                  </v-list-item>
                </v-list>
              </div>
            </v-col>

            <!-- Info column - 12 cols on xs, 6 on sm, 3 on md and up -->
            <v-col cols="12" sm="6" md="3" class="column__wrapper">
              <div class="footer__title ps-3">
                <span class="ms-2" :class="[pseudoClassDirection]">
                  {{ $t("footer.info.title") }}
                </span>
              </div>
              <div class="footer__content w-100">
                <v-list class="w-100" dense>
                  <v-list-item class="pa-0 text-text">
                    <div class="list-item__inner d-flex align-center">
                      <div class="d-flex justify-center align-center mr-2 footer__list-icon ">
                        <Image icon="arrow-secondary" class="footer__list-icon" />
                      </div>
                      <span class="ms-3 pb-0">{{ $t("footer.info.about") }}</span>
                    </div>
                  </v-list-item>
                  <v-list-item class="pa-0 text-text">
                    <div class="list-item__inner d-flex align-center">
                      <div class="d-flex justify-center align-center mr-2 footer__list-icon ">
                        <Image icon="arrow-secondary" class="footer__list-icon" />
                      </div>
                      <span class="ms-3 pb-0">{{ $t("footer.info.contact") }}</span>
                    </div>
                  </v-list-item>
                  <v-list-item class="pa-0 text-text">
                    <div class="list-item__inner d-flex align-center">
                      <div class="d-flex justify-center align-center mr-2 footer__list-icon ">
                        <Image icon="arrow-secondary" class="footer__list-icon" />
                      </div>
                      <span class="ms-3 pb-0">{{
                        $t("footer.info.termsAndConditions")
                      }}</span>
                    </div>
                  </v-list-item>
                  <v-list-item class="pa-0 text-text">
                    <div class="list-item__inner d-flex align-center">
                      <div class="d-flex justify-center align-center mr-2 footer__list-icon ">
                        <Image icon="arrow-secondary" class="footer__list-icon" />
                      </div>
                      <span class="ms-3 pb-0">{{
                        $t("footer.info.privacyPolicy")
                      }}</span>
                    </div>
                  </v-list-item>
                </v-list>
              </div>
            </v-col>

            <!-- Socials column - 12 cols on xs, 6 on sm, 3 on md and up -->
            <v-col cols="12" sm="6" md="3" class="column__wrapper">
              <div class="footer__title ps-3">
                <span class="ms-2     " :class="[pseudoClassDirection]">
                  {{ $t("footer.socials.title") }}
                </span>
              </div>
              <div class="footer__content w-100">
                <v-list class="w-100" dense>
                  <v-list-item class="pa-0 text-text">
                    <div class="list-item__inner d-flex align-center">
                      <div class="d-flex justify-center align-center mr-2 footer__list-icon ">
                        <Image icon="arrow-secondary" class="footer__list-icon" />
                      </div>
                      <div class="d-flex ms-3 justify-center align-center mr-2">
                        <Image icon="twitter" />
                      </div>
                      <span class="ms-3 pb-0">{{
                        $t("footer.socials.twitter")
                      }}</span>
                    </div>
                  </v-list-item>
                  <v-list-item class="pa-0 text-text">
                    <div class="list-item__inner d-flex align-center">
                      <div class="d-flex justify-center align-center mr-2 footer__list-icon ">
                        <Image icon="arrow-secondary" class="footer__list-icon" />
                      </div>
                      <div class="d-flex ms-3 justify-center align-center mr-2">
                        <Image icon="facebook" />
                      </div>
                      <span class="ms-3 pb-0">{{
                        $t("footer.socials.facebook")
                      }}</span>
                    </div>
                  </v-list-item>
                  <v-list-item class="pa-0 text-text">
                    <div class="list-item__inner d-flex align-center">
                      <div class="d-flex justify-center align-center mr-2 footer__list-icon ">
                        <Image icon="arrow-secondary" class="footer__list-icon" />
                      </div>
                      <div class="d-flex ms-3 justify-center align-center mr-2">
                        <Image icon="instagram" />
                      </div>
                      <span class="ms-3 pb-0">{{
                        $t("footer.socials.instagram")
                      }}</span>
                    </div>
                  </v-list-item>
                  <v-list-item class="pa-0 text-text">
                    <div class="list-item__inner d-flex align-center">
                      <div class="d-flex justify-center align-center mr-2 footer__list-icon ">
                        <Image icon="arrow-secondary" class="footer__list-icon" />
                      </div>
                      <div class="d-flex ms-3 justify-center align-center mr-2">
                        <Image icon="snapchat" />
                      </div>
                      <span class="ms-3 pb-0">{{
                        $t("footer.socials.snapchat")
                      }}</span>
                    </div>
                  </v-list-item>
                </v-list>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div class="bg-secondary w-100 pa-3 footer__copyright text-center">
        <span class="footer__copyright">{{ $t("footer.copyright") }}</span>
      </div>
    </v-footer>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useDisplay } from "vuetify";
import { computed } from "vue";
// Access display properties if needed for additional customization
const { xs, sm, md } = useDisplay();

const appLocaleStore = useAppLocaleStore();
const { appLocale } = storeToRefs(appLocaleStore);

const pseudoClassDirection = computed(() => (appLocale.value === "ar" ? 'pseudo-rtl' : 'pseudo-ltr'));

</script>

<style lang="scss" scoped>
</style>