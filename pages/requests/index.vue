<template>
  <v-card
    class="card__profile rounded-xl mx-auto border-sm w-50 my-16"
    elevation="0"
  >
    <v-container fluid class="pa-0">
      <div class="d-flex justify-center mt-4">
        <Button
          :text="$t('navbar.orderTourismVisa')"
          class="button--primary-filled"
          icon="tourism"
        />
      </div>
      <div class="d-flex justify-center mt-4">
        <CustomTable
          v-if="!loading && data.length > 0"
          :URLEndpoint="URLEndpoint"
          :tableHeaders="tableHeaders"
          :headerLabels="headerLabels"
          :loading="loading"
          :page="page"
          class="w-100"
          :headerFieldMapping="headerFieldMapping"
          @update:page="handlePageChange"
        >
          <template #cell-status="{ item }">
            <v-chip
              variant="text"
              size="medium"
              :color="getStatusColor(item.statuses)"
            >
              {{ $t(`${getActiveStatus(item.statuses).toLowerCase()}`) }}
            </v-chip>
          </template>

          <template #cell-destination_country="{ item }">
            <div class="d-flex align-center text-text">
              <span class="me-1 emoji-container flag-emoji">{{
                item.destination_country?.flag
              }}</span>
              <span>{{ item.destination_country?.name }}</span>
            </div>
          </template>

          <template #cell-created_at="{ item }">
            {{ formatDate(getRequestDate(item.statuses)) }}
          </template>

          <template #cell-actions="{ item }">
            <v-btn
              icon
              size="large"
              color="primary"
              variant="text"
              @click="openRequestDialog(item.id)"
              :loading="loadingDetails && selectedRequestId === item.id"
            >
              <svg
                width="35"
                height="34"
                viewBox="0 0 35 34"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="none" fill-rule="evenodd">
                  <rect fill="#F1F4FB" width="35" height="34" rx="8" />
                  <g fill="#4426F5" fill-rule="nonzero">
                    <path
                      d="M18 13.75c-2.131 0-3.862 1.681-3.862 3.75s1.731 3.75 3.862 3.75c2.131 0 3.862-1.681 3.862-3.75S20.131 13.75 18 13.75zm-.293 2.638c-.48 0-.879.388-.879.853h-1.279a2.152 2.152 0 0 1 2.158-2.094v1.24z"
                    />
                    <path
                      d="M29.72 16.724C28.415 15.147 23.754 10 18 10c-5.754 0-10.415 5.147-11.72 6.724-.373.44-.373 1.086 0 1.552C7.585 19.853 12.246 25 18 25c5.754 0 10.415-5.147 11.72-6.724.373-.44.373-1.086 0-1.552zM18 22.931c-3.09 0-5.594-2.431-5.594-5.431S14.91 12.069 18 12.069c3.09 0 5.594 2.431 5.594 5.431S21.09 22.931 18 22.931z"
                    />
                  </g>
                </g>
              </svg>

              <v-tooltip activator="parent" location="top">
                {{ $t("table.viewDetails") }}
              </v-tooltip>
            </v-btn>
          </template>
        </CustomTable>
        <Skeleton
          v-else-if="loading"
          class="w-100 mt-3 mx-auto my-custom-table"
          height="400"
          type="table"
        />
        <div
          v-else
          class="d-flex flex-column align-center justify-center w-100 ma-8"
        >
          <Image name="noRequests" class="no-requests-img" />
          <h3 class="text-center mt-4 text-text">
            {{ $t("table.noRequests") }}
          </h3>
        </div>
      </div>
    </v-container>

    <!-- Request Details Dialog -->
    <VisaDialog
      v-model="showRequestDialog"
      :request="requestDetails"
      @close="closeRequestDialog"
    />
  </v-card>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useApi } from "@/composables/useApi";

definePageMeta({
  layout: "profile",
  middleware: ["auth-required"],
});

const { t } = useI18n();
const { _get } = useApi();
const page = ref(1);
const loading = ref(false);
const loadingDetails = ref(false);
const data = ref([]);
const showRequestDialog = ref(false);
const selectedRequestId = ref(null);
const requestDetails = ref(null);
const URLEndpoint = "/tourism-visa";

const tableHeaders = [
  "id",
  "created_at",
  "firstname",
  "destination_country",
  "status",
  "actions",
];

const headerLabels = computed(() => ({
  id: t("table.id"),
  created_at: t("table.created_at"),
  firstname: t("table.firstname"),
  destination_country: t("table.destination_country"),
  status: t("table.status"),
  actions: t("table.actions"),
}));

const headerFieldMapping = {
  id: "id",
  created_at: "statuses",
  firstname: "firstname",
  destination_country: "destination_country",
  status: "statuses",
  actions: "actions",
};

async function openRequestDialog(requestId) {
  selectedRequestId.value = requestId;
  loadingDetails.value = true;
  showRequestDialog.value = true;

  try {
    const response = await _get(`${URLEndpoint}/${requestId}`);
    requestDetails.value = response.data.tourism_visa;
  } catch (error) {
    console.error("Error fetching request details:", error);
    showRequestDialog.value = false;
  } finally {
    loadingDetails.value = false;
  }
}

function closeRequestDialog() {
  showRequestDialog.value = false;
  selectedRequestId.value = null;
  requestDetails.value = null;
}

async function fetchData() {
  if (!URLEndpoint) return;
  loading.value = true;
  try {
    const response = await _get(`${URLEndpoint}?page=${page.value}`);
    data.value = response.data.data || [];
  } catch (error) {
    console.error("Error fetching data:", error);
    data.value = [];
  } finally {
    loading.value = false;
  }
}

function handlePageChange(newPage) {
  const pageNum = Number(newPage);
  if (isNaN(pageNum) || pageNum < 1) {
    console.warn(`Invalid page change value: ${newPage}. Setting to 1.`);
    page.value = 1;
  } else {
    page.value = pageNum;
  }
  fetchData();
}

function getRequestDate(statuses) {
  if (!statuses || !statuses.length) return "";
  return statuses[0]?.activated_at || "";
}

function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function getActiveStatus(statuses) {
  if (!statuses || !statuses.length) return "";

  const activeStatuses = statuses
    .filter((status) => status.active && status.activated_at)
    .sort((a, b) => new Date(b.activated_at) - new Date(a.activated_at));

  return activeStatuses.length > 0 ? activeStatuses[0].name : statuses[0].name;
}

function getStatusColor(statuses) {
  if (!statuses || !statuses.length) return "grey";

  const activeStatuses = statuses
    .filter((status) => status.active && status.activated_at)
    .sort((a, b) => new Date(b.activated_at) - new Date(a.activated_at));

  return activeStatuses.length > 0
    ? activeStatuses[0].color
    : statuses[0].color;
}

onMounted(() => {
  fetchData();
});

defineExpose({
  refresh: fetchData,
});
</script>

<style lang="scss" scoped>
.card__profile {
  max-width: 1200px;
  margin-top: 100px;
}

@media (max-width: 1200px) {
  .card__profile {
    width: 90% !important;
  }
}
</style>
