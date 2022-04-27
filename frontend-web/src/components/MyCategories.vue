<template>
	<div>
		<b-modal v-model="show" @hidden="handleClose">
			<template #modal-title>
				{{ isEdit ? 'Editează Categorie' : 'Adaugă Categorie' }}
			</template>
			<template #default>
				<b-form @submit="onSubmit">
					<b-form-group
						id="category-name"
						label="Nume"
						label-for="category-name-input"
						:invalid-feedback="invalidNume"
						class="mb-3"
					>
						<b-form-input
							id="category-name-input"
							v-model="categoryName"
							type="text"
							placeholder="Nume categorie"
						>
						</b-form-input>
					</b-form-group>
					<b-input-group class="mb-3">
						<template #prepend>
							<b-dropdown
								text="Culori"
								id="input-group-dropdown-1"
							>
								<b-dropdown-item>
									<compact
										:value="categoryColor"
										@input="changeColor"
									/>
								</b-dropdown-item>
							</b-dropdown>
						</template>
						<b-form-input
							:value="categoryColor"
							placeholder="Culoare categorie"
							v-bind:style="{color: categoryColor}"
							disabled
							:invalid-feedback:="invalidColor"
						/>
					</b-input-group>
				</b-form>
			</template>
			<template #modal-footer>
				<b-button v-if="isEdit" variant="outline-danger" @click="deleteCategory">
					Șterge
				</b-button>
				<b-button variant="primary" type="submit" @click="onSubmit">
					{{ isEdit ? 'Actualizează' : 'Adaugă' }}
				</b-button>
			</template>
		</b-modal>
		<b-table-simple responsive>
			<thead>
			<tr>
				<th
					v-for="(val,ind) in categories"
					:key="ind"
					style="text-align: center; cursor: pointer"
					@click="editCategory(val)"
				>
					<b-container>
						<b-row class="justify-content-md-center"> {{ val.name }}</b-row>
						<b-row class="justify-content-md-center">
							<b-icon
								icon="circle-fill"
								:color="val.color"
								class="h2"
							/>
						</b-row>
						<b-row class="justify-content-md-center">
							{{ val.expensesSum ? val.expensesSum : '0' }}
						</b-row>
					</b-container>
				</th>
				<th>
					<b-button
						@click="pressCategoryButton"
						variant="outline-primary"
						class="m-1 p-1 rounded-circle border-0"
					>
						<b-icon icon="plus-circle" style="width: 3em; height: 3em;" />
					</b-button>
				</th>
			</tr>
			</thead>
		</b-table-simple>
	</div>
</template>

<script>
import axios from 'axios';
import { server } from '../server-address';
import { Compact } from 'vue-color';

export default {
	name: 'MyCards',
	components: { Compact },

	props: {
		token: {
			required: true,
		},
	},

	data() {
		return {
			categories: [],
			show: false,
			categoryName: '',
			isEdit: false,
			categoryColor: '',
			categoryId: '',
			pressedSubmit: false,
			colors: '#194d33',
		};
	},

	computed: {
		invalidNume() {
			if (this.categoryName === '' && this.pressedSubmit)
				return 'Numele trebuie completat';
			return null;
		},
		invalidColor() {
			if (this.categoryColor === '' && this.pressedSubmit)
				return 'Culoarea trebuie aleasă';
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

		async addCategory() {
			await axios
				.post(`${server}/api/categories`, {
					name: this.categoryName,
					color: this.categoryColor,
				}, {
					headers: {
						Authorization: 'Bearer ' + this.token,
					},
				})
				.then(async () => {
					this.handleClose();
					await this.getCategories();
					this.$emit('update');
				})
				.catch(function (error) {
					console.log(error);
				});
		},

		async updateCategory() {
			await axios
				.put(`${server}/api/categories/${this.categoryId}`, {
					color: this.categoryColor,
					name: this.categoryName,
				}, {
					headers: {
						Authorization: 'Bearer ' + this.token,
					},
				})
				.then(async () => {
					this.handleClose();
					await this.getCategories();
					this.$emit('update');
				})
				.catch(function (error) {
					console.log(error);
				});
		},

		async editCategory(e) {
			this.categoryColor = e.color;
			this.categoryName = e.name;
			this.categoryId = e.id;
			this.isEdit = true;
			this.show = true;
			this.pressedSubmit = false;
		},

		async deleteCategory() {
			await axios
				.delete(`${server}/api/categories/${this.categoryId}`, {
					headers: {
						Authorization: 'Bearer ' + this.token,
					},
				})
				.then(async () => {
					await this.getCategories();
					this.handleClose();
					this.$emit('update');
				})
				.catch(function (error) {
					console.log(error);
				});
		},

		handleClose() {
			this.show = false;
			this.pressedSubmit = false;
			this.categoryName = '';
			this.categoryColor = '';
		},
		onSubmit(e) {
			e.preventDefault();
			this.pressedSubmit = true;
			if (this.isEdit) this.updateCategory();
			else this.addCategory();
		},
		pressCategoryButton() {
			this.isEdit = false;
			this.show = true;
		},
		changeColor(e) {
			this.categoryColor = e.hex;
		},
	},
};
</script>

<style>
</style>