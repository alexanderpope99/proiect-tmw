const { defineModel } = require('firestore-sequelizer');
const User = defineModel('users', {
	username: {
		type: 'string',
		required: true,
	},
	password: {
		type: 'string',
		required: true,
	},
});

module.exports = User;