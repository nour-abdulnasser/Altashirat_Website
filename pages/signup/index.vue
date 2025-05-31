<template>
  <v-container fluid class="fill-height pa-0 ma-md-0 mt-8 flex-1">
    <v-row>
      <v-col
        cols="12"
        md="6"
        class="d-none login__image--gradient-background d-md-flex align-center justify-center"
      >
        <div class="login-image-container signup__image w-100" >
          <Image name="signup" alt="login" class="w-100 h-100" />
        </div>
      </v-col>

      <v-col
        class="d-flex align-center justify-center py-8 px-2 py-md-12"
        cols="12"
        md="6"
      >
        <v-card
          elevation="0"
          class="card rounded-xl card--glow-shadow py-2 py-md-4 px-3 px-md-6 mx-auto my-10"
          max-width="550"
          width="100%"
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
              <span class="text-h6  text-text font-weight-medium">{{
                $t("signup.title")
              }}</span>
            </div>

            <Form
              v-if="formReady"
              @submit="handleSubmit"
              :initial-values="formInitialValues"
              class="d-flex justify-center flex-column align-center"
            >
              <v-row class="w-100">
                <v-col cols="12" sm="6" class="px-2 pt-0 py-sm-2 py-0 ">
                  <Text
                    name="firstName"
                    rules="required|min:3|max:15"
                    :apiError="fieldErrors?.firstName"
                    :placeholder="$t('placeholders.firstName')"
                    prependIcon="mdi-account"
                    iconColor="icon-input"
                    v-model="formValues.firstName"
                    density="comfortable"
                    rounded="xl"
                    class="text-text "
                    :label="$t('fields.firstName')"
                  />
                </v-col>

                <v-col cols="12" sm="6" class="px-2 pb-2  py-0 py-sm-2">
                  <Text
                    :label="$t('fields.lastName')"
                    name="lastName"
                    rules="required|min:3|max:15"
                    :apiError="fieldErrors?.lastName"
                    :placeholder="$t('placeholders.lastName')"
                    prependIcon="mdi-account"
                    iconColor="icon-input"
                    density="comfortable"
                    class="text-text"
                    v-model="formValues.lastName"
                    rounded="xl"
                  />
                </v-col>
              </v-row>

              <div class="w-100 px-2 py-0">
                <Text
                  :label="$t('fields.email')"
                  name="email"
                  rules="required|max:50|email"
                  :apiError="fieldErrors?.email"
                  :placeholder="$t('placeholders.email')"
                  prependIcon="mdi-email"
                  iconColor="icon-input"
                  v-model="formValues.email"
                  class="text-text"
                  density="comfortable"
                  rounded="xl"
                />
              </div>

              <div class="w-100 px-2 py-0">
                <Phone
                  :apiError="fieldErrors?.phone"
                  name="phone"
                  class="text-text mb-0"
                  :countryRules="'required'"
                  :numberRules="'required|numeric|min:9|max:15'"
                  :label="$t('fields.phone.number')"
                  v-model="formValues.phone"
                  density="comfortable"
                  iconColor="icon-input"
                />
              </div>

              <div class="w-100 px-2 pt-0 pb-4">
                <label
                  class="text-text text-body-2 text-md-body-1 mb-1 d-block"
                  >{{ $t("fields.country") || "Country" }}</label
                >
                <Countries
                  name="country_id"
                  rules="required"
                  :apiError="fieldErrors?.country_id"
                  v-model="formValues.country_id"
                  rounded="xl"
                  density="comfortable"
                  customClass="w-100 shadow-all-round no-outline countries__select"
                  displayMode="name"
                  placeholder="Select a country"
                />
              </div>

              <div class="w-100 ">
                <Password
                  class="text-text mb-0 px-1 py-0"
                  :apiError="fieldErrors?.password"
                  name="password"
                  rules="required|min:8|max:50"
                  :label="$t('fields.password')"
                  id="password"
                  rounded="xl"
                  density="comfortable"
                  :placeholder="$t('placeholders.password')"
                  iconColor="icon-input"
                  v-model="formValues.password"
                />
              </div>
              <div class="w-100 mb-0 px-2 py-0">
                <Password
                  class="text-text mb-0"
                  :apiError="fieldErrors?.confirmPassword"
                  name="confirmPassword"
                  rules="required|confirmed:@password"
                  :label="$t('fields.confirmPassword')"
                  id="confirmPassword"
                  rounded="xl"
                  density="comfortable"
                  :placeholder="$t('placeholders.confirmPassword')"
                  iconColor="icon-input"
                  v-model="formValues.confirmPassword"
                />
              </div>

              <div class="w-100 d-flex justify-center ">
                <Button
                  elevation="0"
                  class="button--gradient-filled w-100 text-subtitle-1  "
                  type="submit"
                  :text="$t('button.signup')"
                  :loading="isSubmitting"
                />
              </div>
            </Form>

            <div
              v-else
              class="d-flex justify-center align-center"
              style="height: 200px"
            >
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </div>

            <div class="d-flex justify-center align-center mt-4 mt-md-6">
              <span class="text-body-2 text-md-body-1 text-text me-1">{{
                $t("signup.accountExists")
              }}</span>
              <Route to="/login">
                <span
                  class="text-body-2 text-md-body-1 text-secondary font-weight-medium"
                  >{{ $t("signup.login") }}</span
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
import { storeToRefs } from "pinia";
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";

definePageMeta({
  layout: "minimal",
  middleware: ["auth-redirect"],
});
useSeoMeta({
  title: "Sign Up",
});

// Composables
const router = useRouter();
const api = useApi();

// Stores
const authStore = useAuthStore();
const { fetchUserProfile, setAuthToken } = authStore;

const apiErrorStore = useApiErrorStore();
const { fieldErrors } = storeToRefs(apiErrorStore);

const appLocaleStore = useAppLocaleStore();
const currentLocale = appLocaleStore.appLocale;

const countriesStore = useCountriesStore();

// Variables
const formReady = ref(false); // I need formReady and countryStore and the onMounted hook here because I want to perform an action on fetched countries (find the id to make a default choice after all country options load.)
const isSubmitting = ref(false);

// Initialize right away using the locale
const defaultCountryCode = currentLocale === "ar" ? "sa" : "gb";

const formValues = reactive({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: {
    country_code: "",
    number: "",
  },
  country_id: 1,
});
const formInitialValues = computed(() => {
  return {
    firstName: formValues.firstName,
    lastName: formValues.lastName,
    email: formValues.email,
    password: formValues.password,
    confirmPassword: formValues.confirmPassword,
    phone: formValues.phone,
    country_id: formValues.country_id,
  };
});

// Functions
const handleSubmit = async (values) => {
  isSubmitting.value = true;

  try {
    // Prep payload
    const formData = new FormData();

    formData.append("firstname", values.firstName);
    formData.append("lastname", values.lastName);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("password_confirmation", values.confirmPassword);

    if (values.phone) {
      formData.append("phone[number]", values.phone.number || "");
      formData.append("phone[country_code]", values.phone.country_code || "");
    }

    if (values.country_id) {
      formData.append("country", values.country_id);
    }

    // Send request
    const response = await api._post("/signup", formData);

    // Handle successful registration
    if (response.data.token) {
      setAuthToken(response.data.token);
      await fetchUserProfile();
      await router.push("/");
    }
  } catch (err) {
    throw err;
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(async () => {
  try {
    // Wait for countries to load
    const countries = await countriesStore.fetchAllCountries();

    // Set default country
    if (countries?.length > 0) {
      const defaultCountry = countries.find(
        (c) => c.code === defaultCountryCode
      );
      if (defaultCountry) {
        formValues.country_id = defaultCountry.id;
        formValues.phone.country_code = defaultCountry.phone_code;
      }
    }
    // Only mark form ready after data is loaded
    formReady.value = true;
  } catch (error) {
    formReady.value = true; // Show form anyway
    throw error;
  }
});
onBeforeUnmount(() => {
  apiErrorStore.clearErrors();
});
</script>