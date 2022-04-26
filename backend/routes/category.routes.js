module.exports = (app) => {
	const Categories = require('../controllers/category.controller.js');

	const router = require('express').Router();
	const auth = require('../jwt/auth');

	router.post('/', auth, Categories.create);

	router.get('/', Categories.findAll);

	router.get('/:id', Categories.findOne);

	router.put('/:id', auth, Categories.update);

	router.delete('/:id', auth, Categories.delete);

	app.use('/api/categories', router);
};
