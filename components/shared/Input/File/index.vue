<template>
  <div class="file-upload-wrapper">
    <label v-if="title" class="input__label text-body-2 text-md-body-1">
      {{ title }}
    </label>
    <v-file-input
      v-model="fileModel"
      :multiple="multiple"
      :accept="accept"
      :label="label"
      :prepend-inner-icon="prependInnerIcon"
      variant="outlined"
      :error="!!computedErrorMessage"
      :error-messages="computedErrorMessage"
      :hint="computedHint"
      persistent-hint
      :counter="counter"
      :show-size="showSize"
      class="file-input shadow-all-round"
      clearable
      :rounded="rounded"
      :placeholder="placeholder"
      :color="iconColor"
      bg-color="bg-input"
      @blur="validateOnImmediate"
      @update:model-value="updateFiles"
      v-bind="$attrs"
    >
      <template #append-inner>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.69 10.104C19.378 6.134 16.048 3 12 3a7.66 7.66 0 0 0-7.395 5.53A6.86 6.86 0 0 0 0 15a6.865 6.865 0 0 0 6.857 6.857H18c3.309 0 6-2.691 6-6 0-2.699-1.774-5.016-4.31-5.753zm-3.47 2.653a.859.859 0 0 1-.791.529h-1.715v3.428a1.715 1.715 0 0 1-3.428 0v-3.428H8.57a.859.859 0 0 1-.606-1.463l3.429-3.429a.855.855 0 0 1 1.212 0l3.429 3.429a.857.857 0 0 1 .186.934z"
            fill="#B2AECC"
            fill-rule="evenodd"
          />
        </svg>
      </template>
      <template v-for="(_, slotName) in $slots" v-slot:[slotName]="slotData">
        <slot :name="slotName" v-bind="slotData || {}"></slot>
      </template>
    </v-file-input>
    <div
      v-if="preview && fileModel && fileModel.length"
      class="file-preview mt-3"
    >
      <div class="mb-3">
        <v-chip
          color="primary"
          variant="elevated"
          size="small"
          class="file-count-chip"
        >
          {{ filesCountText }}
        </v-chip>
      </div>
      <div class="preview-grid">
        <div v-for="(file, index) in fileModel" :key="index" class="file-card">
          <v-icon :icon="getFileIcon(file)" class="me-3 file-icon"></v-icon>
          <div class="file-info">
            <span class="file-name" :title="file.name">{{
              truncateFileName(file.name)
            }}</span>
            <span class="file-size">{{ formatFileSize(file.size) }}</span>
          </div>
          <v-btn
            icon="mdi-close-circle"
            variant="text"
            size="small"
            class="remove-btn"
            @click="removeFile(index)"
          ></v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useField } from "vee-validate";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
  rules: {
    type: [Array, Function, String],
    default: () => [],
  },
  hint: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "Select files",
  },
  placeholder: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [FileList, Array, File, null],
    default: null,
  },
  title: {
    type: String,
    default: "",
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  accept: {
    type: String,
    default: "*",
  },
  prependInnerIcon: {
    type: String,
    default: "",
  },
  variant: {
    type: String,
    default: "outlined",
  },
  rounded: {
    type: [Boolean, String],
    default: "xl",
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  counter: {
    type: [Boolean, Number, String],
    default: true,
  },
  showSize: {
    type: Boolean,
    default: false,
  },
  iconColor: {
    type: String,
    default: "primary",
  },
  apiError: {
    type: [String, Array],
    default: null,
  },
  required: {
    type: Boolean,
    default: false,
  },
  preview: {
    type: Boolean,
    default: true,
  },
  minFiles: {
    type: Number,
    default: 0,
  },
  maxFiles: {
    type: Number,
    default: null,
  },
  maxSize: {
    type: Number,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue"]);

const { value, errorMessage, setTouched, validate } = useField(
  props.name,
  computed(() => {
    let rules = props.rules;
    if (props.minFiles > 0) {
      rules += `|min_files:${props.minFiles}`;
    }
    if (props.maxFiles) {
      rules += `|max_files:${props.maxFiles}`;
    }
    if (props.maxSize) {
      rules += `|max_size:${props.maxSize}`;
    }
    return rules;
  }),
  {
    initialValue: props.modelValue || [],
  }
);

const computedErrorMessage = computed(() => {
  if (props.apiError) {
    return Array.isArray(props.apiError) ? props.apiError[0] : props.apiError;
  }
  return errorMessage.value;
});

const computedHint = computed(() => {
  const parts = [];
  if (props.accept.includes("image")) {
    parts.push("PNG or JPEG");
  } else if (props.accept.includes("pdf")) {
    parts.push("PDF");
  }
  if (props.maxSize) {
    parts.push(`max ${props.maxSize}KB each`);
  }
  return parts.join(" | ") || props.hint;
});

const internalFiles = ref(props.modelValue || []);

watch(
  () => props.modelValue,
  (newVal) => {
    internalFiles.value = newVal || [];
  },
  { immediate: true }
);

const fileModel = computed({
  get: () => internalFiles.value,
  set: (newValue) => {
    internalFiles.value = newValue
      ? Array.isArray(newValue)
        ? newValue
        : [newValue]
      : [];
  },
});

const filesCountText = computed(() => {
  const count = fileModel.value?.length || 0;
  const max = props.maxFiles || t("fileInput.noLimit");

  if (max === t("fileInput.noLimit")) {
    return t("fileInput.filesSelectedNoLimit", { count });
  } else {
    return t("fileInput.filesSelected", { count, max });
  }
});

const updateFiles = (newFiles) => {
  const filesArray = newFiles
    ? Array.isArray(newFiles)
      ? newFiles
      : [newFiles]
    : [];
  value.value = filesArray;
  emit("update:modelValue", filesArray);
  validate();
};

const removeFile = (index) => {
  const newFiles = [...internalFiles.value];
  newFiles.splice(index, 1);
  internalFiles.value = newFiles;
  value.value = newFiles;
  emit("update:modelValue", newFiles);
  validate();
};

const validateOnImmediate = () => {
  setTouched(true);
  validate();
};

const getFileIcon = (file) => {
  if (file.type.includes("pdf")) {
    return "mdi-file-pdf-box";
  } else if (file.type.includes("image")) {
    return "mdi-image";
  }
  return "mdi-file";
};

const truncateFileName = (name) => {
  if (name.length > 20) {
    const extensionIndex = name.lastIndexOf(".");
    if (extensionIndex > 0) {
      const namePart = name.substring(0, 12);
      const extension = name.substring(extensionIndex);
      return `${namePart}...${extension}`;
    }
    return `${name.substring(0, 17)}...`;
  }
  return name;
};

const formatFileSize = (bytes) => {
  if (!bytes) return "0 KB";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
};
</script>

<style scoped>
.file-input :deep(.v-field) {
  transition: border-color 0.3s ease;
}

.file-input :deep(.v-field__field) {
  padding: 14px 0px;
}
</style>
