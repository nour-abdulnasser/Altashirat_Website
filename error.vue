<template>
  <v-container fluid class="fill-height">
    <v-row class="d-flex justify-center align-center flex-column">
      <v-col cols="12" sm="8" md="6" lg="6" class="mt-10">
        <div class="error-text" v-if="error.statusCode === 404" name="404">
          <h2 class="error-title py-2 mb-5 px-3" :style="handleBorder">{{ $t("error.title") }}</h2>
          <p class="error-desc">{{ $t("error.desc") }}</p>
        </div>

        <h2 v-else class="text-h2 mb-6">{{ error.statusCode || "Error" }}</h2>

        <Route to="/">
          <Button
            size="large"
            class="mt-6 button--gradient-filled"
            :text="$t('button.backToHome')"
          />
        </Route>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const { locale } = useI18n()

const handleBorder = computed(() => ({
  borderWidth: locale.value === 'en' ? '0px 0px 0px 10px' : '0px 10px 0px 0px',
  borderStyle: 'solid',
  borderColor: '#403f68'
}))

const props = defineProps({
  error: Object,
});

const error = props.error;

onUnmounted(() => {
  clearError();
});
</script>
