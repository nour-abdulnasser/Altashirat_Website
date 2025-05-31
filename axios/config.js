import axios from "axios";
import { useApiErrorStore } from "~/stores/apiError";
import { useAuthStore } from "~/stores/auth";
import { useNotificationStore } from "~/stores/notification";

// API axios instance
export default () => {
  const apiErrorStore = useApiErrorStore();
  const { $i18n } = useNuxtApp();
  const env = import.meta.env;

  const instance = axios.create({
    baseURL: env.VITE_BASE_URL,
  });

  instance.interceptors.request.use(
    (config) => {
      // Get the locale directly from i18n
      const currentLocale = $i18n && $i18n.locale ? $i18n.locale.value : "ar";

      // Set the header with current locale
      config.headers["x-locale"] = currentLocale;

      // Auth token
      const authStore = useAuthStore();
      const { getAuthToken } = authStore;
      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  instance.interceptors.response.use(
    (res) => {
      apiErrorStore.clearErrors();
      if (res?.data?.message) {
        const notificationStore = useNotificationStore();
        notificationStore.setNotification({
          type: "success", // Adjust vuetify theme
          text: res.data.message,
        });
      }
      return res;
    },
    (err) => {
      const { status, response } = err;

      if (status === 409 || status === 422) {
        apiErrorStore.setStatus(status);
        apiErrorStore.setErrors(response.data);
        const notificationStore = useNotificationStore();
        notificationStore.setNotification({
          type: "error",
          text: response.data.message,
        });
      }

      return Promise.reject(err);
    }
  );

  return instance;
};
