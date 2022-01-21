const jwt = require('jsonwebtoken');

function generateToken(user) {
	return jwt.sign({ name: user.given_name, lastName: user.family_name }, process.env.JWT_SECRET, { expiresIn: '3h' });
}

//verifyToken devuelve false si el token no es valido o true si la verificación es válida
function verifyToken(token) {
	return jwt.verify(token, process.env.JWT_SECRET, (err) => {
		return err ? false : true;
	});
}

const jwtMiddleware = (req, res, next) => {
	const token = req.headers['authorization'];
	if (token) {
		const verified = verifyToken(token);
		if (verified) {
			next();
		} else {
			res.status(401).json({ msg: 'Invalid token' });
			return false;
		}
	} else {
		res.status(401).json({ msg: 'no have token' });

		return false;
	}
};

module.exports = { generateToken, verifyToken, jwtMiddleware };
