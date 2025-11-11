import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: "2025-03-04",
  devtools: { enabled: true },
  css: [
    "vuetify/lib/styles/main.css",
    "@mdi/font/css/materialdesignicons.min.css",
    "~/public/assets/scss/main.scss", // This will now override Vuetify styles
  ],
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@vee-validate/nuxt",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
  ],
  i18n: {
    strategy: "prefix_except_default",
    defaultLocale: "ar",
    locales: [
      { code: "en", iso: "en-US", file: "en.json" },
      { code: "ar", iso: "ar-AR", file: "ar.json" },
    ],
    langDir: "locales/",
    vueI18n: "config.js",
    detectBrowserLanguage: false,
  },
  build: {
    transpile: ["vuetify", "vee-validate/dist/rules"],
  },
  vite: {
    // logLevel: 'info',
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    server: {
      hmr:{clientPort:3000}
    },
  },
  plugins: [
    "~/plugins/vee-validate/index.js",
    "~/plugins/01.pinia/index.js",
    "~/plugins/vuetify/index.js",
    "~/plugins/auth/index.js",
  ],
  imports: {
    dirs: ["axios", "stores"],
  },
  experimental: {
    asyncContext: true,
  },
  // target: 'static',
  app: {
    baseURL: '/',
    buildAssetsDir: 'assets',
  },
  // nitro: {
  //   preset: 'vercel'
  // }
});
