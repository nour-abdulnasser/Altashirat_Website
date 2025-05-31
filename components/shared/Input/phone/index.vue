<template>
  <div class="phone-component">
    <label v-if="showLabel" class="input__label text-body-2 text-md-body-1 mb-1 d-block">{{ label }}</label>
    <div class="d-flex phone-input-container">
      <Text
        :name="`${name}.number`"
        :rules="numberRules"
        :apiError="apiError?.number"
        :placeholder="$t('placeholders.phone.number')"
        prependIcon="mdi-cellphone"
        :iconColor="iconColor"
        :rounded="rounded ? `s-${rounded}` : 's-xl e-0'"
        :customClass="customClass"
        class="phone__text mb-0 flex-grow-1"
        custom-class="border-e-0"
        :disabled="disabled"
        density="comfortable"
      />

      <Countries
        :name="`${name}.country_code`"
        :rules="countryRules"
        :apiError="apiError?.country_code"
        bg-color="primary"
        :rounded="rounded ? `e-${rounded}` : 'e-xl s-0'"
        displayMode="phone_code"
        class="phone__code py-1 no-menu-icon"
        :disabled="disabled"
        hide-details
        density="comfortable"
        width="auto"
        min-width="100px"
      />
    </div>
    <p v-if="inputDescription" class="input__description text-caption mt-1">
      {{ inputDescription }}
    </p>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  name: { type: String, required: true },
  label: { type: String, default: "Phone" },
  countryRules: { type: String, default: "required" },
  numberRules: { type: String, default: "required" },
  apiError: { type: Object, default: () => ({}) },
  inputDescription: String,
  modelValue: { type: Object, default: () => ({}) },
  iconColor: { type: String, default: "primary" },
  rounded: String,
  customClass: String,
  showLabel: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

// Local state for v-model
const countryCode = ref(props.modelValue.country_code || "");
const phoneNumber = ref(props.modelValue.number || "");

// Sync local state with parent via v-model
watch([countryCode, phoneNumber], ([newCountryCode, newPhoneNumber]) => {
  emit("update:modelValue", {
    country_code: newCountryCode,
    number: newPhoneNumber,
  });
});

// Sync parent modelValue changes back to local state
watch(
  () => props.modelValue,
  (newValue) => {
    countryCode.value = newValue.country_code || "";
    phoneNumber.value = newValue.number || "";
  },
  { deep: true }
);
</script>