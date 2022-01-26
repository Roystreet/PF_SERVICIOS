let axios = require("axios");
let Country = require("./Src/Models/Country");
var country = Country;

//bajar todo de la api para la base de datos
async function saveInDatabase(countryObj) {
  await country.create({
    name: countryObj.name.common,
  });
}
function requestCountries() {
  const urlRC = "https://restcountries.com/v3/all";

  axios
    .get(urlRC)
    .then((res) => {
      let i = 0;
      // 250 countries in the other api
      while (i < 250) {
        saveInDatabase(res.data[i]);
        i++;
      }
    })
    .catch((err) => console.log(err));
}
async function paddingData() {
  let con = await country.findAll()
  if(con.length == 0){
    requestCountries()
  }
}
paddingData()