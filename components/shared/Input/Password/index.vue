<template>
  <div>
    <label class="input__label text-body-2 text-md-body-1" :for="id">{{
      label
    }}</label>

    <v-text-field
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      :prepend-inner-icon="prependIcon"
      @click:append-inner="toggleVisibility"
      :id="id"
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
      class="shadow-all-round py-1"
      variant="outlined"
      :autocomplete="autocompleteValue"
    ></v-text-field>
  </div>
</template>

<script setup>
import { ref } from "vue";
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
    required: true,
  },
  apiError: {
    type: Array,
    default: null,
  },
  rounded: String,
  customClass: String,
  placeholder: {
    type: String,
    default: "Enter password",
  },
  autocompleteValue: {
    type: String,
    default: "password",
  },
  iconColor: {
    type: String,
    default: "primary",
  },
  prependIcon: {
    type: String,
    default: "mdi-lock-outline",
  },
  description: String,
  modelValue: String,
});

const { value, errorMessage, handleBlur } = useField(props.name, props.rules, {
  validateOnValueUpdate: true,
  validateOnInput: true,
  validateOnBlur: true,
});

const emit = defineEmits(["update:modelValue"]);
const visible = ref(false);

const toggleVisibility = () => {
  visible.value = !visible.value;
};
const handleInput = (newValue) => {
  if (typeof newValue === "string") {
    value.value = newValue;
    emit("update:modelValue", newValue);
  }
};
</script>
