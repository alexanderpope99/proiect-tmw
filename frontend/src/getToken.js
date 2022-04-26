const getToken = () => {
	return sessionStorage.getItem('token');
};

module.exports = getToken;