const { defineModel } = require('firestore-sequelizer');
const Category = defineModel('categories', {
	name: {
		type: 'string',
		required: true,
	},
	color: {
		type: 'string',
		required: true,
	},
});

module.exports = Category;