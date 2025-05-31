<template>
  <div class="profile">
    <v-container fluid class="mt-14 d-flex align-center justify-center">
      <v-card
        elevation="0"
        class="card card__profile rounded-xl py-2 px-2 mx-5 border-sm"
      >
        <v-card-title
          class="card__profile-title d-flex  justify-space-between align-center pe-4 pt-4 pb-2"
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
                {{ $t("personalInfo.title") }}
              </span>
            </div>
          </div>

          <Route
            to="/manage-account"
            class="rounded-pill manage-account-btn bg-bg-input text-subtitle-1 "
            elevation="0"
            :style="{ backgroundColor: '#F1F4FB', color: '#4426f5' }"
            :size="$vuetify.display.sm ? 'small' : 'default'"
            :class="[
                  'text-text m-2',
                  $vuetify.display.xs ? 'text-subtitle-2 px-2 py-1' : '',
                  $vuetify.display.sm ? 'text-subtitle-1 px-2 py-1' : '',
                  $vuetify.display.mdAndUp ? 'text-h5 px-2 py-1' : '',
                ]"
          >
            <span v-if="$vuetify.display.width > 400">{{
              $t("manageAccount.manageAccount")
            }}</span>
            <span v-else>{{
              $t("manageAccount.manageAccount") || "Manage"
            }}</span>
          </Route>
        </v-card-title>

        <Form
          v-if="formReady"
          @submit="updateProfile"
          :initial-values="formInitialValues"
          class="d-flex justify-center flex-column align-center pa-6"
        >
          <v-container fluid>
            <v-row>
              <!-- Force single column on xs screens by using cols="12" -->
              <!-- Use md="6" to create 2-column layout only on medium screens and up -->
              <v-col cols="12" md="6">
                <Text
                  name="firstName"
                  rules="required|min:3|max:15"
                  :apiError="fieldErrors?.firstName"
                  :placeholder="$t('placeholders.firstName')"
                  prependIcon="mdi-account"
                  :iconColor="iconColor"
                  style="width: 100%"
                  rounded="xl"
                  class="me-2 text-text"
                  :label="$t('fields.firstName')"
                />

                <!-- On mobile (xs AND sm screens), show middle name in the first column -->
                <Text
                  v-if="$vuetify.display.smAndDown"
                  :label="$t('fields.middleName')"
                  name="middleName"
                  rules="min:3|max:15"
                  :apiError="fieldErrors?.middleName"
                  :placeholder="$t('placeholders.middleName')"
                  prependIcon="mdi-account"
                  :iconColor="iconColor"
                  class="text-text"
                  style="width: 100%"
                  rounded="xl"
                />

                <Text
                  :label="$t('fields.lastName')"
                  name="lastName"
                  rules="required|min:3|max:15"
                  :apiError="fieldErrors?.lastName"
                  :placeholder="$t('placeholders.lastName')"
                  prependIcon="mdi-account"
                  :iconColor="iconColor"
                  class="text-text"
                  style="width: 100%"
                  rounded="xl"
                />
                <Phone
                  :apiError="fieldErrors?.phone"
                  name="phone"
                  class="w-100 text-text"
                  :countryRules="'required'"
                  :numberRules="'required'"
                  :label="$t('fields.phone.number')"
                  iconColor="icon-input"
                />
                <label
                  class="text-text mb-1 d-block input__label text-body-2 text-md-body-1 mb-1 text-text"
                  >{{ $t("fields.country") || "Country" }}</label
                >
                <Countries
                  name="country"
                  rules="required"
                  prependInnerIcon="mdi-earth"
                  :apiError="fieldErrors?.country"
                  rounded="xl"
                  customClass="w-100"
                  density="compact"
                  displayMode="name"
                  placeholder="Select a country"
                  outlined
                />
              </v-col>
              <v-col cols="12" md="6">
                <!-- On desktop (md screens and up), show middle name in the second column -->
                <Text
                  v-if="$vuetify.display.mdAndUp"
                  :label="$t('fields.middleName')"
                  name="middleName"
                  rules="required|min:3|max:15"
                  :apiError="fieldErrors?.middleName"
                  :placeholder="$t('placeholders.middleName')"
                  prependIcon="mdi-account"
                  :iconColor="iconColor"
                  class="text-text"
                  style="width: 100%"
                  rounded="xl"
                />

                <Text
                  :label="$t('fields.email')"
                  name="email"
                  rules="required|max:50|email"
                  :apiError="fieldErrors?.email"
                  :placeholder="$t('placeholders.email')"
                  prependIcon="mdi-email"
                  :iconColor="iconColor"
                  class="text-text"
                  style="width: 100%"
                  rounded="xl"
                />
                <DateInput
                  name="birthdate"
                  rules=""
                  :label="$t('labels.birthdate')"
                  :modelValue="formInitialValues.birthdate"
                  @update:modelValue="updateBirthdate"
              
                  :title="$t('fields.birthdate')"
                  class="date-input-wrapper w-100"
                  outlined
                  dense
                />
              </v-col>
              <v-col cols="12" class="d-flex justify-end gap-2 force-ltr">
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
      </v-card>
    </v-container>
  </div>
</template>
<style scoped>
.card__profile-title {
  border-bottom: 2px solid transparent;
  border-image-slice: 1;
  margin-bottom: 0 !important;
  border-bottom: none !important;
  padding-bottom: 8px !important;

  @media (max-width: 400px) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.title-container {
  width: auto;

  @media (max-width: 400px) {
    margin-bottom: 8px;
  }
}

.manage-account-btn {
  white-space: nowrap;

  @media (max-width: 550px) {
    font-size: 0.8rem !important;
    /* padding: 0 12px !important; */
  }

  @media (max-width: 400px) {
    /* align-self: flex-end; */
    margin-top: 8px;
    padding: 0 8px !important;
    height: 30px !important;
  }
}
</style>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useApi } from "@/composables/useApi";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { useApiErrorStore } from "@/stores/apiError";
import { useAuthStore } from "@/stores/auth";
import { useCountriesStore } from "@/stores/countries";
import { useAppLocaleStore } from "@/stores/appLocale";

definePageMeta({
  layout: "profile",
  middleware: ["auth-required"],
});

const appLocaleStore = useAppLocaleStore();
const { appLocale } = storeToRefs(appLocaleStore);

const pseudoClassDirection = computed(() =>
  appLocale.value === "ar" ? "pseudo-rtl" : "pseudo-ltr"
);

const { t } = useI18n();
const authStore = useAuthStore();
const countriesStore = useCountriesStore();
const { fetchUserProfile } = authStore;
const { userProfile } = storeToRefs(authStore);
const { _get, _post, isLoading } = useApi();
const apiErrorStore = useApiErrorStore();
const { fieldErrors } = storeToRefs(apiErrorStore);
const formReady = ref(false);
const iconColor = "icon-input";

// Add isEditMode state
const isEditMode = ref(false);
// Add this function to your script
const updateBirthdate = (value) => {
  // Update the birthdate value
  userProfile.value.birthdate = value;
  console.log("Updated birthdate:", userProfile.value.birthdate);
};
// Original profile data to use for cancel
const originalProfileData = ref(null);

// Computed property for form initial values that reactively updates with userProfile
const formInitialValues = computed(() => {
  const profile = userProfile.value || {};
  console.log("Country value from profile:", profile.country);

  return {
    firstName: profile.firstname || "",
    middleName: profile.middlename || "",
    lastName: profile.lastname || "",
    email: profile.email || "",
    birthdate: profile.birthdate || "",
    phone: {
      number: profile.phone?.number || "",
      country_code: profile.phone?.country_code || "",
    },
    country:
      typeof profile.country === "object"
        ? profile.country?.id || profile.country?.value || ""
        : profile.country || "",
  };
});

// Cancel edit and revert to original data
const cancelEdit = () => {
  // Reset the form by refreshing the user profile
  fetchUserProfile();
  // Exit edit mode
  isEditMode.value = false;
};

// Update profile handler
const updateProfile = async (values) => {
  console.log("Form values being submitted:", values);

  const formData = new FormData();

  formData.append("firstname", values.firstName);
  formData.append("middlename", values.middleName || "");
  formData.append("lastname", values.lastName);
  formData.append("email", values.email);
  formData.append("phone[number]", values.phone.number);
  formData.append("phone[country_code]", values.phone.country_code);
  formData.append("birthdate", values.birthdate || "");

  // Handle country value - ensure it's not an object
  const countryValue =
    typeof values.country === "object"
      ? values.country?.id || values.country?.value || ""
      : values.country || "";
  formData.append("country", countryValue);

  try {
    const response = await _post("/update-account", formData);

    // Refresh user profile after update
    await fetchUserProfile();

    // Exit edit mode
    isEditMode.value = false;
  } catch (err) {
    // Keep in edit mode on error so user can fix issues
  }
};

onMounted(async () => {
  try {
    await fetchUserProfile();
    formReady.value = true;
  } catch (error) {}
});
</script>
