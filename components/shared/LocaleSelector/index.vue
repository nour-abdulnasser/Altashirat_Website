<template>
  <div>
    <v-select
      v-bind="$attrs"
      label=""
      flat
      class="locale__select"
      variant="solo-filled"
      :class="$attrs.class"
      :items="localeItems"
      item-title="nativeName"
      item-value="code"
      :model-value="modelValue"
      @update:modelValue="onLocaleChange"
      dense
    >
      <!-- Custom item template for dropdown options -->
      <template v-slot:item="{ item, props }">
        <v-list-item v-bind="props">
          <template v-slot:prepend>
            <span class="flag-emoji me-2">{{ item.raw.flag }}</span>
          </template>
        </v-list-item>
      </template>

      <!-- Custom selection template for the selected value display -->
      <template v-slot:selection="{ item }">
        <div class="d-flex align-center">
          <span class="flag-emoji me-2">
            {{ getFlag(item.value || item.code) }}
          </span>
          {{ item.title || item.nativeName }}
        </div>
      </template>
    </v-select>
  </div>
</template>

<script setup>
// Passing handler function as a prop to have versatility in functionality.
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  onLocaleSelected: {
    type: Function,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue"]);

const localeItems = [
  { code: "en", nativeName: "English", flag: "🇬🇧" },
  { code: "ar", nativeName: "العربية", flag: "🇸🇦" },
];

function getFlag(code) {
  const item = localeItems.find((item) => item.code === code);
  return item ? item.flag : "";
}

// Handler function that calls both the custom handler and emits the update event
function onLocaleChange(value) {
  // Emit the update event for v-model

  emit("update:modelValue", value);

  // Call the custom handler function if provided
  if (props.onLocaleSelected) {
    props.onLocaleSelected(value);
  }
}
</script>

<style lang="scss" scoped>
.flag-emoji {
  font-family: "Noto Color Emoji", sans-serif;
  font-size: 1.2em;
}

</style>