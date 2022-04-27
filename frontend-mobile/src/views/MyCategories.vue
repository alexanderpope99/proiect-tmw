<template>
  <div>
    <ion-slides
      :options="{ slidesPerView: 'auto', zoom: false, grabCursor: true }"
    >
      <ion-slide v-for="(val, ind) in categories" :key="ind" class="slide">
        <ion-col>
          <ion-row style="justify-content: center">
            <ion-label>{{ val.name }}</ion-label>
          </ion-row>
          <ion-row style="justify-content: center">
            <ion-icon
              :icon="ellipse"
              :style="'color:' + val.color"
              size="large"
            />
          </ion-row>
          <ion-row style="justify-content: center">
            <ion-label>{{ val.expensesSum ? val.expensesSum : "0" }}</ion-label>
          </ion-row>
        </ion-col>
      </ion-slide>
    </ion-slides>
    <ion-content> </ion-content>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { server } from "../server-address";
import { ellipse, addCircle } from "ionicons/icons";

export default defineComponent({
  name: "HomePage",
  components: {},
  props: {
    token: String,
  },
  setup() {
    return {
      ellipse,
      addCircle,
    };
  },
  data() {
    return {
      categories: [],
      show: false,
      categoryName: "",
      isEdit: false,
      categoryColor: "",
      categoryId: "",
      pressedSubmit: false,
      colors: "#194d33",
    };
  },
  computed: {
    invalidNume() {
      if (this.categoryName === "" && this.pressedSubmit)
        return "Numele trebuie completat";
      return null;
    },
    invalidColor() {
      if (this.categoryColor === "" && this.pressedSubmit)
        return "Culoarea trebuie aleasă";
      return null;
    },
  },
  async mounted() {
    await this.getCategories();
  },
  methods: {
    async getCategories() {
      this.categories = await axios
        .get(`${server}/api/categories`)
        .then(function (res) {
          return res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
});
</script>
<style scoped>
.slide {
  width: 5em;
  height: 5em;
  text-align: center;
  cursor: pointer;
  border-bottom: 1px solid black;
  margin-bottom: 2em;
}
.icon-button {
  color: rgb(71, 67, 67);
}
</style>