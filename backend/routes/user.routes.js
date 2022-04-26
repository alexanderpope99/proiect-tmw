module.exports = (app) => {
	const Users = require('../controllers/user.controller.js');

	const router = require('express').Router();

	router.post('/register', Users.register);

	router.post('/login', Users.login);

	app.use('/api/users', router);
};
