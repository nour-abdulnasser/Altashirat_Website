<template>
  <v-alert
    v-bind="$attrs"
    @click:close="clearNotification"
    closable
    :text="notification.text"
    :type="notification.type"
    variant="tonal"
    density="comfortable"
    class="py-3 d-flex justify-center  align-center "
    
  >
   
  </v-alert>
</template>
  <script setup>
import { storeToRefs } from "pinia";

const notificationStore = useNotificationStore();
const { notification } = storeToRefs(notificationStore);
const { clearNotification } = notificationStore;
</script>
  
