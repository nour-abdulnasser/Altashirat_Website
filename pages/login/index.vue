<template>
  <v-container fluid grow class="fill-height pa-0 ma-md-0 mt-8 login-container">
    <v-row class="h-100">
      <v-col
        cols="12"
        md="6"
        class="d-none login__image--gradient-background d-md-flex align-center justify-center"
      >
        <div class="login-image-container">
          <Image name="login" alt="login" class="w-100 object-cover" cover />
        </div>
      </v-col>

      <v-col
        class="d-flex align-center justify-center py-4 py-md-12"
        cols="12"
        md="6"

      >
        <v-card
          elevation="0"
          class="card rounded-xl card--glow-shadow py-2 py-md-4 px-3 px-md-10 mx-auto"
          max-width="550"
          width="70%"
        >
          <v-container class="pa-2 pa-md-4">
            <div
              class="d-flex w-100 flex-column justify-center align-center mb-3 mb-md-6"
            >
              <div class="image__container card__logo d-flex justify-center">
                <Image
                  name="logo-gradient"
                  class="card__logo mb-1"
                  width="100"
                  height="100"
                />
              </div>
              <span class="text-h6 text-text font-weight-medium">{{
                $t("login.title")
              }}</span>
            </div>

            <Form
              @submit="handleSubmit"
              :initial-values="formInitialValues"
              class="d-flex justify-center flex-column align-center"
            >
              <div class="w-100 pa-0">
                <Phone
                  :apiError="fieldErrors?.phone"
                  name="phone"
                  class="text-text"
                  :countryRules="'required'"
                  :numberRules="'required|numeric|min:9|max:15'"
                  :label="$t('fields.phone.number')"
                  v-model="formValues.phone"
                  density="comfortable"
                  iconColor="icon-input"
                />
              </div>
              
              <div class="w-100 pa-0">
                <Password
                  class="text-text"
                  :apiError="fieldErrors?.password"
                  name="password"
                  rules="required|min:8|max:50"
                  :label="$t('fields.password')"
                  id="loginPassword"
                  rounded="xl"
                  density="comfortable"
                  :placeholder="$t('placeholders.password')"
                  iconColor="icon-input"
                  v-model="formValues.password"
                />
              </div>
              
              <div class="w-100 pa-0 mt-4">
                <Button
                  elevation="0"
                  class="button--gradient-filled w-100 text-subtitle-1"
                  type="submit"
                  :text="$t('button.login')"
                  :loading="isSubmitting"
                />
              </div>
            </Form>
            
            <div class="d-flex justify-center align-center mt-4 mt-md-6">
              <span class="text-body-2 text-md-body-1 text-text me-1">{{
                $t("login.noAccount")
              }}</span>
              <Route to="/signup">
                <span
                  class="text-body-2 text-md-body-1 text-secondary font-weight-medium"
                  >{{ $t("login.signup") }}</span
                >
              </Route>
            </div>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
// Imports
import { storeToRefs } from "pinia";
import { ref, reactive, computed, onBeforeUnmount } from "vue";

// Metadata
definePageMeta({
  layout: "minimal",
  middleware: ["auth-redirect"],
});
useSeoMeta({
  title: "Log In",
});

// Composables
const router = useRouter();
const route = useRoute();
const api = useApi();

// Stores
const authStore = useAuthStore();
const { fetchUserProfile, setAuthToken } = authStore;

const apiErrorStore = useApiErrorStore();
const { fieldErrors } = storeToRefs(apiErrorStore);

const appLocaleStore = useAppLocaleStore();
const currentLocale = appLocaleStore.appLocale;

// Variables

const isSubmitting = ref(false);
const defaultCountryCode = currentLocale === "ar" ? "00966" : "0044"; // Initial default (will be updated once countries are loaded)

// Initial form values
const formValues = reactive({
  phone: {
    country_code: defaultCountryCode,
    number: "",
  },
  password: "",
});
// Computed property for form initial values
const formInitialValues = computed(() => {
  return {
    phone: formValues.phone,
    password: formValues.password,
  };
});

// Functions
const handleSubmit = async (values) => {
  isSubmitting.value = true;

  try {
    // Prepare payload
    const formData = new FormData();

    if (formValues.phone) {
      formData.append("phone[number]", values.phone.number);
      formData.append("phone[country_code]", values.phone.country_code);
    }
    formData.append("password", formValues.password);

    // Send request
    const response = await api._post("/login", formData);
    setAuthToken(response.data.token);
    await fetchUserProfile();
    const redirectPath = route.query.redirect || "/"; // Redirect could be a param that we send for inaccessible routes that require authentication. For now we only use "/""
    await router.push(redirectPath);
  } catch (err) {
    throw err;
  } finally {
    isSubmitting.value = false;
  }
};
onBeforeUnmount(() => {
  apiErrorStore.clearErrors();
});
</script>