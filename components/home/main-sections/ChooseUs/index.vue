<template>
  <div class="choose-us my-10">
    <v-container>
      <div class="choose-us-content pa-4">
        <v-row>
          <v-col cols="12" sm="12" md="8" lg="8" xl="8">
            <div class="choose-us-image">
              <Image class="w-100 h-100" name="choose-us" />
            </div>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="4"
            lg="4"
            xl="4"
            class="d-flex justify-center align-center flex-column"
          >
            <HomeButton
              class="choose-us-button"
              :text="$t('homepage.chooseUs.button.one')"
              color="white"
              textColor="var(--primary-color)"
              bgColor="var(--primary-color)"
              :icon="$t('homepage.chooseUs.icon')"
              hoverColor="var(--primary-color)"
              hoverTextColor="White"
              hoverBgColor="white"
              @click="navigateToOrderVisa"
            />
            <HomeButton
              class="choose-us-button"
              :text="$t('homepage.chooseUs.button.two')"
              color="white"
              textColor="var(--primary-color)"
              bgColor="var(--primary-color)"
              :icon="$t('homepage.chooseUs.icon')"
              hoverColor="var(--primary-color)"
              hoverTextColor="White"
              hoverBgColor="white"
            />
            <HomeButton
              class="choose-us-button"
              :text="$t('homepage.chooseUs.button.three')"
              color="white"
              textColor="var(--primary-color)"
              bgColor="var(--primary-color)"
              :icon="$t('homepage.chooseUs.icon')"
              hoverColor="var(--primary-color)"
              hoverTextColor="White"
              hoverBgColor="white"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="5" lg="5" xl="5">
            <h3 class="choose-us-title">
              {{ $t("homepage.chooseUs.title.top") }}
              <br />
              {{ $t("homepage.chooseUs.title.bottom") }}
            </h3>
            <ul class="choose-us-list mt-5">
              <li class="d-flex align-center ga-3 choose-us-item mt-3">
                <SideIcon
                  :icon="$t('homepage.chooseUs.icon')"
                  color="var(--primary-color)"
                />
                <span class="choose-us-desc">{{
                  $t("homepage.chooseUs.text.one")
                }}</span>
              </li>
              <li class="d-flex align-center ga-3 choose-us-item mt-3">
                <SideIcon
                  :icon="$t('homepage.chooseUs.icon')"
                  color="var(--accent-color)"
                />
                <span class="choose-us-desc">{{
                  $t("homepage.chooseUs.text.two")
                }}</span>
              </li>
              <li class="d-flex align-center ga-3 choose-us-item mt-3">
                <SideIcon
                  :icon="$t('homepage.chooseUs.icon')"
                  color="var(--primary-color)"
                />
                <span class="choose-us-desc">{{
                  $t("homepage.chooseUs.text.three")
                }}</span>
              </li>
              <li class="d-flex align-center ga-3 choose-us-item mt-3">
                <SideIcon
                  :icon="$t('homepage.chooseUs.icon')"
                  color="var(--accent-color)"
                />
                <span class="choose-us-desc">{{
                  $t("homepage.chooseUs.text.four")
                }}</span>
              </li>
            </ul>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="7"
            lg="7"
            xl="7"
            class="d-flex justify-center align-center flex-column ga-2"
          >
            <Rating :title="$t('homepage.chooseUs.rates.one')" width="95%" />
            <Rating :title="$t('homepage.chooseUs.rates.two')" width="97%" />
            <Rating :title="$t('homepage.chooseUs.rates.three')" width="99%" />
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script setup>
const router = useRouter();
const navigateToOrderVisa = () => {
  router.push("/order-visa");
};
</script>
