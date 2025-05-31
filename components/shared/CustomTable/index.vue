<template>
  <v-container class="pa-0">
    <v-data-table
      :headers="formattedHeaders"
      :items="data"
      class="w-100 my-custom-table"
      hide-default-footer
      :loading="loading"
      :items-per-page="-1"
      density="compact"
    >
      <template
        v-for="header in props.tableHeaders"
        #[`item.${header}`]="{ item }"
      >
        <div :key="header">
          <slot
            :name="`cell-${header}`"
            :item="item"
            v-if="$slots[`cell-${header}`]"
          ></slot>
          <template v-else>
            {{ getCellValue(item, header) }}
          </template>
        </div>
      </template>

      <template #header="{ props: { headers } }">
        <thead class="custom-header">
          <tr>
            <th
              v-for="header in headers"
              :key="header.key"
              :class="['text-right', 'px-4', 'py-3']"
            >
              {{ header.title }}
            </th>
          </tr>
        </thead>
      </template>
    </v-data-table>

    <Pagination
      :length="pageCount"
      :currentPage="safePage"
      @update:page="handlePageChange"
    />
  </v-container>
</template>

<script setup>
import { onMounted, ref, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useApi } from "@/composables/useApi";

const { t } = useI18n();
const emit = defineEmits(["update:page"]);

const data = ref([]);
const pageCount = ref(0);
const loading = ref(false);
let isRequesting = false;

const props = defineProps({
  URLEndpoint: {
    type: String,
    required: true,
  },
  tableHeaders: {
    type: Array,
    required: true,
  },
  headerLabels: {
    type: Object,
    default: () => ({}),
  },
  page: {
    type: Number,
    required: true,
    validator: (value) => {
      const num = Number(value);
      if (isNaN(num) || num < 1) {
        console.warn(`Invalid page value: ${value}. Must be a number >= 1.`);
        return false;
      }
      return true;
    },
  },
  headerFieldMapping: {
    type: Object,
    default: () => ({}),
  },
});

const safePage = computed(() => {
  const pageValue = Number(props.page);
  return isNaN(pageValue) || pageValue < 1 ? 1 : pageValue;
});

const formattedHeaders = computed(() => {
  return props.tableHeaders.map((header) => ({
    title: props.headerLabels[header] || t(`table.${header}`) || header,
    key: header,
    align: "right",
    sortable: false,
  }));
});

const { _get } = useApi();

async function getData() {
  if (!props.URLEndpoint || isRequesting) return;

  loading.value = true;
  isRequesting = true;

  try {
    const response = await _get(`${props.URLEndpoint}?page=${safePage.value}`);
    data.value = response.data.data || [];
    pageCount.value = response.data.meta?.last_page || 1;
  } catch (error) {
    console.error("Error fetching data:", error);
    data.value = [];
  } finally {
    loading.value = false;
    isRequesting = false;
  }
}

function handlePageChange(newPage) {
  const pageNum = Number(newPage);
  if (isNaN(pageNum) || pageNum < 1) {
    console.warn(`Invalid page change value: ${newPage}. Emitting 1.`);
    emit("update:page", 1);
  } else {
    emit("update:page", pageNum);
  }
}

function getCellValue(item, header) {
  const fieldPath = props.headerFieldMapping[header] || header;

  if (typeof fieldPath === "object") {
    return "";
  }

  return getNestedValue(item, fieldPath);
}

function getNestedValue(obj, path) {
  if (!obj || !path) return "";

  if (typeof path === "string") {
    return path.split(".").reduce((acc, part) => {
      if (acc === null || acc === undefined) return "";
      return acc[part];
    }, obj);
  }

  return "";
}

onMounted(() => {
  getData();
});

watch(() => safePage.value, getData);

defineExpose({
  refresh: getData,
});
</script>

<style scoped>
.my-custom-table :deep(th) {
  background-color: var(--bg-input) !important;
  color: var(--text-color) !important;
}

.my-custom-table :deep(td) {
  color: var(--text-color) !important;
}
</style>