import { defineStore } from "pinia";

export const useLocaleStore = defineStore("locale-store", () => {
  const localeCookie = useCookie("locale");
  const locale = computed(() => localeCookie.value ?? "ar");
  
  return {
    locale,
  };
});
