const db = require('../models');
const Category = db.categories;
const Expense = db.expenses;

module.exports = {
	create: async (name, date, amount, categoryId) => {
		if (date instanceof String) date = Date.parse(date) / 1000;
		const expense = {
			name: name,
			date: date,
			amount: amount,
			categoryId: categoryId,
		};

		return Expense.create(expense);
	},
	findAll: async (offset, limit) => {
		let allCategories = await Category.findAll();
		let expenses = await Expense.findAll({
			order: [['date', 'DESC']],
		});
		let expensesLength = expenses.length;
		expenses = expenses.slice(offset, limit);
		let responseData = [];

		for (let expense of expenses) {
			let category = allCategories.filter(val => val.id === expense.data.categoryId);

			if (category.length > 0)
				category = {
					id: category[0].id,
					name: category[0].data.name,
					color: category[0].data.color,
				}
			else category = null;

			responseData.push({
				id: expense.id,
				name: expense.data.name,
				date: expense.data.date,
				amount: parseInt(expense.data.amount),
				category: category,
			});
		}

		return {
			expenses: responseData,
			expensesLength: expensesLength,
		};
	},
	findAllSort: async (offset, limit, sorting, order) => {
		let allCategories = await Category.findAll();
		let expenses = await Expense.findAll({
			order: [['date', 'DESC']],
		});
		let expensesLength = expenses.length;
		expenses.sort((a, b) => {
			switch (sorting) {
				case 'name':
					let nameA = a.data.name.toUpperCase();
					let nameB = b.data.name.toUpperCase();
					if (nameA >= nameB) return order === 'asc' ? 1 : -1;
					else return order === 'asc' ? -1 : 1;
				case 'date':
					let dateA = Date.parse(a.data.date);
					let dateB = Date.parse(b.data.date);
					if (dateA >= dateB) return order === 'asc' ? 1 : -1;
					else return order === 'asc' ? -1 : 1;
				case 'amount':
					return order === 'asc' ? a.data.amount - b.data.amount : b.data.amount - a.data.amount;
			}
		});
		expenses = expenses.slice(offset, limit);
		let responseData = [];

		for (let expense of expenses) {
			let category = allCategories.filter(val => val.id === expense.data.categoryId);

			if (category.length > 0)
				category = {
					id: category[0].id,
					name: category[0].data.name,
					color: category[0].data.color,
				}
			else category = null;

			responseData.push({
				id: expense.id,
				name: expense.data.name,
				date: expense.data.date,
				amount: parseInt(expense.data.amount),
				category: category,
			});
		}

		return {
			expenses: responseData,
			expensesLength: expensesLength,
		};
	},
	findById: async (id) => {
		let expense = await Expense.findOne({ where: { id: id } })
		return {
			id: expense.id,
			name: expense.data.name,
			date: expense.data.date,
			amount: parseInt(expense.data.amount),
		};
	},
	update: async (body, id) => {
		await Expense.update(body, {
			where: { id: id },
		})
	},
	delete: async (id) => {
		let expense = await Expense.findOne({ where: { id: id } })

		await expense.destroy();
	},
	deleteAll: async () => {
		let expenses = await Expense.findAll();

		for (let expense of expenses) {
			await expense.destroy();
		}
	},
}