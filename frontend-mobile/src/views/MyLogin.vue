<template>
  <div>
    <ion-popover :is-open="show">
      <ion-content>{{ errorMessage }}</ion-content>
    </ion-popover>
    <ion-card>
      <ion-card-header>
        <ion-card-title class="ion-text-center">Login</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-item>
          <ion-label position="floating">Username</ion-label>
          <ion-input
            name="username"
            type="text"
            :value="username"
            @ionInput="username = $event.target.value"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Password</ion-label>
          <ion-input
            name="password"
            type="password"
            :value="password"
            @ionInput="password = $event.target.value"
          ></ion-input>
        </ion-item>
        <div id="login-button">
          <ion-button
            :disabled="!username || !password"
            @click="login"
            color="medium"
          >
            Login
          </ion-button>
        </div>
      </ion-card-content>
    </ion-card>
  </div>
</template>
<script lang="ts">
import {
  IonPopover,
  IonLabel,
  IonInput,
  IonButton,
  IonContent,
} from "@ionic/vue";
import { logOutOutline } from "ionicons/icons";
import { defineComponent } from "vue";
import axios from "axios";
import { server } from "../server-address";

export default defineComponent({
  name: "MyLogin",
  components: {
    IonPopover,
    IonInput,
    IonLabel,
    IonButton,
    IonContent,
  },
  props: {
    showLogoutButton: Boolean,
  },
  setup() {
    return {
      logOutOutline,
    };
  },
  data() {
    return {
      username: "",
      password: "",
      show: false,
      errorMessage: "",
    };
  },
  methods: {
    async login() {
      await axios
        .post(`${server}/api/users/login`, {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          if (res.status !== 200) {
            this.errorMessage = res.data.message;
            this.show = true;
          } else {
            sessionStorage.setItem("token", res.data.token);
            this.$emit("login", res.data.token);
          }
        })
        .catch((error) => {
          this.errorMessage = error;
          this.show = true;
        });
    },
  },
});
</script>
<style scoped>
#login-button {
  margin: 1em;
  text-align: center;
}
</style>
