const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { generateFakeData, addUser, deleteData } = require('./utilities');

const app = express();

let corsOptions = {
	origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route to check api
app.get('/', (req, res) => {
	res.json({ message: 'API funcționează' });
});

require('./routes/expense.routes')(app);
require('./routes/category.routes')(app);
require('./routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});

deleteData().then(async () => {
	console.log("DELETED DATABASE DATA");
	await generateFakeData();
	console.log("GENERATED FAKE DATA");
	addUser('admin','admin');
	console.log("ADDED DEFAULT USER: admin, admin ")
});
