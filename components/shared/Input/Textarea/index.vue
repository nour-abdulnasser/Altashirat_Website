<template>
  <div>
    <label class="input__label text-body-2 text-md-body-1" :for="id">{{
      label
    }}</label>
    <v-textarea
      :append-inner-icon="appendIcon"
      :id="id"
      variant="outlined"
      :model-value="value"
      @update:model-value="handleInput"
      @blur="handleBlur"
      :error-messages="errorMessage || apiError"
      :rounded="rounded"
      :class="customClass"
      v-bind="{ ...$attrs, rules: undefined }"
      bg-color="bg-input"
      :placeholder="placeholder"
      class="custom-textarea"
      :rows="rows"
      :auto-grow="autoGrow"
      :max-rows="maxRows"
      :no-resize="noResize"
    >
      <template v-slot:prepend-inner>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 .75C5.793.75.75 5.792.75 12a11.245 11.245 0 0 0 1.545 5.646L.77 22.221a.375.375 0 0 0 .474.475l4.376-1.459A11.24 11.24 0 0 0 12 23.25c6.209 0 11.25-5.041 11.25-11.25S18.21.75 12 .75zM8.242 10.875A1.13 1.13 0 0 1 9.366 12a1.13 1.13 0 0 1-1.125 1.125A1.13 1.13 0 0 1 7.117 12a1.13 1.13 0 0 1 1.124-1.125zm3.76 0A1.13 1.13 0 0 1 13.126 12 1.13 1.13 0 0 1 12 13.125 1.13 1.13 0 0 1 10.876 12 1.13 1.13 0 0 1 12 10.875zm3.74 0A1.13 1.13 0 0 1 16.866 12a1.13 1.13 0 0 1-1.125 1.125A1.13 1.13 0 0 1 14.616 12a1.13 1.13 0 0 1 1.125-1.125z"
            fill="#B2AECC"
            fill-rule="evenodd"
          />
        </svg>
      </template>
    </v-textarea>
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
  rows: {
    type: [Number, String],
    default: 5,
  },
  autoGrow: {
    type: Boolean,
    default: false,
  },
  maxRows: {
    type: [Number, String],
    default: 15,
  },
  noResize: {
    type: Boolean,
    default: false,
  },
});

const { value, errorMessage, handleBlur } = useField(props.name, props.rules, {
  validateOnValueUpdate: true,
  validateOnInput: true,
  validateOnBlur: true,
  label: props.label,
});

const emit = defineEmits(["update:modelValue"]);
const handleInput = (newValue) => {
  if (typeof newValue === "string") {
    value.value = newValue;
    emit("update:modelValue", newValue);
  }
};
</script>
<style scoped>
.v-textarea .v-field__input {
  transition: none !important;
  -webkit-mask-image: none !important;
  mask-image: none !important;
}
</style>