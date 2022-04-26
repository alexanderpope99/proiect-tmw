const db = require('../models');
const Category = db.categories;
const Expense = db.expenses;

module.exports = {
	create: async (name, color) => {

		const category = {
			name: name,
			color: color,
		};

		return Category.create(category);
	},
	findAll: async () => {
		let allExpenses = await Expense.findAll();
		let categories = await Category.findAll({
			order: [['name', 'ASC']],
		});
		let responseData = [];
		for (let category of categories) {
			let expenses = allExpenses.filter(val => val.data.categoryId === category.id);
			let expensesResponse = [];
			let sum = 0;
			if (expenses.length > 0) {
				for (let expense of expenses) {
					sum += parseInt(expense.data.amount);
					expensesResponse.push(
						{
							id: expense.id,
							name: expense.data.name,
							date: expense.data.date,
							amount: parseInt(expense.data.amount),
						},
					)
				}
			}
			responseData.push({
				id: category.id,
				name: category.data.name,
				color: category.data.color,
				expensesSum: sum,
				expenses: expensesResponse,
			});
		}
		return responseData;
	},
	findById: async (id) => {
		let category = await Category.findOne({ where: { id: id } })
		return {
			id: category.id,
			name: category.data.name,
			color: category.data.color,
		};
	},
	update: async (body, id) => {
		await Category.update(body, {
			where: { id: id },
		})
	},
	delete: async (id) => {
		let category = await Category.findOne({ where: { id: id } })

		await category.destroy();
	},
	deleteAll: async () => {
		let categories = await Category.findAll();

		for (let category of categories) {
			await category.destroy();
		}
	},
}