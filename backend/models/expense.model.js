const { defineModel } = require('firestore-sequelizer');
const Expense = defineModel('expenses', {
	name: {
		type: 'string',
		required: true,
	},
	date: {
		type: 'date',
		required: true,
	},
	amount: {
		type: 'float',
		required: true,
	},
	categoryId: {
		type: 'string',
		required: false,
	},
});

module.exports = Expense;