<template>
  <div class="header__section">
    <!-- Use v-if with display breakpoints instead of d-none classes -->
    <template v-if="display.mobile.value">
      <div class="header--small">
        <!-- Top navigation bar -->
        <v-app-bar elevation="0" class="header__top-nav px-16">
          <template v-slot:prepend>
            <!-- Use drawer store to toggle drawer -->
            <v-app-bar-nav-icon
              @click="drawerStore.toggleDrawer()"
              class="d-flex menu__icon"
            ></v-app-bar-nav-icon>
          </template>

          <template v-slot:append>
            <div>
              <LocaleSelector
                hide-details
                v-model="appLocale"
                :onLocaleSelected="handleLocaleSelector"
              />
            </div>
          </template>
        </v-app-bar>
      </div>
    </template>

    <template v-if="!display.mobile.value">
      <div class="header--wide">
        <!-- Top navigation bar -->
        <v-app-bar class="header__top-nav mb-4 position-relative" flat>
          <!-- left -->
          <template v-slot:prepend>
            <div class="prepend-container">
              <div
                class="prepend-wrapper justify-end"
                :class="{ 'rtl-direction': isRTL }"
              >
                <Route to="/order-visa">
                  <Button
                    :text="$t('navbar.orderTourismVisa')"
                    class="button--primary-filled me-3"
                    icon="tourism"
                  />
                </Route>
                <Button
                  :text="$t('navbar.showVisa')"
                  class="button--secondary-filled"
                  icon="show-visa"
                />
              </div>
            </div>
          </template>

          <!-- Logo in the center -->

          <!-- right -->
          <template v-slot:append>
            <div class="append-container">
              <div
                class="append-wrapper justify-start align-center"
                :class="{ 'rtl-direction': isRTL }"
              >
                <Route v-if="authToken && isAuth" to="/profile">
                  <Button
                    :text="$t('navbar.personalProfile')"
                    class="bg-white"
                    icon="personal-profile"
                  />
                </Route>
                <Route v-else-if="!authToken || !isAuth" to="/login">
                  <Button
                    :text="$t('button.login')"
                    class="bg-white"
                    icon="personal-profile"
                  />
                </Route>

                <LocaleSelector
                  hide-details
                  class="header__locale-select mt-1"
                  v-model="appLocale"
                  :onLocaleSelected="handleLocaleSelector"
                />
              </div>
            </div>
          </template>
        </v-app-bar>
        <!-- Bottom Navigation -->

        <v-app-bar
          :elevation="0"
          class="header__main-nav my-3"
          style="top: 60px"
        >
          <template v-slot:image>
            <div class="center-logo-space d-flex justify-center align-center">
              <div class="logo__wrapper bg-secondary rounded-circle pa-3">
                <Image name="logo" class="w-100 h-100" />
              </div>
            </div>
          </template>
          <template v-slot:default>
            <div class="d-flex justify-space-evenly align-center w-100">
              <Route to="/">{{ $t("navbar.homepage") }}</Route>
              <Route class="text-center" to="/about">{{
                $t("navbar.about")
              }}</Route>
              <Route to="/contact-us">{{ $t("navbar.contactUs") }}</Route>
              <Route to="/terms-and-conditions">
                {{ $t("navbar.termsAndConditions") }}
              </Route>
              <Route to="/privacy-policy">
                {{ $t("navbar.privacyPolicy") }}
              </Route>
            </div>
          </template>
        </v-app-bar>
      </div>
    </template>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAppLocaleStore } from "@/stores/appLocale";
import { useDrawerStore } from "@/stores/drawer";
import { computed } from "vue";
import { useDisplay } from "vuetify";

const appLocaleStore = useAppLocaleStore();
const { appLocale } = storeToRefs(appLocaleStore);
const { setAppLocale } = appLocaleStore;

const drawerStore = useDrawerStore();

const authStore = useAuthStore();
const { isAuth } = storeToRefs(authStore);

const authCookie = useCookie("auth-token");
const authToken = authCookie.value;

const display = useDisplay();

const isRTL = computed(() => {
  return appLocale.value === "ar";
});

const handleLocaleSelector = (value) => {
  setAppLocale(value);
  // window.location.reload();
};
</script>

<style lang="scss" scoped></style>
