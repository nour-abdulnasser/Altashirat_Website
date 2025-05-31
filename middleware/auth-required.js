
export default defineNuxtRouteMiddleware(async (to) => {
    const authStore = useAuthStore();
    const token = useCookie("auth-token");
    
    if (token.value && !authStore.userProfile) {
      try {
        await authStore.fetchUserProfile();
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        authStore.setAuthToken(null);
      }
    }
  
    const protectedRoutes = [
      "/profile",
      "/change-password",
      "/manage-account",
      "/manage-account/delete-account",
    ];
  
    const isProtectedRoute = protectedRoutes.some(route => 
      to.path === route || to.path.startsWith(`${route}/`)
    );
  
    if (isProtectedRoute && !authStore.isAuth) {
      return navigateTo({
        path: "/login",
        // query: { redirect: to.fullPath }
      });
    }
  });