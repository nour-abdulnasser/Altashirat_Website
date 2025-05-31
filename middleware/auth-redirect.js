// Redirect to homepage if auth & route is login or signup
export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  const token = useCookie("auth-token");
  
  const publicRoutes = ["/login", "/signup"];
  if (token.value && !authStore.userProfile) {
    await authStore.fetchUserProfile();
  }
  if (authStore.isAuth && publicRoutes.includes(to.path)) {
    return navigateTo("/");
  }
});
