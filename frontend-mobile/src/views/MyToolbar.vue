<template>
  <ion-header :translucent="true">
    <ion-toolbar color="primary">
      <ion-title class="ion-text-center">Expense Tracker</ion-title>
      <ion-buttons slot="secondary" v-if="showLogoutButton">
        <ion-button @click="logout">
          <ion-icon slot="icon-only" :icon="logOutOutline"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>
<script lang="ts">
import { IonHeader, IonTitle, IonToolbar } from "@ionic/vue";
import { logOutOutline } from "ionicons/icons";
import { defineComponent } from "vue";

export default defineComponent({
  name: "MyToolbar",
  components: {
    IonHeader,
    IonTitle,
    IonToolbar,
  },
  props: {
    showLogoutButton: Boolean,
  },
  setup() {
    return {
      logOutOutline,
    };
  },
  methods: {
    logout() {
      sessionStorage.removeItem("token");
      this.$emit("logout");
    },
  },
});
</script>
