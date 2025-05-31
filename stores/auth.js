import { defineStore } from "pinia";
import { useApi } from "~/composables/useApi.js";
export const useAuthStore = defineStore("auth-store", () => {
  const userProfile = ref(null);
  const isAuth = computed(() => !!userProfile.value); // initially false

  function getAuthToken() {
    const authCookie = useCookie("auth-token");
    return authCookie.value;
  }
  function setAuthToken(token) {
    const authCookie = useCookie("auth-token");
    authCookie.value = token;
  }

  const fetchUserProfile = async () => {
    try {
      const response = await useApi()._get("/show-account");
      if (response?.data?.user) {
        userProfile.value = response.data.user;
      }

      return response.data.user;
    } catch (error) {
      console.error("Failed to fetch user profile", error);
    }
  };
  return {
    userProfile,
    isAuth,
    fetchUserProfile,
    getAuthToken,
    setAuthToken,
  };
});
