const CategoryService = require('../services/category.services');

exports.create = async (req, res) => {
	if (!req.body.name || !req.body.color) {
		res.status(400).send({
			message: 'Numele sau culoarea nu pot fi goale!',
		});
		return;
	}

	if (req.body.name === '-') {
		res.status(400).send({
			message: 'Numele nu poate fi "-"!',
		});
		return;
	}

	try {
		res.send(await CategoryService.create(req.body.name, req.body.color));
	} catch (err) {
		res.status(500).send({
			message: err.message || 'A apărut o eroare.',
		});
	}
};

exports.findAll = async (req, res) => {
	try {
		res.send(await CategoryService.findAll());
	} catch (err) {
		res.status(500).send({
			message: err.message || 'A apărut o eroare.',
		});
	}
};

exports.findOne = async (req, res) => {
	const id = req.params.id;
	try {
		res.send(await CategoryService.findById(req.params.id));
	} catch (err) {
		res.status(500).send({
			message: err.message || 'A apărut o eroare.',
		});
	}
};

exports.update = async (req, res) => {
	if (!req.body.name || !req.body.color) {
		res.status(400).send({
			message: 'Numele sau culoarea nu pot fi goale!',
		});
		return;
	}
	if (req.body.name === '-') {
		res.status(500).send({
			message: 'Numele nu poate fi "-"!',
		});
		return;
	}
	const id = req.params.id;

	try {
		await CategoryService.update(req.body, id);
		res.send({
			message: 'Categoria actualizată cu succes',
		});
	} catch (err) {
		res.status(500).send({
			message: err.message || 'A apărut o eroare.',
		});
	}
};

exports.delete = async (req, res) => {
	const id = req.params.id;

	try {
		await CategoryService.delete(id);
		res.send({
			message: 'Categoria stearsa cu succes',
		});
	} catch (err) {
		res.status(500).send({
			message: err.message || 'A apărut o eroare.',
		});
	}
};
