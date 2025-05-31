<template>
  <div>
    <label class="input__label text-body-2 text-md-body-1" :for="id">{{ label }}</label>
    <v-text-field
      :prepend-inner-icon="prependIcon"
      :append-inner-icon="appendIcon"
      :id="id"
      variant="outlined"
      :model-value="value"
      @update:model-value="handleInput"
      @blur="handleBlur"
      :error-messages="errorMessage || apiError"
      :rounded="rounded"
      :class="customClass"
      v-bind="$attrs"
      bg-color="bg-input"
      :placeholder="placeholder"
      :color="iconColor"
      class="shadow-all-round "



    ></v-text-field>
    <p v-if="description" class="input__description">{{ description }}</p>
  </div>
</template>

<script setup>
import { useField } from "vee-validate";

const props = defineProps({
  id: String,
  label: String,
  name: {
    type: String,
    required: true,
  },
  rules: {
    type: String,
    default: "",
  },
  apiError: {
    type: Array,
    default: null,
  },
  rounded: String,
  customClass: String,
  placeholder: {
    type: String,
    default: "",
  },
  prependIcon: {
    type: String,
    default: "",
  },
  appendIcon: {
    type: String,
    default: "",
  },
  iconColor: {
    type: String,
    default: "primary",
  },
  description: {
    type: String,
    default: null,
  },
});

const { value, errorMessage, handleBlur } = useField(props.name, props.rules, {
  validateOnValueUpdate: true,
  validateOnInput: true,
  validateOnBlur: true,
  label: props.label, // Add this to provide a proper label
});

const emit = defineEmits(["update:modelValue"]);
const handleInput = (newValue) => {
  if (typeof newValue === "string") {
    value.value = newValue;
    emit("update:modelValue", newValue);
  }
};
</script>