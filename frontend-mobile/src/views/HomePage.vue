<template>
  <ion-page>
    <MyToolbar @logout="logOut" :show-logout-button="Boolean(token)" />
    <ion-content class="background">
      <div v-if="token">
        <MyCategories :token="token" />
        <div>
          <ion-row>
            <MyTable :token="token" />
          </ion-row>
        </div>
      </div>
      <div v-else>
        <MyLogin class="justify-content-center d-flex" @login="login" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import MyToolbar from "./MyToolbar.vue";
import MyLogin from "./MyLogin.vue";
import MyCategories from "./MyCategories.vue";
import MyTable from "./MyTable.vue";
import { IonContent, IonPage } from "@ionic/vue";
import { defineComponent } from "vue";
import { getToken } from "../getToken";

export default defineComponent({
  name: "HomePage",
  components: {
    IonContent,
    IonPage,
    MyToolbar,
    MyLogin,
    MyCategories,
    MyTable,
  },
  data() {
    return {
      token: getToken(),
    };
  },
  methods: {
    login(token: any) {
      this.token = token;
    },
    logOut() {
      this.token = null;
    },
  },
});
</script>

<style scoped>
.background {
  background-color: #f5f7fb;
}

.footer {
  margin-top: 3em;
}
</style>
