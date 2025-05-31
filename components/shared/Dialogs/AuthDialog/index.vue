<template>
  <v-dialog
    v-model="dialogModel"
    max-width="580px"
    max-height="500px"
    persistent
    no-click-animation
  >
    <v-card class="pa-4" rounded="xl">
      <div class="d-flex justify-center">
        <div class="gradient-banner"></div>
      </div>

      <div class="text-center my-4">
        <h2 class="font-weight-bold text-text">
          {{ $t("dialog.login") }}
        </h2>
      </div>

      <Image name="authLogin" class="d-flex justify-center" />

      <div class="text-center my-4">
        <p class="text-text">
          {{ $t("dialog.description") }}
        </p>
      </div>

      <div class="w-50 mx-auto pa-0 mt-4">
        <Button
          elevation="0"
          class="button--gradient-filled w-100"
          :text="$t('button.login')"
          @click="redirectToLogin"
        />
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { useLocalePath } from "#imports";

const router = useRouter();
const route = useRoute();
const i18n = useI18n();
const localePath = useLocalePath();

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  redirectPath: {
    type: String,
    default: "/",
  },
});

const emit = defineEmits(["update:modelValue", "login", "close"]);

const dialogModel = computed({
  get: () => props.modelValue,
  set: (value) => {
    if (!value) {
      emit("close");
    }
    emit("update:modelValue", value);
  },
});

const handlePopState = () => {
  dialogModel.value = false;
};

onMounted(() => {
  window.addEventListener("popstate", handlePopState);
});

onUnmounted(() => {
  window.removeEventListener("popstate", handlePopState);
});

const redirectToLogin = () => {
  emit("login");
  
  const loginPath = localePath({
    path: "/login",
    query: { redirect: props.redirectPath }
  });
  
  router.push(loginPath);
};
</script>

<style scoped></style>