const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = db.users;

module.exports = {
	create: async (username, password) => {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = {
			username: username,
			password: hashedPassword,
		};

		return User.create(user);
	},
	login: async (username,password) => {
		let user = (await User.findAll({
			where: {
				username: username,
			},
		}));
		if (user.length === 0)
			throw Error('Nu exista acest username');
		else user = user[0].data;
		const validPass = await bcrypt.compare(password, user.password);
		if (!validPass) throw Error('Parola incorecta');

		return jwt.sign({ id: user.id }, 'alexandru', {
			expiresIn: '2h',
		});
	}
}