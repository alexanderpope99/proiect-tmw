<template>
	<b-col>
		<b-modal v-model="show" @hidden="handleClose">
			<template #modal-title>
				{{ isEdit ? 'Editează Cheltuială' : 'Adaugă Cheltuială' }}
			</template>
			<template #default>
				<b-form @submit="onSubmit">
					<b-form-group
						class="mb-3"
						id="expense-name"
						label="Nume"
						label-for="expense-name-input"
					>
						<b-form-input
							id="expense-name-input"
							v-model="expenseName"
							type="text"
							placeholder="Nume cheltuială"
						>
						</b-form-input>
					</b-form-group>
					<b-form-group
						id="category"
						label="Categorie"
						label-for="category-select"
					>
						<b-form-select
							class="w-100 mb-3"
							style="height: 2em"
							v-model="category"
							:options="categories"
						>
						</b-form-select>
					</b-form-group>
					<b-form-group
						class="mb-3"
						id="expense-date"
						label="Data"
						label-for="expense-date-input"
					>
						<b-form-input
							id="expense-date-input"
							v-model="expenseDate"
							type="date"
							placeholder="Dată cheltuială"
						>
						</b-form-input>
					</b-form-group>
					<b-form-group
						class="mb-3"
						id="expense-amount"
						label="Suma"
						label-for="expense-amount-input"
					>
						<b-form-input
							id="expense-amount-input"
							v-model="expenseAmount"
							type="number"
							min="0"
							step="0.01"
							placeholder="Sumă cheltuială"
						>
						</b-form-input>
					</b-form-group>
				</b-form>
			</template>
			<template #modal-footer>
				<b-button
					variant="primary"
					@click="onSubmit"
					:disabled="!expenseAmount || !expenseDate || !expenseName"
				>
					{{ isEdit ? 'Actualizează' : 'Adaugă' }}
				</b-button>
			</template>
		</b-modal>
		<b-row>
			<b-col>
				<h2>Tabel</h2>
			</b-col>
			<b-col xs lg="2">
				<b-button
					@click="handleOpen"
					variant="outline-primary"
					size="sm"
					class="m-1 p-1 rounded-circle border-0"
				>
					<b-icon icon="plus-circle" style="width: 1.5em; height: 1.5em;" />
				</b-button>
			</b-col>
		</b-row>
		<b-table-simple :per-page="5" responsive hover>
			<thead>
			<tr>
				<th style="cursor:pointer" @click="sort('name')">Nume</th>
				<th>Categorie</th>
				<th style="cursor:pointer" @click="sort('date')">Dată</th>
				<th style="cursor:pointer" @click="sort('amount')">Sumă</th>
				<th></th>
			</tr>
			</thead>
			<tbody>
			<tr
				v-for="(val,ind) in expenses"
				:key="ind"
			>
				<td>{{ val.name }}</td>
				<td>
					<div v-if="val.category">
						<b-icon
							icon="circle-fill"
							:color="val.category.color"
							size="20"
						/>
						{{ val.category.name }}
					</div>
					<div v-else>
						-
					</div>
				</td>
				<td>{{ val.date.slice(0, 10) }}</td>
				<td>{{ val.amount }}</td>
				<td>
					<b-button
						@click="editExpense(val)"
						size="sm"
						variant="outline-primary"
						class="mt-0 pt-0 rounded-circle border-0"
					>
						<b-icon icon="pencil-fill" style="width: 1em; height: 1em;" />
					</b-button>
					<b-button
						@click="deleteExpense(val)"
						size="sm"
						variant="outline-primary"
						class="mt-0 pt-0 rounded-circle border-0"
					>
						<b-icon icon="trash-fill" style="width: 1em; height: 1em;" />
					</b-button>
				</td>
			</tr>
			</tbody>
			<tfoot>
			<tr>
				<td style="cursor:pointer" @click="before" v-if="tableOffset!==0">{{ '⬅️' }}</td>
				<td v-else></td>
				<td>Pagina</td>
				<td>{{ page }}</td>
				<td></td>
				<td style="cursor:pointer" @click="advance" v-if="expenses.length===8">{{ '➡️' }}</td>
				<td v-else></td>
			</tr>
			</tfoot>
		</b-table-simple>
	</b-col>
</template>

<script>
import axios from 'axios';
import { server } from '../server-address';

export default {
	name: 'MyTable',

	props: {
		token: {
			required: true,
		},
	},

	data() {
		return {
			expenses: [],
			isEdit: false,
			show: false,
			expenseName: '',
			categories: [],
			expenseDate: '',
			expenseAmount: '',
			category: null,
			expenseId: '',
			pressedSubmit: false,
			validExpenseName: true,
			validExpenseDate: true,
			validExpenseAmount: true,
			tableOffset: 0,
			tableLimit: 8,
			expensesLength: 0,
			page: 1,
			field: '',
			order: 'desc',
			sorted: false,
		}
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
		async editExpense(e) {
			await this.getCategories();
			await axios
				.get(`${server}/api/expenses/${e.id}`)
				.then(() => {
					this.expenseId = e.id;
					this.expenseName = e.name;
					this.expenseDate = e.date.slice(0, 10);
					this.expenseAmount = e.amount;
					this.category = e.category?.id || null;
					this.isEdit = true;
					this.show = true;
				})
				.catch(function (error) {
					console.log(error);
				});
		},
		async updateExpense() {
			await axios
				.put(`${server}/api/expenses/${this.expenseId}`, {
					name: this.expenseName,
					date: this.expenseDate,
					amount: this.expenseAmount,
					categoryId: this.category,
				}, {
					headers: {
						Authorization: 'Bearer ' + this.token,
					},
				})
				.then(async () => {
					this.handleClose();
					if (this.sorted) await this.getSortedExpenses();
					else await this.getExpenses();
					this.$emit('update');
				})
				.catch(function (error) {
					console.log(error);
				});
		},
		async getCategories() {
			await axios
				.get(`${server}/api/categories`)
				.then((res) => {
					this.categories = [{ value: null, text: '-' }];
					for (let value of res.data) {
						this.categories.push({ value: value.id, text: value.name })
					}
				})
				.catch(function (error) {
					console.log(error);
				});
		},
		async deleteExpense(e) {
			await axios
				.delete(`${server}/api/expenses/${e.id}`, {
					headers: {
						Authorization: 'Bearer ' + this.token,
					},
				})
				.then(async () => {
					if (this.sorted) await this.getSortedExpenses();
					else await this.getExpenses();
					this.$emit('update');
				})
				.catch(function (error) {
					console.log(error);
				})
		},
		async addExpense() {
			await axios
				.post(`${server}/api/expenses/`, {
					name: this.expenseName,
					date: this.expenseDate,
					amount: this.expenseAmount,
					categoryId: this.category,
				}, {
					headers: {
						Authorization: 'Bearer ' + this.token,
					},
				})
				.then(async () => {
					this.handleClose();
					if (this.sorted) await this.getSortedExpenses();
					else await this.getExpenses();
					this.$emit('update');
				})
				.catch(function (error) {
					console.log(error);
				});
		}
		,
		async handleOpen() {
			await this.getCategories();
			this.isEdit = false;
			this.show = true;
		}
		,
		handleClose() {
			this.pressedSubmit = false;
			this.show = false;
			this.expenseName = '';
			this.category = '';
			this.expenseDate = '';
			this.expenseAmount = '';
		}
		,
		onSubmit(e) {
			e.preventDefault();
			this.pressedSubmit = true;
			if (this.isEdit) this.updateExpense();
			else this.addExpense();
		},
		async getSortedExpenses() {
			await axios
				.get(`${server}/api/expenses/${this.tableLimit}/${this.tableOffset}/${this.field}/${this.order}`)
				.then((res) => {
					this.expenses = res.data.expenses;
				})
				.catch(function (error) {
					console.log(error);
				});
		},
		async sort(field) {
			this.tableOffset = 0;
			this.tableLimit = 8;
			this.page = 1;
			this.order = this.order === 'asc' ? 'desc' : 'asc';
			this.field = field;
			this.sorted = true;
			await this.getSortedExpenses();
		},
	},
};
</script>

<style>
</style>