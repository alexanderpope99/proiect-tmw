<template>
  <div>
    <ion-grid>
      <thead>
        <tr>
          <th style="cursor: pointer" @click="sort('name')">Nume</th>
          <th>Categorie</th>
          <th style="cursor: pointer" @click="sort('date')">Dată</th>
          <th style="cursor: pointer" @click="sort('amount')">Sumă</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(val, ind) in expenses" :key="ind">
          <td>{{ val.name }}</td>
          <td>
            <div v-if="val.category">
              {{ val.category.name }}
            </div>
            <div v-else>-</div>
          </td>
          <td>{{ val.date.slice(0, 10) }}</td>
          <td>{{ val.amount }}</td>
          <td>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td style="cursor: pointer" @click="before" v-if="tableOffset !== 0">
            {{ "⬅️" }}
          </td>
          <td v-else></td>
          <td>Pagina</td>
          <td>{{ page }}</td>
          <td></td>
          <td
            style="cursor: pointer"
            @click="advance"
            v-if="expenses.length === 8"
          >
            {{ "➡️" }}
          </td>
          <td v-else></td>
        </tr>
      </tfoot>
    </ion-grid>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { server } from "../server-address";
import { addCircle, trashOutline } from "ionicons/icons";

export default defineComponent({
  name: "MyTable",
  components: {},
  props: {
    token: String,
  },
  setup() {
    return {
      addCircle,
      trashOutline,
    };
  },
  data() {
    return {
      expenses: new Array<any>(),
      isEdit: false,
      show: false,
      expenseName: "",
      categories: new Array<any>(),
      expenseDate: "",
      expenseAmount: "",
      category: null,
      expenseId: "",
      pressedSubmit: false,
      validExpenseName: true,
      validExpenseDate: true,
      validExpenseAmount: true,
      tableOffset: 0,
      tableLimit: 8,
      expensesLength: 0,
      page: 1,
      field: "",
      order: "desc",
      sorted: false,
    };
  },
  async mounted() {
    await this.getExpenses();
    await this.getCategories();
  },

  methods: {
    async before() {
      if (this.tableOffset === 0) return;
      this.tableOffset = this.tableOffset - 8;
      this.tableLimit = this.tableLimit - 8;
      this.page = this.page - 1;
      if (this.sorted) await this.getSortedExpenses();
      else await this.getExpenses();
    },
    async advance() {
      if (this.expenses.length !== 8) return;
      this.tableOffset = this.tableOffset + 8;
      this.tableLimit = this.tableLimit + 8;
      this.page = this.page + 1;
      if (this.sorted) await this.getSortedExpenses();
      else await this.getExpenses();
    },
    async getExpenses() {
      await axios
        .get(`${server}/api/expenses/${this.tableLimit}/${this.tableOffset}`)
        .then((res) => {
          this.expenses = res.data.expenses;
          this.expensesLength = res.data.expensesLength;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async getCategories() {
      await axios
        .get(`${server}/api/categories`)
        .then((res) => {
          this.categories = [{ value: null, text: "-" }];
          for (let value of res.data) {
            this.categories.push({ value: value.id, text: value.name });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async getSortedExpenses() {
      await axios
        .get(
          `${server}/api/expenses/${this.tableLimit}/${this.tableOffset}/${this.field}/${this.order}`
        )
        .then((res) => {
          this.expenses = res.data.expenses;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async sort(field: any) {
      this.tableOffset = 0;
      this.tableLimit = 8;
      this.page = 1;
      this.order = this.order === "asc" ? "desc" : "asc";
      this.field = field;
      this.sorted = true;
      await this.getSortedExpenses();
    },
  },
});
</script>
<style scoped>
#login-button {
  margin: 1em;
  text-align: center;
}
ion-grid {
  --ion-grid-column-padding: 10px;
  border-collapse: collapse;
  border-style: hidden;
}
</style>
