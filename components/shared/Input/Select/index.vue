<template>
  <div>
    <label class="input__label text-body-2 text-md-body-1" :for="name">{{
      t(`fields.${name}`)
    }}</label>
    <v-select
      :id="name"
      :items="items"
      :model-value="value"
      @update:model-value="handleInput"
      variant="outlined"
      :error-messages="errorMessage || apiError"
      @blur="handleBlur"
      :rounded="rounded"
      :class="customClass"
      bg-color="bg-input"
      :placeholder="placeholder"
      class="shadow-all-round"
      :prepend-inner-icon="prependIcon"
      :append-inner-icon="appendIcon"
      v-bind="$attrs"
    >

      <template v-slot:append-inner>
        <svg
          width="17"
          height="17"
          viewBox="0 0 17 17"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 4.88a1.138 1.138 0 0 0-2.016-.75l-5.966 6.964-5.963-6.963a1.138 1.138 0 1 0-1.722 1.478l6.82 7.972a1.138 1.138 0 0 0 1.732 0l6.828-7.972c.179-.202.28-.46.287-.73z"
            fill="#B2AECC"
            fill-rule="evenodd"
          />
        </svg>
      </template>
      <template v-for="(_, slotName) in $slots"  v-slot:[slotName]="slotData">
        <slot :name="slotName" v-bind="slotData || {}"></slot>
      </template>
    </v-select>
    <p v-if="description" class="input__description">{{ description }}</p>
  </div>
</template>

<script setup>
import { useField } from "vee-validate";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
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
});

const emit = defineEmits(["update:modelValue"]);
const handleInput = (newValue) => {
  if (newValue) {
    value.value = newValue;
    emit("update:modelValue", newValue);
  }
};
</script>