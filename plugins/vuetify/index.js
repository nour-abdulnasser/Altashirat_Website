import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";

import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default defineNuxtPlugin((app) => {
  const { $i18n } = useNuxtApp();
  const messages = {
    ar: {
      // Removes translation key warning. // TODO: switch to vuetify nuxt module or find an efficient way to import locale from i18n
      confirmEdit: { ok: "حفظ", cancel: "إلغاء" },
      open: "فتح",
      close: "إغلاق",
      loading: "جاري التحميل...",
      input: {
        appendAction: "appendAction",
        clear: "مسح"
      },
      noDataText: "لا يوجد بيانات",
      dataIterator: {
        rowsPerPageText: "العناصر لكل صفحة:",
        pageText: "{0}-{1} من {2}",
        loadingText: "جاري التحميل...",
        noResultsText: "لا يوجد نتائج",
      },
      fileInput: {
        // counterSize: "الملفات"
      },
      pagination: {
        ariaLabel: {
          currentPage: "الصفحة الحالية",
          root: "المسار",
          next: "الصفحة التالية",
          previous: "الصفحة السابقة"
        }
      }
    },
  };

  const vuetify = createVuetify({
    components,
    directives,
    locale: {
      locale: computed(() => $i18n.locale.value), // This preserves direction according to nuxt locale only, not locale cookie.
      messages: messages,
    },
    icons: {
      defaultSet: "mdi",
    },
    theme: {
      defaultTheme: "customTheme",
      themes: {
        customTheme: {
          dark: false,
          colors: {
            primary: `#4426F5`, // --primary-color
            secondary: `#65bcf9`, // --secondary-color
            accent: `#8ee7ad`,
            text: `#0e0063`,
            "bg-input": `#f1f4fb`,
            "bg-footer": `#eaeaea80`,
            "text-input": `#8ee7ad`,
            "icon-input": `#b2aecc`,
            "light-white": "#ffffff97",
            green: "#8ee7ad",
            phone: "#4E34E5",
          },
        },
      },
    },
  });

  app.vueApp.use(vuetify);
});
