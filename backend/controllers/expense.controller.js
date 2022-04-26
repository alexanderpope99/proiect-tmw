const ExpenseService = require('../services/expense.services');

exports.create = async (req, res) => {
	if (!req.body.name || !req.body.date || !req.body.amount) {
		res.status(400).send({
			message: 'Niciun câmp nu poate fi gol',
		});
		return;
	}

	if (isNaN(req.body.amount)) {
		res.status(400).send({
			message: 'Suma trebuie să fie număr',
		});
		return;
	}

	try {
		res.send(await ExpenseService.create(req.body.name, req.body.date, req.body.amount, req.body.categoryId));
	} catch (err) {
		res.status(500).send({
			message: err.message || 'A apărut o eroare.',
		});
	}
};

exports.findAll = async (req, res) => {
	try {
		res.send(await ExpenseService.findAll(req.params.offset,req.params.limit));
	} catch (err) {
		res.status(500).send({
			message: err.message || 'A apărut o eroare.',
		});
	}
};

exports.findAllSort = async (req, res) => {
	try {
		res.send(await ExpenseService.findAllSort(req.params.offset,req.params.limit,req.params.sorting,req.params.order));
	} catch (err) {
		res.status(500).send({
			message: err.message || 'A apărut o eroare.',
		});
	}
};

exports.findOne = async (req, res) => {
	const id = req.params.id;

	try {
		res.send(await ExpenseService.findById(req.params.id));
	} catch (err) {
		res.status(500).send({
			message: err.message || 'A apărut o eroare.',
		});
	}
};

exports.update = async (req, res) => {
	if (!req.body.name || !req.body.date || !req.body.amount) {
		res.status(400).send({
			message: 'Niciun câmp nu poate fi gol',
		});
		return;
	}
	const id = req.params.id;

	if (isNaN(req.body.amount)) {
		res.status(400).send({
			message: 'Suma trebuie să fie număr',
		});
		return;
	}

	try {
		await ExpenseService.update(req.body, id);
		res.send({
			message: 'Cheltuiala actualizată cu succes',
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
		await ExpenseService.delete(id);
		res.send({
			message: 'Cheltuiala stearsa cu succes',
		});
	} catch (err) {
		res.status(500).send({
			message: err.message || 'A apărut o eroare.',
		});
	}
};
