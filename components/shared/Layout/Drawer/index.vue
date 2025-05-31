<template>
  <v-navigation-drawer
    v-model="drawerStore.isOpen"
    app
    :temporary="!isProfileSection"
    :permanent="isProfileSection && !mobile"
    class="drawer h-screen position-fixed"
    :class="{ 'not-wide__profile': isProfileSection }"
  >
    <!-- Profile section -->
    <v-list-item v-if="isAuth" class="w-100 pa-2">
      <template v-slot:default>
        <div class="user-profile-card  ">
          <div
            class="user-profile-card__picture d-flex justify-space-between align-center py-1"
          >
            <div class="profile-picture__wrapper">
              <v-avatar
                size="48"
                class="profile__avatar border border-2 border-white overflow-hidden"
              >
                <v-img :src="userAvatar" cover />
              </v-avatar>
              <div class="edit-badge">
                <Route to="/profile">
                  <Image icon="edit-profile" />
                </Route>
              </div>
            </div>
            <div class="w-100 d-flex flex-column align-start text-text">
              <div class="">{{ $t("drawer.hello") }}:</div>
              <div class="font-weight-bold">{{ userName }}</div>
            </div>
          </div>
        </div>
      </template>
    </v-list-item>

    <!-- Main navigation items - only shown in drawer on mobile screens -->
    <template v-if="mobile">
      <v-list nav dense>
        <v-list-item
          v-for="item in mainNavItems"
          :key="item.title"
          :class="{ 'active-link': route.path === item.route }"
        >
          <Route :to="item.route">
            <div class="d-flex align-center">
              <div
                v-if="item.icon"
                class="drawer-icon__wrapper d-flex justify-center px-1 me-2"
              >
                <v-icon class="text-text">{{ item.icon }}</v-icon>
              </div>

              <div>
                <v-list-item-title class="text-text">{{
                  $t(item.titleKey)
                }}</v-list-item-title>
              </div>
            </div>
          </Route>
        </v-list-item>
      </v-list>
    </template>

    <!-- On larger screens, show items directly -->
    <template v-if="!mobile && isAuth">
      <v-list nav dense>
        <v-list-item :class="{ 'active-link': isRouteActive('/profile') }">
          <Route to="/profile">
            <div class="d-flex justify-start align-center">
              <span
                class="me-3 drawer-icon__wrapper d-flex align-center px-1 me-2"
              >
                <!-- <Image icon="drawer-profile" /> -->
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m10.66 17.89 1.624 1.623-2.111.487.487-2.11zm5.889-6.302 2.032 2.032-5.588 5.588-2.032-2.032 5.588-5.588zM8.376 7.904c2.788 0 5.218 1.609 6.532 4.312l-4.71 4.71-.017.02-.008.01a.333.333 0 0 0-.02.029l-.012.018-.006.013a.315.315 0 0 0-.009.018l-.01.024-.005.018-.002.009-.004.01-.349 1.514c-.458.049-.919.073-1.38.074-3.331 0-6.718-1.598-7.543-2.014.044-2.47.83-4.7 2.225-6.3 1.385-1.59 3.274-2.465 5.318-2.465zm8.685 3.175a1.437 1.437 0 0 1 2.032 2.033zM8.376 7.186a3.593 3.593 0 1 0 0-7.186 3.593 3.593 0 0 0 0 7.186z"
                    fill-rule="evenodd"
                  />
                </svg>
              </span>
              <span>{{ $t("drawer.personalProfile") }}</span>
            </div>
          </Route>
        </v-list-item>

        <v-list-item
          :class="{ 'active-link': isRouteActive('/change-password') }"
        >
          <Route to="/change-password">
            <div class="d-flex justify-start align-center">
              <span
                class="me-3 drawer-icon__wrapper d-flex align-center px-1 me-2"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.679 10.12c.26-.26.68-.26.94 0l2.186 2.186c.26.26.26.68 0 .94l-4.193 4.193a.754.754 0 0 1-.3.173l-2.98.793a.711.711 0 0 1-.166.02.66.66 0 0 1-.474-.193.669.669 0 0 1-.173-.64l.793-2.98a.596.596 0 0 1 .174-.3zM19.332.832c.366 0 .666.294.666.667v9.586l-1.673-1.673c-.626-.627-1.726-.627-2.353 0l-2.853 2.846H.667A.669.669 0 0 1 0 11.592V1.5C0 1.127.3.833.667.833zm-4 3.713c-1.1 0-2 .894-2 2 0 1.1.9 2 2 2s2-.9 2-2c0-1.106-.9-2-2-2zm-5.333 0c-1.1 0-2 .894-2 2 0 1.1.9 2 2 2s2-.9 2-2c0-1.106-.9-2-2-2zm-5.333 0c-1.1 0-2 .894-2 2 0 1.1.9 2 2 2s2-.9 2-2c0-1.106-.9-2-2-2zm0 1.334a.667.667 0 1 1 0 1.333.667.667 0 0 1 0-1.333zm10.666 0a.667.667 0 1 1 0 1.333.667.667 0 0 1 0-1.333zM10 5.88a.667.667 0 1 1 0 1.333.667.667 0 0 1 0-1.333z"
                    fill-rule="evenodd"
                  />
                </svg>
              </span>
              <span>{{ $t("drawer.editPassword") }}</span>
            </div>
          </Route>
        </v-list-item>

        <v-list-item :class="{ 'active-link': isRouteActive('/requests') }">
          <Route to="/requests">
            <div class="d-flex justify-start align-center">
              <span
                class="me-3 drawer-icon__wrapper d-flex align-center px-1 me-2"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.298 0H.586A.586.586 0 0 0 0 .586v18.828c0 .324.262.586.586.586h13.712a.586.586 0 0 0 .586-.586V.586A.586.586 0 0 0 14.298 0zM6.151 11.47l-1.78 1.78a.586.586 0 0 1-.828 0l-.839-.839a.586.586 0 1 1 .829-.828l.424.424 1.366-1.365a.586.586 0 1 1 .828.828zm0-3.554-1.78 1.78a.586.586 0 0 1-.828 0l-.839-.84a.586.586 0 1 1 .829-.828l.424.424 1.366-1.365a.586.586 0 1 1 .828.829zm0-3.555-1.78 1.78a.586.586 0 0 1-.828 0l-.839-.84a.586.586 0 1 1 .829-.828l.424.425 1.366-1.366a.586.586 0 1 1 .828.829zm5.585 12.052H8.015a.586.586 0 0 1 0-1.172h3.72a.586.586 0 0 1 0 1.172zm0-3.69H8.015a.586.586 0 0 1 0-1.173h3.72a.586.586 0 0 1 0 1.172zm0-3.556H8.015a.586.586 0 0 1 0-1.172h3.72a.586.586 0 0 1 0 1.172zm0-3.555H8.015a.586.586 0 0 1 0-1.171h3.72a.586.586 0 0 1 0 1.171zM20 1.99A1.991 1.991 0 0 0 18.011 0a1.991 1.991 0 0 0-1.988 1.989v1.718H20V1.99zm-3.943 14.17a.586.586 0 0 0 .019.443l1.403 3.056a.586.586 0 0 0 1.065 0l1.403-3.056c.064-.14.07-.3.018-.444l-.36-.994h-3.187l-.36.994zM20 13.405V4.879h-3.977v8.527c0 .323.262.586.585.586h2.806a.586.586 0 0 0 .586-.586z"
                    fill-rule="evenodd"
                  />
                </svg>
              </span>
              <span>{{ $t("drawer.requests") }}</span>
            </div>
          </Route>
        </v-list-item>

        <v-list-item link @click="handleLogout">
          <template v-slot:default>
            <div class="d-flex justify-start align-center">
              <span
                class="me-3 drawer-icon__wrapper d-flex align-center px-1 me-2"
              >
                <Image icon="logout" />
              </span>
              <span class="text-text">{{ $t("drawer.logout") }}</span>
            </div>
          </template>
        </v-list-item>
      </v-list>
    </template>

    <!-- On mobile screens, use a dropdown/expansion panel -->
    <template v-else-if="isAuth && mobile">
      <v-expansion-panels flat>
        <v-expansion-panel>
          <v-expansion-panel-title>
            <div class="d-flex align-center text-text">
              <span class="me-3">
                <Image icon="drawer-profile" />
              </span>
              <span>{{ $t("drawer.profileSettings") }}</span>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-list nav dense class="ma-0 pa-0">
              <v-list-item
                :class="{ 'active-link': isRouteActive('/profile') }"
              >
                <Route to="/profile">
                  <div class="d-flex align-center">
                    <div
                      class="drawer-icon__wrapper d-flex justify-center px-1 me-2"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="m10.66 17.89 1.624 1.623-2.111.487.487-2.11zm5.889-6.302 2.032 2.032-5.588 5.588-2.032-2.032 5.588-5.588zM8.376 7.904c2.788 0 5.218 1.609 6.532 4.312l-4.71 4.71-.017.02-.008.01a.333.333 0 0 0-.02.029l-.012.018-.006.013a.315.315 0 0 0-.009.018l-.01.024-.005.018-.002.009-.004.01-.349 1.514c-.458.049-.919.073-1.38.074-3.331 0-6.718-1.598-7.543-2.014.044-2.47.83-4.7 2.225-6.3 1.385-1.59 3.274-2.465 5.318-2.465zm8.685 3.175a1.437 1.437 0 0 1 2.032 2.033zM8.376 7.186a3.593 3.593 0 1 0 0-7.186 3.593 3.593 0 0 0 0 7.186z"
                          fill-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <v-list-item-title class="text-text">{{
                        $t("drawer.personalProfile")
                      }}</v-list-item-title>
                    </div>
                  </div>
                </Route>
              </v-list-item>

              <v-list-item
                :class="{ 'active-link': isRouteActive('/change-password') }"
              >
                <Route to="/change-password">
                  <div class="d-flex align-center">
                    <div
                      class="drawer-icon__wrapper d-flex justify-center px-1 me-2"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.679 10.12c.26-.26.68-.26.94 0l2.186 2.186c.26.26.26.68 0 .94l-4.193 4.193a.754.754 0 0 1-.3.173l-2.98.793a.711.711 0 0 1-.166.02.66.66 0 0 1-.474-.193.669.669 0 0 1-.173-.64l.793-2.98a.596.596 0 0 1 .174-.3zM19.332.832c.366 0 .666.294.666.667v9.586l-1.673-1.673c-.626-.627-1.726-.627-2.353 0l-2.853 2.846H.667A.669.669 0 0 1 0 11.592V1.5C0 1.127.3.833.667.833zm-4 3.713c-1.1 0-2 .894-2 2 0 1.1.9 2 2 2s2-.9 2-2c0-1.106-.9-2-2-2zm-5.333 0c-1.1 0-2 .894-2 2 0 1.1.9 2 2 2s2-.9 2-2c0-1.106-.9-2-2-2zm-5.333 0c-1.1 0-2 .894-2 2 0 1.1.9 2 2 2s2-.9 2-2c0-1.106-.9-2-2-2zm0 1.334a.667.667 0 1 1 0 1.333.667.667 0 0 1 0-1.333zm10.666 0a.667.667 0 1 1 0 1.333.667.667 0 0 1 0-1.333zM10 5.88a.667.667 0 1 1 0 1.333.667.667 0 0 1 0-1.333z"
                          fill-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <v-list-item-title class="text-text">{{
                        $t("drawer.editPassword")
                      }}</v-list-item-title>
                    </div>
                  </div>
                </Route>
              </v-list-item>

              <v-list-item :class="{ 'active-link': isRouteActive('/requests') }">
                <Route to="/requests">
                  <div class="d-flex align-center">
                    <div
                      class="drawer-icon__wrapper d-flex justify-center px-1 me-2"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.298 0H.586A.586.586 0 0 0 0 .586v18.828c0 .324.262.586.586.586h13.712a.586.586 0 0 0 .586-.586V.586A.586.586 0 0 0 14.298 0zM6.151 11.47l-1.78 1.78a.586.586 0 0 1-.828 0l-.839-.839a.586.586 0 1 1 .829-.828l.424.424 1.366-1.365a.586.586 0 1 1 .828.828zm0-3.554-1.78 1.78a.586.586 0 0 1-.828 0l-.839-.84a.586.586 0 1 1 .829-.828l.424.424 1.366-1.365a.586.586 0 1 1 .828.829zm0-3.555-1.78 1.78a.586.586 0 0 1-.828 0l-.839-.84a.586.586 0 1 1 .829-.828l.424.425 1.366-1.366a.586.586 0 1 1 .828.829zm5.585 12.052H8.015a.586.586 0 0 1 0-1.172h3.72a.586.586 0 0 1 0 1.172zm0-3.69H8.015a.586.586 0 0 1 0-1.173h3.72a.586.586 0 0 1 0 1.172zm0-3.556H8.015a.586.586 0 0 1 0-1.172h3.72a.586.586 0 0 1 0 1.172zm0-3.555H8.015a.586.586 0 0 1 0-1.171h3.72a.586.586 0 0 1 0 1.171zM20 1.99A1.991 1.991 0 0 0 18.011 0a1.991 1.991 0 0 0-1.988 1.989v1.718H20V1.99zm-3.943 14.17a.586.586 0 0 0 .019.443l1.403 3.056a.586.586 0 0 0 1.065 0l1.403-3.056c.064-.14.07-.3.018-.444l-.36-.994h-3.187l-.36.994zM20 13.405V4.879h-3.977v8.527c0 .323.262.586.585.586h2.806a.586.586 0 0 0 .586-.586z"
                          fill-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <v-list-item-title class="text-text">{{
                        $t("drawer.requests")
                      }}</v-list-item-title>
                    </div>
                  </div>
                </Route>
              </v-list-item>

              <v-list-item link @click="handleLogout">
                <div class="d-flex align-center">
                  <div
                    class="drawer-icon__wrapper d-flex justify-center px-1 me-2"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.167 0c.461 0 .833.373.833.833v5a.833.833 0 1 1-1.666 0V1.667H6.512l2.894.868c.353.106.595.43.595.798v13.334h3.333V12.5a.833.833 0 1 1 1.666 0v5c0 .46-.372.833-.833.833h-4.166v.834a.834.834 0 0 1-.997.816L.67 18.317A.833.833 0 0 1 0 17.5V.833C0 .817.01.802.012.785.013.761.006.737.01.712.02.642.049.581.076.517.085.494.087.47.099.447A.826.826 0 0 1 .32.184L.336.165C.354.152.376.151.395.139A.839.839 0 0 1 .748.016C.778.012.804 0 .834 0zm1.911 6.077a.834.834 0 0 1 1.178 0l2.5 2.5a.834.834 0 0 1 0 1.18l-2.5 2.499a.827.827 0 0 1-.589.244.832.832 0 0 1-.59-1.422L17.156 10h-4.654a.833.833 0 1 1 0-1.667h4.655l-1.078-1.077a.832.832 0 0 1 0-1.179z"
                        fill="#0E0063"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <v-list-item-title class="text-text">{{
                      $t("drawer.logout")
                    }}</v-list-item-title>
                  </div>
                </div>
              </v-list-item>
            </v-list>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </template>

    <v-list-item v-if="!isAuth">
      <Route to="/login">
        <div class="d-flex justify-start align-center">
          <span class="me-3">
            <Image icon="drawer-profile" />
          </span>
          <v-list-item-title>{{ $t("button.login") }}</v-list-item-title>
        </div>
      </Route>
    </v-list-item>

    <v-list-item class="drawer__version pa-4 w-100 text-center">
      <template v-slot:default>
        <div>
          <span class="text-text">{{ $t("drawer.version") }}</span>
        </div>
      </template>
    </v-list-item>
  </v-navigation-drawer>
</template>

<script setup>
import { computed, watch, ref } from "vue";
import { useRoute } from "vue-router";
import { useDrawerStore } from "@/stores/drawer";
import { useDisplay } from "vuetify";
import { storeToRefs } from "pinia";

// Stores
const { _delete } = useApi();
const authStore = useAuthStore();
const { setAuthToken } = authStore;
const { isAuth, userProfile } = storeToRefs(authStore);

const authCookie = useCookie("auth-token");
const authToken = ref(authCookie.value);

const drawerStore = useDrawerStore();
const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();

const isRouteActive = (path) => {
  // Get the localized version of the path for comparison
  const localizedPath = localePath(path);

  // Check if current route matches the localized path
  return route.path === localizedPath || route.path === path;
};
const { mobile } = useDisplay(); // Vuetify composable

// const profilePagePaths = ["/profile", "/change-password", "/requests"];
const profilePagePaths = ["/profile", "/change-password", "/requests"];
const isProfileSection = computed(() => {
  // Check both exact paths and localized versions
  return profilePagePaths.some((path) => {
    const localizedPath = localePath(path);
    return route.path === path || route.path === localizedPath;
  });
});
// User info from store
const userName = computed(() => authStore.userProfile?.firstname || "Guest");
const userAvatar = computed(
  () =>
    authStore.user?.avatar ||
    "https://media.istockphoto.com/id/1411901680/photo/happy-man-toothy-smile-positive-emotion-avatar.jpg?s=612x612&w=0&k=20&c=H7YtE74Fs0CuGYftk0UtPYdZtO3VgBF5cX2HYmCI0C4="
);

const handleLogout = async () => {
  try {
    const res = await _delete("/logout");
    authStore.userProfile = null; // This will make isAuth become false
    authStore.setAuthToken(null);
    router.push(localePath("/"));
  } catch (err) {
    console.error("Error loggin out from header", err.response);
  }
};

// Navigation data
const mainNavItems = [
  {
    titleKey: "navbar.homepage",
    icon: "mdi-home",
    route: "/",
  },
  {
    titleKey: "navbar.about",
    icon: "mdi-information",
    route: "/about",
  },
  {
    titleKey: "navbar.contactUs",
    icon: "mdi-email",
    route: "/contact-us",
  },
  {
    titleKey: "navbar.termsAndConditions",
    icon: "mdi-file-document-outline",
    route: "/terms-and-conditions",
  },
  {
    titleKey: "navbar.privacyPolicy",
    icon: "mdi-shield-account-outline",
    route: "/privacy-policy",
  },
];

// Close drawer when route changes on mobile
// Modified watcher for route changes
watch(
  () => route.path,
  (newPath, oldPath) => {
    const isProfilePath = profilePagePaths.some((path) => {
      const localizedPath = localePath(path);
      return newPath === path || newPath === localizedPath;
    });

    const wasProfilePath = profilePagePaths.some((path) => {
      const localizedPath = localePath(path);
      return oldPath === path || oldPath === localizedPath;
    });

    // If we're in a profile section, keep drawer open
    if (isProfilePath) {
      drawerStore.openDrawer();
    }
    // Only close on mobile when not in profile section
    else if (mobile.value) {
      drawerStore.closeDrawer();
    }
  }
);
// Auto-close drawer when transitioning to desktop
watch(mobile, (newVal, oldVal) => {
  if (!newVal && oldVal && drawerStore.isOpen) {
    drawerStore.closeDrawer();
  }
});
watch(
  [isProfileSection, mobile],
  ([newIsProfileSection, newIsMobile]) => {
    // If we're on a profile page and not on mobile, always open the drawer
    if (newIsProfileSection && !newIsMobile) {
      drawerStore.openDrawer();
    }
  },
  { immediate: true } // Run immediately on component mount
);
</script>

<style lang="scss" scoped>
</style>