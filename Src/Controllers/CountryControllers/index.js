const Country = require('../../Models/Country');

const getCountries = async (req, res, next) => {
	try {
		const countries = await Country.findAll();

		res.status(200).json(countries);
	} catch (err) {
        res.status(400).send('problem with countries')
		console.error(err);
	}
};

module.exports = {getCountries}