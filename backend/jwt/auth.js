const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
	let token = req.header('Authorization');

	if (!token) {
		return res.status(403).send({ message: 'Nu sunteti autentificat' });
	}

	if (token.startsWith('Bearer ')) {
		token = token.slice(7, token.length).trimLeft();
	}

	try {
		req.user = jwt.verify(token, 'alexandru');
	} catch (err) {
		return res.status(401).send({ message: 'Token Invalid' });
	}
	return next();
};

module.exports = verifyToken;