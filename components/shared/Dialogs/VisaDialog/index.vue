<template>
  <v-dialog
    v-model="dialogModel"
    max-width="1100px"
    persistent
    no-click-animation
    @update:model-value="onDialogUpdate"
  >
    <v-card class="pa-4" rounded="xl">
      <div class="d-flex justify-center">
        <div class="gradient-banner"></div>
      </div>

      <div class="text-center my-4">
        <h2 class="font-weight-bold text-text">
          {{ $t("dialog.tourismVisa") }}
        </h2>
      </div>

      <v-container
        fluid
        v-if="request && request.statuses"
        class="overflow-hidden-a"
      >
        <v-row>
          <v-col cols="12" md="6">
            <!-- Personal Information Card -->
            <v-card
              elevation="0"
              class="card__profile rounded-xl pt-2 px-2 mb-4 border-sm"
            >
              <v-card-title
                class="card__profile-title d-flex align-center pe-4 pt-4 pb-2"
                :class="[pseudoClassDirection]"
              >
                <div
                  class="d-flex align-center position-relative justify-start title-container"
                >
                  <div class="d-flex align-center">
                    <Image name="personalInfo" class="me-1 ms-1" />
                    <h5 class="text-text">
                      {{ $t("dialog.personalInfo") }}
                    </h5>
                  </div>
                </div>
              </v-card-title>
              <div class="pa-6">
                <div class="d-flex mb-4 align-center">
                  <v-icon class="me-1" size="small" color="secondary"
                    >mdi-account</v-icon
                  >
                  <h5 class="font-weight-medium text-text">
                    {{
                      [request.firstname, request.middlename, request.lastname]
                        .filter(Boolean)
                        .join(" ")
                    }}
                  </h5>
                </div>
                <div class="d-flex mb-4">
                  <v-icon class="me-1" size="small" color="secondary"
                    >mdi-cellphone</v-icon
                  >
                  <h5 dir="ltr" class="font-weight-medium text-text">
                    {{ formatPhone(request.phone) }}
                  </h5>
                </div>
                <div class="d-flex mb-4">
                  <div class="d-flex align-center">
                    <v-icon class="me-1" size="small" color="secondary"
                      >mdi-email</v-icon
                    >
                    <h5 class="font-weight-medium text-text">
                      {{ request.contact_email || request.email || "N/A" }}
                    </h5>
                  </div>
                </div>
              </div>
            </v-card>

            <!-- Status Timeline Card -->
            <v-card
              elevation="0"
              class="card__profile rounded-xl py-2 px-2 border-sm"
            >
              <v-card-title
                class="card__profile-title d-flex align-center pe-4 pt-4 pb-4"
                :class="[pseudoClassDirection]"
              >
                <div
                  class="d-flex align-center position-relative justify-start title-container"
                >
                  <div class="d-flex align-center">
                    <Image name="status" class="me-1 ms-1" />
                    <h5 class="text-text">
                      {{ $t("table.status") }}
                    </h5>
                  </div>
                </div>
              </v-card-title>
              <div class="pa-6">
                <div class="status-timeline" :class="{ 'rtl-timeline': isRTL }">
                  <div
                    v-for="(status, index) in currentStatuses"
                    :key="`${status.id}-${timelineKey}`"
                    class="timeline-item"
                    :class="{
                      active: status.active,
                      'last-item': index === currentStatuses.length - 1,
                      'first-item': index === 0,
                    }"
                  >
                    <div
                      class="timeline-dot"
                      :style="{ backgroundColor: getStatusColor(status) }"
                    >
                      <Image :name="status.active ? 'active' : 'notActive'" />
                    </div>
                    <div class="timeline-content">
                      <h5 class="text-text">
                        {{ $t(status.name) }}
                      </h5>
                      <div class="text-caption font-weight-bold text-text">
                        {{ formatDate(status.activated_at) }}
                      </div>
                    </div>
                    <div
                      v-if="index < currentStatuses.length - 1"
                      class="timeline-line"
                      :style="{
                        backgroundColor: getLineColor(
                          status,
                          currentStatuses[index + 1]
                        ),
                      }"
                    ></div>
                  </div>
                </div>
                <div
                  v-if="!currentStatuses.length"
                  class="text-medium-emphasis"
                >
                  {{ $t("dialog.noStatus") }}
                </div>
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" md="6">
            <v-card
              elevation="0"
              height="100%"
              class="card__profile rounded-xl py-2 px-2 border-sm"
            >
              <v-card-title
                class="card__profile-title d-flex align-center pe-4 pt-4 pb-2"
                :class="[pseudoClassDirection]"
              >
                <div
                  class="d-flex align-center position-relative justify-start title-container"
                >
                  <div class="d-flex align-center">
                    <Image name="visaInfo" class="me-1 ms-1" />
                    <h5 class="text-text  text-wrap">
                      {{ $t("orderVisa.title") }}
                    </h5>
                  </div>
                </div>
              </v-card-title>
              <div class="pa-6">
                <div class="d-flex align-center mb-4">
                  <v-icon class="me-1" color="secondary">mdi-flag</v-icon>
                  <div class="d-flex align-center">
                    <h5 class="font-weight-medium text-text">
                      {{ $t("dialog.visaTo") }}
                      {{ request.destination_country?.name || "N/A" }}
                    </h5>
                  </div>
                </div>
                <div class="d-flex align-center mb-4">
                  <v-icon class="me-1" color="secondary">mdi-calendar</v-icon>
                  <div class="d-flex align-center">
                    <h5 class="font-weight-medium text-text">
                      {{
                        formatDate(getRequestDate(request.statuses)) || "N/A"
                      }}
                    </h5>
                  </div>
                </div>
                <div class="d-flex align-center mb-4">
                  <v-icon class="me-1" size="small" color="secondary"
                    >mdi-passport</v-icon
                  >
                  <div class="d-flex align-center">
                    <h5 class="font-weight-medium text-text">
                      {{ $t("dialog.passportNumber") }}
                      {{ request.passport_number || "N/A" }}
                    </h5>
                  </div>
                </div>
                <!-- adults count -->
                <div class="d-flex align-center mb-4">
                  <v-icon class="me-1" size="small" color="secondary"
                    >mdi-account-multiple</v-icon
                  >
                  <div class="d-flex align-center">
                    <h5 class="font-weight-medium text-text">
                      {{ $t("dialog.adultsCount") }}
                      {{ request.adults_count || "N/A" }}
                    </h5>
                  </div>
                </div>
                <!-- children count -->
                <div class="d-flex align-center mb-4">
                  <v-icon class="me-1" size="small" color="secondary"
                    >mdi-account-multiple</v-icon
                  >
                  <div class="d-flex align-center">
                    <h5 class="font-weight-medium text-text">
                      {{ $t("dialog.childrenCount") }}
                      {{ request.children_count || "N/A" }}
                    </h5>
                  </div>
                </div>
                <!-- Attachments Section -->
                <div class="mb-4">
                  <div class="d-flex text-text align-center mb-2">
                    <v-icon class="me-1" size="small" color="secondary"
                      >mdi-paperclip</v-icon
                    >
                    <h5 class="font-weight-medium">
                      {{ $t("fields.attachments") }}
                    </h5>
                  </div>
                  <v-row
                    v-if="request.attachments && request.attachments.length"
                    dense
                  >
                    <v-col
                      v-for="(attachment, index) in request.attachments"
                      :key="index"
                      cols="auto"
                      class="d-flex flex-column align-center"
                    >
                      <v-icon color="red" size="large"
                        ><svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g fill-rule="nonzero" fill="none">
                            <path
                              d="M31.959 17.142c.027-.378.041-.758.041-1.142 0-8.837-7.163-16-16-16S0 7.163 0 16c0 7.36 4.97 13.56 11.738 15.425L31.96 17.142z"
                              fill="#C30B15"
                            />
                            <path
                              d="M31.959 17.142 19.687 4.87 7.443 27.13l4.295 4.295C13.095 31.8 14.524 32 16 32c8.453 0 15.373-6.555 15.959-14.858z"
                              fill="#85080E"
                            />
                            <path
                              fill="#FFF"
                              d="m17.395 20.87-1.413-16H7.444v14.608z"
                            />
                            <path
                              fill="#E8E6E6"
                              d="M24.556 19.478V9.74l-3.478-1.391-1.391-3.478h-3.705l.022 16z"
                            />
                            <path
                              fill="#FFF"
                              d="M19.687 9.74V4.87l4.87 4.87z"
                            />
                            <path
                              fill="#FC0F1A"
                              d="M7.444 19.478h17.113v7.652H7.444z"
                            />
                            <g fill="#FFF">
                              <path
                                d="M12.804 21.65c.847 0 1.334.415 1.334 1.153 0 .776-.487 1.225-1.334 1.225h-.6v.932h-.842v-3.31h1.442zm-.6 1.716h.558c.369 0 .582-.184.582-.534 0-.346-.213-.52-.582-.52h-.558v1.054zM16.12 21.65c1.041 0 1.76.67 1.76 1.655 0 .979-.728 1.655-1.793 1.655h-1.39v-3.31h1.423zm-.581 2.638h.6c.516 0 .885-.397.885-.979 0-.586-.388-.988-.923-.988h-.562v1.967zM19.285 22.311v.767h1.485v.662h-1.485v1.22h-.842v-3.31h2.455v.661h-1.613z"
                              />
                            </g>
                          </g>
                        </svg>
                      </v-icon>
                      <v-chip
                        size="x-small"
                        color="grey"
                        @click="downloadFile(attachment)"
                      >
                        {{ $t("dialog.download") }}
                        <v-tooltip activator="parent" location="top">
                          {{ $t("dialog.downloadAttachment") }} {{ index + 1 }}
                        </v-tooltip>
                      </v-chip>
                    </v-col>
                  </v-row>
                  <span v-else class="text-medium-emphasis">
                    {{ $t("dialog.noAttachments") }}
                  </span>
                </div>
                <!-- Passport Images Section -->
                <div class="mb-4">
                  <div class="d-flex text-text align-center mb-2">
                    <v-icon class="me-1" size="small" color="secondary"
                      >mdi-image</v-icon
                    >
                    <h5 class="font-weight-medium">
                      {{ $t("fields.passport_images") }}
                    </h5>
                  </div>
                  <v-row
                    v-if="
                      request.passport_images && request.passport_images.length
                    "
                    dense
                  >
                    <v-col
                      v-for="(image, index) in request.passport_images"
                      :key="index"
                      cols="auto"
                      class="d-flex flex-column align-center"
                    >
                      <v-icon color="primary" size="small">mdi-image</v-icon>
                      <v-chip
                        size="x-small"
                        color="grey"
                        @click="downloadFile(image)"
                      >
                        {{ $t("dialog.download") }}
                        <v-tooltip activator="parent" location="top">
                          {{ $t("dialog.downloadAttachment") }} {{ index + 1 }}
                        </v-tooltip>
                      </v-chip>
                    </v-col>
                  </v-row>
                  <span v-else class="text-medium-emphasis">
                    {{ $t("dialog.noPassportImages") }}
                  </span>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-container v-else>
        <div class="text-center text-medium-emphasis">
          {{ $t("dialog.loading") }}
        </div>
      </v-container>

      <div class="d-flex align-center justify-center mt-4">
        <Button
          :text="$t('dialog.close')"
          class="button--primary-filled"
          @click="dialogModel = false"
        />
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useAppLocaleStore } from "@/stores/appLocale";
import { storeToRefs } from "pinia";
import { useApi } from "@/composables/useApi";

const { t } = useI18n();
const { _getFile } = useApi();
const appLocaleStore = useAppLocaleStore();
const { appLocale } = storeToRefs(appLocaleStore);

const pseudoClassDirection = computed(() =>
  appLocale.value === "ar" ? "pseudo-rtl" : "pseudo-ltr"
);

const isRTL = computed(() => appLocale.value === "ar");

const props = defineProps({
  modelValue: Boolean,
  request: Object,
});

const emit = defineEmits(["update:modelValue"]);

const timelineKey = ref(0);
const currentStatuses = ref([]);

const dialogModel = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
const formatPhone = (phone) => {
  if (!phone) return "";

  const formattedCountryCode = phone.country_code.startsWith("00")
    ? "+" + phone.country_code.slice(2)
    : phone.country_code;

  const fullPhoneNumber = `${formattedCountryCode} ${phone.number}`;

  return phone.extension
    ? `${fullPhoneNumber} ext. ${phone.extension}`
    : fullPhoneNumber;
};

const statusMap = {
  "قيد الانتظار": "pending",
  "قيد المراجعة": "reviewing",
  "تم القبول": "accepted",
  "تم رفضه": "rejected",
  Pending: "pending",
  Reviewing: "reviewing",
  Accepted: "accepted",
  Rejected: "rejected",
};

const visibleStatuses = computed(() => {
  if (!props.request?.statuses?.length) return [];

  const statuses = props.request.statuses;

  const pending = statuses.find((s) => statusMap[s.name] === "pending");
  const reviewing = statuses.find((s) => statusMap[s.name] === "reviewing");
  const accepted = statuses.find((s) => statusMap[s.name] === "accepted");
  const rejected = statuses.find((s) => statusMap[s.name] === "rejected");

  const finalStatus =
    rejected && (rejected.active || rejected.activated_at)
      ? rejected
      : accepted;

  return [pending, reviewing, finalStatus].filter(Boolean).map((status) => ({
    ...status,
    i18nKey: statusMap[status.name],
  }));
});

// watch for changes in visibleStatuses and update currentStatuses
watch(
  visibleStatuses,
  (newStatuses) => {
    currentStatuses.value = newStatuses;
  },
  { immediate: true }
);

function onDialogUpdate(value) {
  if (value === true) {
    refreshTimeline();
  }
}

function refreshTimeline() {
  timelineKey.value++;
  currentStatuses.value = visibleStatuses.value;
}

function getStatusColor(status) {
  if (!status) return "grey";
  return status.active ? status.color : "grey";
}

function getLineColor(currentStatus, nextStatus) {
  // iff next status is active, use this color
  if (nextStatus?.active) return "var(--primary-color)";
  // if current status is active, use this
  if (currentStatus?.active) return "var(--text-input)";
  // default line color
  return "var(--text-input)";
}

async function downloadFile(file) {
  if (!file.path) return;

  try {
    window.open(file.path, "_blank");
  } catch (error) {
    console.error("Error opening file:", error);
  }
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

watch(
  () => props.request,
  () => {
    if (props.request) {
      refreshTimeline();
    }
  },
  { deep: true }
);

watch(appLocale, () => {
  refreshTimeline();
});
</script>

<style scoped>

</style>
