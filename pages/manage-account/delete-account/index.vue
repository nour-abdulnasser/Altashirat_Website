<template>
  <div class="delete-account">
    <v-container>
      <div class="delete-account__content rounded-lg border-sm">
        <div class="delete-account__top pa-5">
          <h3 class="delete-account__title mb-2">
            {{ $t("manageAccount.title") }}
          </h3>
          <p class="delete-account__desc d-flex align-center ga-2">
            {{ $t("manageAccount.delete") }}
            <Route to="/manage-account/confirm-delete">
              <v-icon>mdi-chevron-down</v-icon>
            </Route>
          </p>
        </div>
        <div class="delete-account__bottom text-center pa-5">
          <div
            class="delete-account__img d-flex justify-center align-center w-100 h-100"
          >
            <Image class="delete-account__img__child" name="delete" />
          </div>
          <p class="delete-account__desc my-5">
            {{ $t("manageAccount.deleteDesc") }}
          </p>
          <div
            class="delete-account__buttons d-flex align-center justify-center ga-5"
          >
            <Button
              class="delete-account__delete px-8"
              :text="$t('manageAccount.deleteButton')"
              @click="showPopup = true"
            />
            <Button
              class="delete-account__cancel px-8"
              :text="$t('manageAccount.cancelButton')"
              to="/manage-account"
            />
          </div>
        </div>
      </div>
    </v-container>

    <div
      v-if="showPopup"
      class="delete-popup__overlay pa-5 d-flex align-center justify-center"
      @click="showPopup = false"
    >
      <div class="delete-popup position-relative rounded-lg text-center pa-5" @click.stop>
        <h3 class="delete-popup__title">
          {{ $t("manageAccount.confirmDelete") }}
        </h3>
        <p class="delete-popup__desc mt-2">
          {{ $t("manageAccount.confirmDeleteDesc") }}
        </p>
        <Password
          id="password"
          :label="$t('fields.password')"
          class="mt-2"
          rounded="xl"
          rules="required"
          v-model="passwordValue"
          :placeholder="$t('placeholders.password')"
        />
        <div class="delete-popup__buttons d-flex align-center justify-center ga-5 mt-2">
          <Button
            class="delete-account__delete px-8"
            :text="$t('manageAccount.deleteButton')"
            @click="deleteAccount"
          />
          <Button
            class="delete-account__cancel px-8"
            :text="$t('manageAccount.cancelButton')"
            @click="showPopup = false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth-required"],
});
useSeoMeta({
  title: "Delete Account",
});

const router = useRouter();
const token = useCookie("auth-token");
const { _post } = useApi();

const showPopup = ref(false);
const passwordValue = ref(null);

const deleteAccount = async () => {
  try {
    const response = await _post("/delete-account", {
      password: passwordValue.value,
    });
    token.value = null;
    showPopup.value = false;
    router.push('/login')
  } catch (error) {
    throw error;
  }
};
</script>
