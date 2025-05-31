import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppLocaleStore = defineStore("app-locale-store", () => {
  const localeCookie = useCookie("app-locale");
  const appLocale = ref(localeCookie.value ?? "ar");

  async function setAppLocale(newLocale) {
    localeCookie.value = newLocale;
    appLocale.value = newLocale;
    
    const { $i18n } = useNuxtApp();
    await $i18n.setLocale(newLocale); // Dynamically switch locale
  }

  return {
    appLocale,
    setAppLocale,
  };
});