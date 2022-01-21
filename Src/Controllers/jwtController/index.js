const jwt = require('jsonwebtoken');

//user debe ser un objeto con el id del usuario y el rol
function generateToken(user) {
	return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '3h' });
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
