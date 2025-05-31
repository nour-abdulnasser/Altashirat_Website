<template>
  <div class="country-select-wrapper" :style="wrapperStyle">
    <Field
      :name="name"
      :rules="rules"
      v-slot="{ field: countryField, errorMessage }"
      :validateOnInput="true"
      class="pa-0"
    >
      <v-select
        :prepend-inner-icon="prependInnerIcon"
        v-bind="countryField"
        :items="countryItems"
        item-value="value"
        item-title="display"
        :model-value="countryField.value"
        @update:model-value="handleInput"
        :error-messages="errorMessage || apiError"
        :class="[
          customClass,
          { 'no-menu-icon': displayMode === 'phone_code' },
          { 'shadow-all-round': displayMode === 'name' },
          'country-select',
        ]"
        :style="{
          maxWidth: maxWidth || 'auto',
          width: width || 'auto',
          minWidth: minWidth || 'auto',
        }"
        :placeholder="isLoading ? 'Loading...' : (placeholder || 'Select')"
        :rounded="rounded"
        :bg-color="bgColor"
        :disabled="disabled || isLoading"
        :loading="isLoading"
        :density="density || 'default'"
        hide-details="auto"
        class="pa-0"
      >
        <template v-slot:item="{ item, props: slotProps }">
          <v-list-item v-bind="slotProps">
            <template v-slot:append>
              <span class="flag-emoji">{{ item.raw.flag }}</span>
            </template>
            <template v-slot:title>
              <span
                class="ms-1"
                :dir="displayMode === 'phone_code' ? 'ltr' : ''"
              >
                {{ item.raw.display }}
              </span>
            </template>
          </v-list-item>
        </template>
        <template v-slot:selection="{ item }">
          <div class="d-flex align-center justify-center pa-0">
            <span
              class="mx-1"
              :dir="displayMode === 'phone_code' ? 'ltr' : ''"
              >{{ item.raw.display }}</span
            >
            <span class="flag-emoji ms-2">{{ item.raw.flag }}</span>
          </div>
        </template>
      </v-select>
    </Field>
  </div>
</template>

<script setup>
import { Field } from "vee-validate";
import { useCountriesStore } from "@/stores/countries";
import { ref, onMounted, watch, computed } from "vue";

const props = defineProps({
  name: { type: String, required: true },
  rules: { type: String, default: "" },
  apiError: { type: [String, Array], default: null },
  modelValue: { type: [String, Number], default: "" },
  rounded: String,
  customClass: String,
  displayMode: {
    type: String,
    default: "code",
    validator: (value) => ["code", "name", "phone_code"].includes(value),
  },
  placeholder: String,
  maxWidth: String,
  minWidth: String,
  density: String,
  width: String,
  bgColor: {
    type: String,
    default: "bg-input",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  height: {
    type: String,
    default: "",
  },
  prependInnerIcon: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const countriesStore = useCountriesStore();
const isLoading = ref(true);
const countryItems = ref([]);

// Set wrapper style to maintain consistent height
const wrapperStyle = computed(() => {
  const baseStyle = {};
  
  // If height is specified, use it
  if (props.height) {
    baseStyle.height = props.height;
  } else {
    // Otherwise use a default height based on density
    const heightMap = {
      'default': '56px',
      'comfortable': '44px',
      'compact': '40px'
    };
    
    baseStyle.minHeight = heightMap[props.density || 'default'];
  }
  
  return baseStyle;
});

// Function to format phone code from "00XX" to "(+XX)"
const formatPhoneCode = (phoneCode) => {
  // Remove leading zeros (00)
  const cleanCode = phoneCode.replace(/^00/, "");
  // Format as (+XX)
  return `(+${cleanCode})`;
};

onMounted(async () => {
  isLoading.value = true;
  
  // Add a placeholder item during loading
  if (props.displayMode === 'phone_code') {
    countryItems.value = [{ value: "", display: "(+--)", flag: "🌐" }];
  } else {
    countryItems.value = [{ value: "", display: "Loading...", flag: "🌐" }];
  }
  
  try {
    const countries = await countriesStore.fetchAllCountries();
    if (countries && Array.isArray(countries)) {
      countryItems.value = countries.map((country) => {
        // Determine which field to use as the value based on displayMode
        let valueField;
        switch (props.displayMode) {
          case "name":
            valueField = country.id; // Use country ID when displaying country names
            break;
          case "phone_code":
            valueField = country.phone_code; // Keep original value for internal use
            break;
          case "code":
          default:
            valueField = country.code;
        }

        // Determine what to display based on displayMode
        let displayField;
        switch (props.displayMode) {
          case "name":
            displayField = country.name;
            break;
          case "phone_code":
            // Format phone code for display only
            displayField = formatPhoneCode(country.phone_code);
            break;
          case "code":
          default:
            displayField = country.code;
        }

        return {
          value: valueField || "",
          display: displayField || "",
          flag: country.flag || "🏳️",
          // Store all data for reference if needed
          fullData: { ...country },
        };
      });

      if (props.modelValue) {
        const modelValueString = String(props.modelValue);
        const found = countryItems.value.some(item => 
          String(item.value) === modelValueString
        );
        
        if (found) {
          emit("update:modelValue", props.modelValue);
        }
      }
    } else {
      console.warn("No valid countries data returned");
      const fallbackData = getFallbackData();
      countryItems.value = [fallbackData];
    }
  } catch (error) {
    console.error("Error fetching countries:", error);
    const fallbackData = getFallbackData();
    countryItems.value = [fallbackData];
  } finally {
    isLoading.value = false;
  }
});

// Helper function to get fallback data based on display mode
const getFallbackData = () => {
  switch (props.displayMode) {
    case "name":
      return { value: 1, display: "Saudi Arabia", flag: "🇸🇦" }; // Use ID 1 for Saudi Arabia
    case "phone_code":
      return { value: "00966", display: "(+966)", flag: "🇸🇦" }; // Formatted display
    case "code":
    default:
      return { value: "sa", display: "sa", flag: "🇸🇦" };
  }
};

const handleInput = (newValue) => {
  emit("update:modelValue", newValue);
};

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      // Convert both to strings for comparison to handle number/string mismatch
      const modelValueString = String(newValue);
      const found = countryItems.value.some(item => 
        String(item.value) === modelValueString
      );
      
      if (!found && countryItems.value.length > 0) {
        // If new value isn't valid, we might want to handle this
        console.warn('Selected value not found in country items');
      }
    }
  }
);
</script>

<style scoped>
.country-select-wrapper {
  display: block;
  width: 100%;
}

/* Additional CSS to ensure consistent height during loading */
:deep(.v-select .v-field) {
  min-height: inherit;
}


:deep(.v-select.country-select) {
  min-height: inherit;
}
</style>