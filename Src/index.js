const app = require('./app');
const sequelize = require('./Database');

app.listen(app.get('PORT'), async () => {
	try {
		await sequelize.authenticate();
		console.log('database is ready');
		await sequelize.sync({ force: true });
		console.log('server on port ' + app.get('PORT'));
	} catch (error) {
		console.log(error);
	}
});
