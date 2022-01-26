const app = require("./app");
const sequelize = require("./Database");

app.listen(app.get("PORT"), async () => {
  try {
    await sequelize.authenticate();
    console.log("database is ready");
    await sequelize.sync({ force: false });
    console.log("server on port " + app.get("PORT"));
  } catch (error) {
    console.log(error);
  }
});

async function paddingData() {
  let con = await sequelize.models.Country.findAll()
  if(con.length == 0){
    require("../downloadCountries")
  }
}
paddingData()