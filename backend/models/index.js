const firebaseSequelizer = require('firestore-sequelizer');
let admin = require('firebase-admin');
let serviceAccount = require('../proiecttic-2b871-firebase-adminsdk-4it56-ba46afaa7d.json');
const dbConfig = require('../config/db.config');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: dbConfig.databaseURL,
});
firebaseSequelizer.initializeApp(admin);

const db = {};

db.expenses = require('./expense.model.js');
db.categories = require('./category.model.js');
db.users = require('./user.model.js');

module.exports = db;
