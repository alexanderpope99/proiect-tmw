const Expenses = require('../controllers/expense.controller.js');
module.exports = (app) => {
	const Expenses = require('../controllers/expense.controller.js');

	const router = require('express').Router();
	const auth = require('../jwt/auth');

	router.post('/', auth, Expenses.create);

	router.get('/:limit/:offset', Expenses.findAll);

	router.get('/:limit/:offset/:sorting/:order', Expenses.findAllSort);

	router.get('/:id', Expenses.findOne);

	router.put('/:id', auth, Expenses.update);

	router.delete('/:id', auth, Expenses.delete);

	app.use('/api/expenses', router);
};
