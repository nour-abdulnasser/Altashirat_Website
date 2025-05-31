// stores/settings.js
import { defineStore } from "pinia";
import { useApi } from "~/composables/useApi.js";
import { watch } from "vue";

export const useSettingsStore = defineStore("settings-store", () => {
  const settingsApi = ref({}); // Will contain apiResponse
  const { $i18n } = useNuxtApp();

  // Turning into key-value pairs
  const settings = computed(() => {
    if (!settingsApi.value.data || !settingsApi.value.data.length) {
      return {};
    }
    return settingsApi.value.data.reduce((acc, current) => {
      acc[current.key] = current.value;
      return acc;
    }, {});
  });
  
  // Call the API to fill in store.settings
  const getSettingsApi = async () => {
    try {
      const response = await useApi()._get("settings");
      settingsApi.value = response.data;
      return response.data;
    } catch (err) {
      console.error("Error fetching settings:", err);
      // throw err;
    }
  };

  // Watch for locale changes from i18n directly
  if ($i18n) {
    watch(() => $i18n.locale.value, (newLocale) => {
      getSettingsApi();
    });
  }

  return {
    settings,
    settingsApi,
    getSettingsApi,
  };
});