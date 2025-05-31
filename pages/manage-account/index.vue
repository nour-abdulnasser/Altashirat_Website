<template>
  <div class="manage-account">
    <v-container>
      <div class="manage-account__content pa-5 rounded-lg border-sm">
        <div class="manage-account__top">
          <h3 class="manage-account__title mb-2">
            {{ $t("manageAccount.title") }}
          </h3>
          <p class="manage-account__desc d-flex align-center ga-2">
            {{ $t("manageAccount.manageSettings") }}
            <route to="/manage-account/delete-account">
              <v-icon>{{ $t("manageAccount.icon") }}</v-icon>
            </route>
          </p>
        </div>
      </div>
    </v-container>
  </div>
</template>


<script setup>
definePageMeta({
  middleware: ["auth-required"],
});
useSeoMeta({
  title: "Manage Account",
});
</script>