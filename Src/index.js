const app = require('./app');
const sequelize = require('./database');
app.listen(app.get('PORT'), async () => {
	try {
		await sequelize.authenticate();
		console.log('database is ready');
		await sequelize.sync({ force: false });
	} catch (error) {}
	console.log('server on port ' + app.get('PORT'));
});
