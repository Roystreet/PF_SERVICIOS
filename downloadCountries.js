let  axios = require("axios");
let Country  = require("./Src/Models/Country");
var country = Country

//bajar todo de la api para la base de datos
async function saveInDatabase(countryObj) {
  await country.create({
    name: countryObj.name.common,
  });
}

const urlRC = "https://restcountries.com/v3/all";

axios.get(urlRC)
    .then((res) => {
      let i = 0;
      // 250 countries in the other api
      while (i < 250) {
        saveInDatabase(res.data[i]);
        i++;
      }
    })
    .catch((err) => console.log(err));

  // //   let f = {
  //     "name": "papaya",
  //     "description": "Una papaya colombiana",
  //     "price": 20,
  //     "stock": 3,
  //     "status": true,
  //     "userId":1
  //     "categoryId":1
  //   }
  // //   let me = {
  //
  //     "first_name": "JuanDa Iron-mind",
  //     "last_name": null,
  //     "username": null,
  //     "password": "felixd1a12",
  //     "email": "davidtovarmontoya@gmail.com",
  //     "dni": "1003697819",
  //     "phone": "3117599898",
  //     "createdAt": "2022-01-20T01:45:21.226Z",
  //     "updatedAt": "2022-01-20T01:45:21.226Z",
  //     "countryId": null
  // }

//   await User.create({
//
//     "first_name": "JuanDa Iron-mind",
//     "last_name": null,
//     "username": null,
//     "password": "felixd1a12",
//     "email": "davidtovarmontoya@gmail.com",
//     "dni": "1003697819",
//     "phone": "3117599898",
//     "countryId": null
// })

//update
// {
//   "data":{
//       "name": "papaya",
//       "description": "Una papaya colombiana",
//       "price": 40,
//       "stock": 3,
//       "status": false,
//       "userId":1
//     },
// "id":1
// }
