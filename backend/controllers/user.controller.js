const db = require('../models');
const UserService = require('../services/user.services');

exports.register = async (req, res) => {
	if (!req.body.username || !req.body.password) {
		res.status(400).send({
			message: 'Numele si parola nu pot fi goale!',
		});
		return;
	}

	try {
		await UserService.create(req.body.username, req.body.password);
		res.send({
			message: 'Utilizatorul ' + req.body.username + ' adăugat cu succes',
		});
	} catch (error) {
		res.status(500).send({
			message: error.message || 'A apărut o eroare.',
		});
	}
};

exports.login = async (req, res) => {
	if (!req.body.username || !req.body.password) {
		res.status(400).send({
			message: 'Numele si parola nu pot fi goale!',
		});
		return;
	}

	try {
		res.send({ 'token': await UserService.login(req.body.username, req.body.password) });
	} catch (error) {
		res.status(500).send({
			message: error.message || 'A apărut o eroare.',
		});
	}
};
