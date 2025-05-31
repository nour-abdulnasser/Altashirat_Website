// This middleware is to integrate the cookie and nuxti18n on website initialization 
// middleware/locale-redirect.global.js
export default defineNuxtRouteMiddleware((to) => {
  // Only run on client-side
  if (!process.client) return;
  
  const localeCookie = useCookie('app-locale');
  const { $i18n } = useNuxtApp();
  
  // Safety check - ensure we have the cookie and i18n
  if (!localeCookie?.value || !$i18n) return;
  
  // Check if we're already on a localized route
  const path = to.path;
  const pathSegments = path.split('/').filter(Boolean);
  
  // If the first segment is already a locale, don't redirect
  if (pathSegments[0] === 'en' || pathSegments[0] === 'ar') return;
  
  // If cookie locale differs from default, redirect
  if (localeCookie.value !== $i18n.defaultLocale) {
    
    // Create the new path with locale prefix
    const newPath = `/${localeCookie.value}${path}`;
    
    return navigateTo(newPath, { replace: true });
  }
});