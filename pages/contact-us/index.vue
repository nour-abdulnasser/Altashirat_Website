<template>
  <div class="contact-us">
    <v-container class="align-center justify-center d-flex">
      <v-card class="w-40 h-60 align-center justify-center">
        <div class="d-flex flex-column" :style="{ direction: $i18n.locale === 'ar' ? 'rtl' : 'ltr' }">
          <div>
            <div>
              <Image name="contact-us" alt="contact-us" />
            </div>
            <div class="title-section text-center py-6 bg-bg-input">
              <h2 class="text-text">
                {{ $t('contact.title') }}
              </h2>
            </div>
          </div>
          <div class="contact-items-container px-4">
            <!-- Mobile -->
            <div class="contact-item d-flex mb-8 mt-4 align-center">
              <!-- Arabic version with icons on right -->
              <template v-if="$i18n.locale === 'ar'">
                <!-- Icons on the right for Arabic -->
                <div class="icon-container d-flex align-center">
                  <div>
                    <Image name="dots-icon" alt="dots-icon" style="width:35px" />
                  </div>
                  <div class="d-inline-flex align-center justify-center bg-bg-input rounded-circle pa-2 pa-md-3 mx-2"
                       style="width: 33px; height: 33px;">
                    <Image name="mobile-icon" alt="mobile-icon" style="width: 20px; height: 20px;" />
                  </div>
                </div>
                <!-- Text content -->
                <div class="contact-text text-text flex-grow-1">
                  <span v-html="settings.contacts_phone"></span>
                </div>
              </template>
              
              <!-- English version -->
              <template v-else>
                <div class="icon-container d-flex align-center">
                  <div>
                    <Image name="dots-icon" alt="dots-icon" style="width:35px" />
                  </div>
                  <div class="d-inline-flex align-center justify-center bg-bg-input rounded-circle pa-2 pa-md-3 mx-2"
                       style="width: 33px; height: 33px;">
                    <Image name="mobile-icon" alt="mobile-icon" style="width: 20px; height: 20px;" />
                  </div>
                </div>
                <div class="contact-text text-text flex-grow-1">
                  <span v-html="settings.contacts_phone"></span>
                </div>
              </template>
            </div>

            <!-- Email -->
            <div class="contact-item d-flex mb-8 align-center">
              <!-- Arabic version with icons on right -->
              <template v-if="$i18n.locale === 'ar'">
                <!-- Icons on the right for Arabic -->
                <div class="icon-container d-flex align-center">
                  <div>
                    <Image name="dots-icon" alt="dots-icon" style="width:35px" />
                  </div>
                  <div class="d-inline-flex align-center justify-center bg-bg-input rounded-circle pa-2 pa-md-3 mx-2"
                       style="width: 33px; height: 33px;">
                    <Image name="email-icon" alt="email-icon" style="width: 20px; height: 20px;" />
                  </div>
                </div>
                <!-- Text content -->
                <div class="contact-text text-text flex-grow-1">
                  <span v-html="settings.contacts_email"></span>
                </div>
              </template>
              
              <!-- English version -->
              <template v-else>
                <div class="icon-container d-flex align-center">
                  <div>
                    <Image name="dots-icon" alt="dots-icon" style="width:35px" />
                  </div>
                  <div class="d-inline-flex align-center justify-center bg-bg-input rounded-circle pa-2 pa-md-3 mx-2"
                       style="width: 33px; height: 33px;">
                    <Image name="email-icon" alt="email-icon" style="width: 20px; height: 20px;" />
                  </div>
                </div>
                <div class="contact-text text-text flex-grow-1">
                  <span v-html="settings.contacts_email"></span>
                </div>
              </template>
            </div>

            <!-- Location -->
            <div class="contact-item d-flex mb-8 align-center">
              <!-- Arabic version with icons on right -->
              <template v-if="$i18n.locale === 'ar'">
                <!-- Icons on the right for Arabic -->
                <div class="icon-container d-flex align-center">
                  <div>
                    <Image name="dots-icon" alt="dots-icon" style="width:35px" />
                  </div>
                  <div class="d-inline-flex align-center justify-center bg-bg-input rounded-circle pa-2 pa-md-3 mx-2"
                       style="width: 33px; height: 33px;">
                    <Image name="location-icon" alt="location-icon" style="width: 20px; height: 20px;" />
                  </div>
                </div>
                <!-- Text content -->
                <div class="contact-text text-text flex-grow-1">
                  <span v-html="settings.contacts_address"></span>
                </div>
              </template>
              
              <!-- English version -->
              <template v-else>
                <div class="icon-container d-flex align-center">
                  <div>
                    <Image name="dots-icon" alt="dots-icon" style="width:35px" />
                  </div>
                  <div class="d-inline-flex align-center justify-center bg-bg-input rounded-circle pa-2 pa-md-3 mx-2"
                       style="width: 33px; height: 33px;">
                    <Image name="location-icon" alt="location-icon" style="width: 20px; height: 20px;" />
                  </div>
                </div>
                <div class="contact-text text-text flex-grow-1">
                  <span v-html="settings.contacts_address"></span>
                </div>
              </template>
            </div>
          </div>
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useSettingsStore } from "@/stores/settings";
import { useI18n } from "vue-i18n";

const settingsStore = useSettingsStore();
const { settings } = storeToRefs(settingsStore);
const { locale } = useI18n();
</script>

<style scoped>
.contact-text {
  padding: 0 8px;
}

.icon-container {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

/* Responsive adjustments */
@media (max-width: 959px) {
  .contact-us .v-card {
    width: 100% !important;
  }

  .contact-us .v-card-title {
    font-size: 1.5rem !important;
  }
}

@media (max-width: 600px) {
  .contact-items-container {
    padding: 0 8px;
  }
  
  .contact-text {
    font-size: 0.875rem;
  }
}
</style>