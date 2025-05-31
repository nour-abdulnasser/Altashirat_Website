import { useAuthStore } from "~/stores/auth.js";

// "when reload page fetch api for user info and store it"
// This can also be used to initialize settings on app mount.
// Since I want to call show-account and use the useApi composable, I have to wait for it to instantiate, hence mounted hook.

export default defineNuxtPlugin(async (nuxtApp) => {
  nuxtApp.hook("app:mounted", async () => {
    const authStore = useAuthStore();
    const { fetchUserProfile, getAuthToken } = authStore;
    const authToken = getAuthToken();

    const settingsStore = useSettingsStore();
    const { getSettingsApi } = settingsStore;

    try {
      await getSettingsApi();
    } catch (err) {}

    if (authToken) {
      try {
        await fetchUserProfile();
      } catch (error) {
        throw error;
      }
    }
  });
});
