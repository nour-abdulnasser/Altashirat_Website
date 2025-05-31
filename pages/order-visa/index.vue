<template>
  <div class="profile">
    <!-- Auth Dialog for unauthenticated users -->
    <AuthDialog
      v-model="showAuthDialog"
      @login="navigateToLogin"
      v-if="!cookieAuth"
      @close="handleAuthDialogClose"
      :redirect-path="redirectPath"
    />

    <div
      v-if="!formReady"
      class="d-flex justify-center align-center"
      style="height: 400px"
    >
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <Form
      v-if="formReady"
      :key="formReady"
      @submit="submitVisaOrder"
      :initial-values="formInitialValues"
      :disabled="isLoading || !cookieAuth"
    >
      <!-- Personal Information Card -->
      <v-container fluid class="mt-16 d-flex align-center justify-center">
        <v-card
          elevation="0"
          class="card card__profile rounded-xl py-2 px-2 mx-5 border-sm"
        >
          <v-card-title
            class="card__profile-title d-flex justify-space-between align-center pe-4 pt-4 pb-2"
            :class="[pseudoClassDirection]"
          >
            <div
              class="d-flex align-center position-relative justify-start title-container"
            >
              <div class="d-flex align-center pe-3">
                <Image name="personalInfo" class="me-2 ms-2" />
                <span
                  :class="[
                    'text-text m-2',
                    $vuetify.display.xs ? 'text-subtitle-2' : '',
                    $vuetify.display.sm ? 'text-subtitle-1' : '',
                    $vuetify.display.mdAndUp ? 'text-h5' : '',
                  ]"
                >
                  {{ $t("personalInfo.Title") }}
                </span>
              </div>
            </div>
          </v-card-title>

          <div class="d-flex justify-center flex-column align-center pa-6">
            <v-container fluid>
              <v-row>
                <v-col cols="12" md="6">
                  <Text
                    name="firstname"
                    rules="required|alpha|min:3|max:10"
                    :apiError="fieldErrors?.firstname"
                    :placeholder="$t('placeholders.firstName')"
                    prependIcon="mdi-account"
                    :iconColor="iconColor"
                    style="width: 100%"
                    rounded="xl"
                    class="text-text"
                    :label="$t('fields.firstName')"
                  />

                  <Text
                    v-if="$vuetify.display.smAndDown"
                    :label="$t('fields.middleName')"
                    name="middlename"
                    rules="required|alpha|min:3|max:10"
                    :apiError="fieldErrors?.middlename"
                    :placeholder="$t('placeholders.middleName')"
                    prependIcon="mdi-account"
                    :iconColor="iconColor"
                    class="text-text"
                    style="width: 100%"
                    rounded="xl"
                  />

                  <Text
                    :label="$t('fields.lastName')"
                    name="lastname"
                    rules="required|alpha|min:3|max:10"
                    :apiError="fieldErrors?.lastname"
                    :placeholder="$t('placeholders.lastName')"
                    prependIcon="mdi-account"
                    :iconColor="iconColor"
                    class="text-text"
                    style="width: 100%"
                    rounded="xl"
                  />

                  <Text
                    :label="$t('fields.email')"
                    name="contact_email"
                    rules="required|email"
                    :apiError="fieldErrors?.contact_email"
                    :placeholder="$t('placeholders.email')"
                    prependIcon="mdi-email"
                    :iconColor="iconColor"
                    class="text-text mb-0"
                    style="width: 100%"
                    rounded="xl"
                  />

                  <Select
                    :label="$t('fields.gender')"
                    name="gender"
                    rules="required"
                    :apiError="fieldErrors?.gender"
                    rounded="xl"
                    class="text-text w-100 mb-3"
                    style="height: 65px"
                    :placeholder="$t('placeholders.gender')"
                    prependIcon="mdi-gender-male-female"
                    :iconColor="iconColor"
                    :items="genderOptions"
                    item-title="title"
                    item-value="value"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <Text
                    v-if="$vuetify.display.mdAndUp"
                    :label="$t('fields.middleName')"
                    name="middlename"
                    rules="required|alpha|min:3|max:10"
                    :apiError="fieldErrors?.middlename"
                    :placeholder="$t('placeholders.middleName')"
                    prependIcon="mdi-account"
                    :iconColor="iconColor"
                    class="text-text mb-0"
                    style="width: 100%"
                    rounded="xl"
                  />

                  <DateInput
                    name="birthdate"
                    rules="required"
                    :apiError="fieldErrors?.birthdate"
                    :label="$t('labels.birthdate')"
                    :title="$t('fields.birthdate')"
                    class="w-100 mb-0"
                    outlined
                    dense
                    :modelValue="formInitialValues.birthdate"
                    @update:modelValue="updateBirthdate"
                  />

                  <Phone
                    :apiError="fieldErrors?.phone"
                    name="phone"
                    class="text-text w-100"
                    :countryRules="'required'"
                    :numberRules="'required|numeric|min:9|max:15'"
                    :label="$t('fields.phone.number')"
                    iconColor="icon-input"
                  />
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-card>
      </v-container>

      <!-- Visa Information Card -->
      <v-container
        fluid
        class="mt-14 d-flex align-center justify-center w-100 my-12"
      >
        <v-card
          elevation="0"
          class="card card__profile rounded-xl py-2 px-2 mx-5 border-sm"
        >
          <v-card-title
            class="card__profile-title d-flex justify-space-between align-center pe-4 pt-4 pb-2"
            :class="[pseudoClassDirection]"
          >
            <div
              class="d-flex align-center position-relative justify-start title-container"
            >
              <div class="d-flex align-center pe-3">
                <Image name="visaInfo" class="me-2 ms-2" />
                <span
                  :class="[
                    'text-text m-2',
                    $vuetify.display.xs ? 'text-subtitle-2' : '',
                    $vuetify.display.sm ? 'text-subtitle-1' : '',
                    $vuetify.display.mdAndUp ? 'text-h5' : '',
                  ]"
                >
                  {{ $t("orderVisa.title") }}
                </span>
              </div>
            </div>
          </v-card-title>

          <div class="d-flex justify-center flex-column align-center pa-6">
            <v-container fluid>
              <v-row>
                <v-col cols="12" md="6">
                  <label
                    class="text-text mb-1 d-block input__label text-body-2 text-md-body-1 mb-1 text-text"
                  >
                    {{ $t("fields.destinationCountry") }}
                  </label>
                  <Countries
                    name="destination_country"
                    prependInnerIcon="mdi-earth"
                    rules="required"
                    :apiError="fieldErrors?.destination_country"
                    rounded="xl"
                    customClass="w-100 mb-5"
                    density="compact"
                    displayMode="name"
                    :placeholder="$t('placeholders.destinationCountry')"
                    outlined
                  />

                  <Text
                    name="passport_number"
                    rules="required|min:14|max:20"
                    :apiError="fieldErrors?.passport_number"
                    :placeholder="$t('placeholders.passportNumber')"
                    prependIcon="mdi-passport"
                    :iconColor="iconColor"
                    rounded="xl"
                    class="text-text w-100 mt-1 mb-0"
                    :label="$t('fields.passportNumber')"
                  />

                  <Textarea
                    name="purpose_of_visit"
                    rules="required|min:5|max:255"
                    :apiError="fieldErrors?.purpose_of_visit"
                    :placeholder="$t('placeholders.purposeOfVisit')"
                    prependIcon="mdi-text"
                    :iconColor="iconColor"
                    style="width: 100%"
                    auto-grow
                    rows="4"
                    max-rows="6"
                    rounded="xl"
                    class="text-text mt-1 mb-0"
                    :label="$t('fields.purposeOfVisit')"
                  />

                  <File
                    name="passport_images"
                    :title="$t('fields.passport_images')"
                    rules="required|min_files:1|max_files:4"
                    multiple
                    :apiError="fieldErrors?.passport_images"
                    :placeholder="$t('placeholders.passport_images')"
                    accept="image/png,image/jpeg"
                    :counter="true"
                    :showSize="true"
                    :minFiles="1"
                    :maxFiles="4"
                    prependInnerIcon="mdi-camera"
                    prependIcon=""
                    :iconColor="iconColor"
                    rounded="xl"
                    class="text-text mt-3 mb-3"
                    :label="$t('fields.passport_images')"
                    preview
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <Select
                    class="text-text mb-7 mt-1"
                    :label="$t('fields.adultsCount')"
                    name="adults_count"
                    rules="required|numeric|min:0|max:10"
                    :apiError="fieldErrors?.adults_count"
                    rounded="xl"
                    style="height: 68px"
                    customClass="w-100"
                    :placeholder="$t('placeholders.adultsCount')"
                    prependIcon="mdi-account-group"
                    :iconColor="iconColor"
                    :items="adultCountOptions"
                    item-title="title"
                    item-value="value"
                  />

                  <Select
                    class="text-text mt-1 mb-7"
                    :label="$t('fields.childrenCount')"
                    name="children_count"
                    rules="required|numeric|min:0|max:10"
                    :apiError="fieldErrors?.children_count"
                    rounded="xl"
                    style="height: 68px"
                    customClass="w-100 text-text"
                    :placeholder="$t('placeholders.childrenCount')"
                    prependIcon="mdi-account-group"
                    :iconColor="iconColor"
                    :items="countOptions"
                    item-title="title"
                    item-value="value"
                  />

                  <Textarea
                    class="text-text mt-1"
                    name="message"
                    rules="min:0|max:40000"
                    :apiError="fieldErrors?.message"
                    :placeholder="$t('placeholders.message')"
                    :iconColor="iconColor"
                    style="width: 100%"
                    auto-grow
                    rows="4"
                    max-rows="10"
                    rounded="xl"
                    :label="$t('fields.message')"
                  />

                  <File
                    name="attachments"
                    :title="$t('fields.attachments')"
                    rules="required|min_files:1|max_files:3|max_size:512"
                    multiple
                    :apiError="fieldErrors?.attachments"
                    :placeholder="$t('placeholders.attachments')"
                    accept="application/pdf"
                    :counter="true"
                    :showSize="true"
                    :minFiles="1"
                    :maxFiles="3"
                    :maxSize="512"
                    prependIcon=""
                    customClass="text-text"
                    :iconColor="iconColor"
                    rounded="xl"
                    class="text-text mt-3 mb-3"
                    :label="$t('fields.attachments')"
                    preview
                  >
                    <template #prepend-inner>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.828 0v5.39c0 .905.736 1.641 1.64 1.641h5.673v14.39A2.581 2.581 0 0 1 18.563 24H5.437a2.581 2.581 0 0 1-2.578-2.578V2.578A2.581 2.581 0 0 1 5.437 0h8.391zm-3.716 16.875H6.703a.703.703 0 0 0 0 1.406h3.409a.703.703 0 0 0 0-1.406zm6.904-3.75H6.703a.703.703 0 0 0 0 1.406h10.313a.703.703 0 0 0 0-1.406zm0-3.75H6.703a.703.703 0 0 0 0 1.406h10.313a.703.703 0 0 0 0-1.406zM15.234.292c.21.109.405.247.58.413l4.52 4.276c.2.188.365.407.493.644H15.47a.235.235 0 0 1-.235-.234z"
                          fill="#B2AECC"
                          fill-rule="evenodd"
                        />
                      </svg>
                    </template>
                  </File>
                </v-col>
                <v-col cols="12" class="d-flex justify-end">
                  <Button
                    elevation="0"
                    class="button--gradient-filled profile__submit-btn"
                    type="submit"
                    :text="$t('button.save')"
                    :loading="isLoading"
                  />
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-card>
      </v-container>
    </Form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useApi } from "@/composables/useApi";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { useApiErrorStore } from "@/stores/apiError";
import { useAuthStore } from "@/stores/auth";
import { useCountriesStore } from "@/stores/countries";
import { useAppLocaleStore } from "@/stores/appLocale";
import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();
const appLocaleStore = useAppLocaleStore();
const { appLocale } = storeToRefs(appLocaleStore);

const pseudoClassDirection = computed(() =>
  appLocale.value === "ar" ? "pseudo-rtl" : "pseudo-ltr"
);

const { t } = useI18n();
const authStore = useAuthStore();
const { fetchUserProfile } = authStore;
const { userProfile, isAuth } = storeToRefs(authStore);
const apiErrorStore = useApiErrorStore();
const { fieldErrors } = storeToRefs(apiErrorStore);
const { _post, isLoading } = useApi();
const formReady = ref(false);
const iconColor = "icon-input";

const checkAuthCookie = () => {
  const authCookie = useCookie("auth-token");
  return !!authCookie.value;
};

const initialAuthState = checkAuthCookie();
const cookieAuth = ref(initialAuthState);

const showAuthDialog = ref(!cookieAuth.value);
const redirectPath = computed(() => route.fullPath);

const handleAuthDialogClose = () => {
  showAuthDialog.value = false;
};

watch(
  () => cookieAuth.value,
  (newValue) => {
    showAuthDialog.value = !newValue;
  }
);

const navigateToLogin = () => {
  router.push({
    path: "/login",
    query: { redirect: redirectPath.value },
  });
};

const genderOptions = [
  { title: t("fields.male"), value: "0" },
  { title: t("fields.female"), value: "1" },
];

const countOptions = Array.from({ length: 11 }, (_, i) => ({
  title: i.toString(),
  value: i,
}));
const adultCountOptions = Array.from({ length: 10 }, (_, i) => ({
  title: (i + 1).toString(),
  value: i + 1,
}));

const formInitialValues = computed(() => {
  const profile = userProfile.value || {};

  return {
    firstname: profile.firstname || "",
    middlename: profile.middlename || "",
    lastname: profile.lastname || "",
    gender: profile.gender !== undefined ? String(profile.gender) : "0",
    birthdate: profile.birthdate || "",
    passport_number: profile.passport_number || "",
    phone: {
      number: profile.phone?.number || "",
      country_code: profile.phone?.country_code || "",
    },
    contact_email: profile.email || "",
    destination_country: profile.country?.id || null,
    purpose_of_visit: "",
    adults_count: 1,
    children_count: 0,
    passport_images: [],
    attachments: [],
    message: "",
  };
});

const updateBirthdate = (value) => {
  console.log("Birthdate updated:", value);
};

const submitVisaOrder = async (values) => {
  if (!cookieAuth.value) {
    showAuthDialog.value = true;
    return;
  }
  console.log("Visa order form values being submitted:", values);

  const formData = new FormData();

  formData.append("firstname", values.firstname);
  formData.append("middlename", values.middlename);
  formData.append("lastname", values.lastname);
  formData.append("gender", values.gender);
  formData.append("birthdate", values.birthdate);
  formData.append("passport_number", values.passport_number);
  formData.append("phone[number]", values.phone.number);
  formData.append("phone[country_code]", values.phone.country_code);
  formData.append("contact_email", values.contact_email);

  let destinationCountry = "";
  if (
    typeof values.destination_country === "object" &&
    values.destination_country
  ) {
    destinationCountry =
      values.destination_country.id ||
      values.destination_country.value ||
      values.destination_country.code ||
      values.destination_country.name ||
      "";
  } else {
    destinationCountry = values.destination_country || "";
  }
  formData.append("destination_country", destinationCountry);

  formData.append("purpose_of_visit", values.purpose_of_visit);
  formData.append("adults_count", values.adults_count);
  formData.append("children_count", values.children_count);
  formData.append("message", values.message || "");

  if (values.passport_images && values.passport_images.length > 0) {
    values.passport_images.forEach((file, index) => {
      formData.append(`passport_images[${index}]`, file);
    });
  }

  if (values.attachments && values.attachments.length > 0) {
    values.attachments.forEach((file, index) => {
      formData.append(`attachments[${index}]`, file);
    });
  }

  try {
    const response = await _post("/tourism-visa", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    router.push("/requests");
    console.log("Visa order submitted successfully:", response);
  } catch (err) {
    console.error("Error submitting visa order:", err);
  }
};
watch(cookieAuth, async (newCookieAuth) => {
  if (newCookieAuth && !userProfile.value) {
    formReady.value = false;
    try {
      await fetchUserProfile();
    } catch (error) {
      console.error("Error fetching profile after auth change:", error);
    }
    formReady.value = true;
  }
});
onMounted(async () => {
  try {
    if (cookieAuth.value) {
      formReady.value = false;
      await fetchUserProfile();
      formReady.value = true;
    } else {
      formReady.value = true;
      showAuthDialog.value = true;
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    formReady.value = true;
  }
});
</script>

<style scoped></style>
