<template>
  <div>
    <v-app>
      <NuxtLayout>
        <Notification class="notification" v-if="isShown && notification" />
        <NuxtPage />
      </NuxtLayout>
    </v-app>
  </div>
</template>
    
    <script setup>
    useSeoMeta({
  title: "Al-Tashirat",
  description: "Apply for your visa in a seamless process thought Al-Tashirat.",
});
import { storeToRefs } from "pinia";

const notificationStore = useNotificationStore();
const { isShown, notification } = storeToRefs(notificationStore);

</script>
