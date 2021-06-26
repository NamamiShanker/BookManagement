// Authorization middleware to verify token and return user information
// Format of Token
// Authorization: Bearer <access token>
var jwt = require('jsonwebtoken')

var verifyUser = (req, res, next) => {
	var bearerHeader = req.headers['authorization'];
	if(typeof bearerHeader !== 'undefined'){
		var bearerToken = bearerHeader.split(' ')[1];
		var decode = jwt.verify(bearerToken, process.env.JWT_SECRET_KEY);
		req.user = decode.user;
		next();
	}
	else {
		res.statusCode = 403;
		res.setHeader('Content-Type', 'application/json');
		res.json({
			success: false,
			msg: 'No authorization token found'
		})
	}
}

module.exports = verifyUser;