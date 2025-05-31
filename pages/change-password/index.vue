<template>
  <div class="profile">
    <v-container fluid class="mt-14 d-flex align-center justify-center">
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
              <Image name="change-password" class="me-2 ms-2" />
              <span
                :class="[
                  'text-text m-2',
                  $vuetify.display.xs ? 'text-subtitle-2' : '',
                  $vuetify.display.sm ? 'text-subtitle-1' : '',
                  $vuetify.display.mdAndUp ? 'text-h5' : '',
                ]"
              >
                {{ $t("changePassword.title") }}
              </span>
            </div>
          </div>
        </v-card-title>

        <Form
          @submit="savePassword"
          class="d-flex justify-center flex-column align-center pa-6"
        >
          <v-container fluid>
            <v-row>
              <v-col cols="12" md="6">
                <Password
                  class="w-100 text-text"
                  :apiError="fieldErrors?.old_password"
                  name="old_password"
                  rules="required"
                  :label="$t('changePassword.labels.currentPassword')"
                  id="currentPassword"
                  rounded="xl"
                  :placeholder="$t('placeholders.currentPassword')"
                  iconColor="icon-input"
                  autocomplete="current-password"
                />

                <Password
                  class="w-100 text-text"
                  :apiError="fieldErrors?.new_password_confirmation"
                  name="new_password_confirmation"
                  rules="required|confirmed:@new_password"
                  :label="$t('changePassword.labels.confirmPassword')"
                  id="confirmPassword"
                  rounded="xl"
                  :placeholder="$t('placeholders.confirmPassword')"
                  iconColor="icon-input"
                  autocomplete="new-password"
                />
              </v-col>
              <v-col cols="12" md="6">
                <Password
                  class="w-100 text-text"
                  :apiError="fieldErrors?.new_password"
                  name="new_password"
                  rules="required|min:8|max:50"
                  :label="$t('changePassword.labels.newPassword')"
                  id="newPassword"
                  rounded="xl"
                  :placeholder="$t('placeholders.newPassword')"
                  iconColor="icon-input"
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

.profile__submit-btn {
  .v-btn__content {
    span {
      margin: 0 !important;
    }
  }
}
</style>

<script setup>
import { computed, onBeforeUnmount } from "vue";
import { storeToRefs } from "pinia";

definePageMeta({
  layout: "profile",
});
useSeoMeta({
  title: "Change Password",
});

const router = useRouter();
const { _post, isLoading } = useApi();

const appLocaleStore = useAppLocaleStore();
const { appLocale } = storeToRefs(appLocaleStore);

const apiErrorStore = useApiErrorStore();
const { fieldErrors } = storeToRefs(apiErrorStore);

const pseudoClassDirection = computed(() =>
  appLocale.value === "ar" ? "pseudo-rtl" : "pseudo-ltr"
);

// Password change handler
const savePassword = async (values) => {
  // Clear any previous errors
  apiErrorStore.clearErrors();

  // Create FormData instance
  const formData = new FormData();

  // Append password data
  formData.append("old_password", values.old_password);
  formData.append("new_password", values.new_password);
  formData.append(
    "new_password_confirmation",
    values.new_password_confirmation
  );

  try {
    // Send password change request
    await _post("/change-password", formData);
    await router.push("/");
  } catch (err) {
    throw err;
    // Stay on the page to allow user to fix errors
  }
};

onBeforeUnmount(() => {
  apiErrorStore.clearErrors();
});
</script>