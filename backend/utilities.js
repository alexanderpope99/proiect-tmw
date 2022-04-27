const faker = require('faker');
const UserService = require('./services/user.services');
const CategoryService = require('./services/category.services');
const ExpenseService = require('./services/expense.services');

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
	deleteData: async () => {
		await ExpenseService.deleteAll();
		await CategoryService.deleteAll();
	},
	generateFakeData: async () => {
		let categories = [];
		for (let i = 0; i <= 3; i++) {
			let categoryName = faker.commerce.department();
			while (categories.includes(categoryName))
				categoryName = faker.commerce.department();
			categories.push(categoryName);
			let category = await CategoryService.create(categoryName, faker.commerce.color())
			let randomInt = getRndInteger(3, 6);
			for (let j = 0; j <= randomInt; j++) {
				await ExpenseService.create(faker.commerce.productName(), faker.date.past().toISOString().slice(0,10), faker.commerce.price(), category.id);
			}
		}
		for (let j = 0; j <= 2; j++) {
			await ExpenseService.create(faker.commerce.productName(), faker.date.past().toISOString(), faker.commerce.price(), null)
		}
	},
	addUser: async (username, password) => {
		await UserService.create(username, password);

	},

}