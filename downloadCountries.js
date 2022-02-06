let axios = require("axios");
const sequelize = require("./Src/Database");
const Category = require("./Src/Models/Category");
let Country = require("./Src/Models/Country");
const User = require("./Src/Models/User");
const bcrypt = require("bcryptjs");
const saltRound = 10;
const salt = bcrypt.genSaltSync(saltRound);
const password = bcrypt.hashSync("1234", salt);

require('./postCategories.js');

var country = Country;
let descriptionText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros. Cras viverra ligula nec nibh consequat posuere. Proin dignissim, velit a blandit placerat, velit quam porta enim, sodales mattis dolor nisi non sapien. Pellentesque ac dui et urna venenatis mollis in eget nibh. Donec in est bibendum, interdum ex id, dictum mi. Vestibulum maximus justo non mollis interdum. Suspendisse at lacus quis augue fringilla finibus eu id ex. Phasellus aliquet mi ut arcu congue egestas. Proin vehicula est eget nunc imperdiet semper. In vitae lorem eget eros efficitur varius. Nulla non diam feugiat libero convallis finibus. Nullam sit amet mi quis nunc vestibulum fringilla. Ut vel arcu vehicula, maximus lacus suscipit, lacinia lectus. Suspendisse sed consectetur nisl. Nullam vel nunc at odio pulvinar mollis eu ac felis. Etiam mattis mauris sem.`;

function getPriceRandom() {
  return Math.floor(Math.random() * 1000);
}

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
        if (res.data[i].region === "Americas") {
          saveInDatabase(res.data[i]);
        }

        i++;
      }
    })
    .catch((err) => console.log(err));
}
async function paddingData() {
  try {
    let con = await country.count();
    if (con == 0) {
      requestCountries();
      console.log("creating countries");
    }
    let casCon = await Category.count();
    if (casCon == 0) {
      await sequelize.query(`INSERT INTO public."Categories"(
        id, name, "createdAt", "updatedAt")
        VALUES (default,'Vehiculos',NOW(),NOW()),(default,'Animales y Mascotas',NOW(),NOW()),(default,'Arte, Librería y Mercería',NOW(),NOW()),(default,'Bebés',NOW(),NOW()),
               (default,'Belleza y Cuidado Personal',NOW(),NOW()),(default,'Computación',NOW(),NOW()),(default,'Consolas y Videojuegos',NOW(),NOW()),(default,'Construcción',NOW(),NOW()),(default,'Deportes y Fitness',NOW(),NOW()),
               (default,'Electrónica, Audio y Video',NOW(),NOW()),(default,'Hogar, Muebles y Jardín',NOW(),NOW()),(default,'Instrumentos Musicales',NOW(),NOW()),(default,'Libros, Revistas y Comics',NOW(),NOW()),(default,'Salud y Equipamiento Médico',NOW(),NOW()),
               (default,'Souvenirs, Cotillón y Fiestas',NOW(),NOW()),(default,'Otras categorías',NOW(),NOW())
      `);
      console.log("creating Categories");
    }

    //userDefault
    let conUs = await User.count();

    if (conUs == 0) {

      setTimeout(async () => {
        await sequelize.query(`INSERT INTO public."Users"(

         id, first_name, last_name, username, password, email, dni, phone,image, "createdAt", "updatedAt", "CountryId", role)
         VALUES (default,'Nicolas','Nicolas','Nicolas','${password}','nico@nico.com', '3423425','42324253','https://i.pinimg.com/564x/49/c5/33/49c53331d19be74b52d47fcce7e97468.jpg', NOW(), NOW(), 1, 'admin'),
         (default,'Marcos','Marcos','Marcos', '${password}','nico2@nico.com', '34234275','42324253','https://i.pinimg.com/564x/49/c5/33/49c53331d19be74b52d47fcce7e97468.jpg', NOW(), NOW(), 1, 'user'),
         (default,'juanda','juanda','juanda','${password}','nico1@nico.com', '34234285','42324253','https://i.pinimg.com/564x/49/c5/33/49c53331d19be74b52d47fcce7e97468.jpg', NOW(), NOW(), 1, 'admin'),
         (default,'alvaro','alvaro','alvaro','${password}','nico3@nico.com', '342334285','42324253','https://i.pinimg.com/564x/49/c5/33/49c53331d19be74b52d47fcce7e97468.jpg', NOW(), NOW(), 1, 'user'),
         (default,'roiner','roiner','roiner','${password}','nico4@nico.com', '3442334285','42324253','https://i.pinimg.com/564x/49/c5/33/49c53331d19be74b52d47fcce7e97468.jpg', NOW(), NOW(), 1, 'admin');


         INSERT INTO public."Posts"(
           id, name, description, price, stock, status, "createdAt", "updatedAt", "UserId")
           VALUES (default,'Guitarra','suena bien' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Mosquete','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Choripan','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),2),
           (default,'Juguete','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),3),
           (default,'Alcachofas','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Gorra','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),3),
           (default,'Mouse','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Monitor','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Matambre','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Carton','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Lapicera','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Parlantes','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Monitor','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),2),
           (default,'Televisor','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Bicicleta','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Ford Fiesta','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Repasador','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Cortina','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Silla de caño','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Pez Globo','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Camara Web','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Curso de guitarra','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Tomate xKg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Caño de escape','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Espejo Yamaha','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Teclado Gamer','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Cuchilla sin filo','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Pistola de agua','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Pancho de plastico','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Perro Azul','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Computadora invisible','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Cena conmigo','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Cositas','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Peluqueria Gratis','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Harto de escribir','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Otro producto','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Producto prometedor','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Producto Valioso','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Muchos Productos','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Papa','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Mosquete','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),3),
           (default,'Choripan','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),2),
           (default,'Juguete','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Alcachofas','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),3),
           (default,'Gorra','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),3),
           (default,'Mouse','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),2),
           (default,'Monitor','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Matambre','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Carton','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),3),
           (default,'Lapicera','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Parlantes','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Monitor','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Televisor','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Bicicleta','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Ford Fiesta','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Repasador','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Cortina','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Silla de caño','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Pez Globo','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Camara Web','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Curso de guitarra','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Tomate xKg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Caño de escape','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Espejo Yamaha','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Teclado Gamer','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Cuchilla sin filo','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Pistola de agua','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Pancho de plastico','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Perro Azul','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Computadora invisible','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Cena conmigo','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Cositas','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),3),
           (default,'Peluqueria Gratis','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Harto de escribir','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),2),
           (default,'Otro producto','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Producto prometedor','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Producto Valioso','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Muchos Productos','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Papa','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Cortina','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Silla de caño','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Pez Globo','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Camara Web','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Curso de guitarra','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Tomate xKg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Caño de escape','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Espejo Yamaha','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Teclado Gamer','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Cuchilla sin filo','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Pistola de agua','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Pancho de plastico','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Perro Azul','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Computadora invisible','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Cena conmigo','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Cositas','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),3),
           (default,'Peluqueria Gratis','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Harto de escribir','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),2),
           (default,'Otro producto','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Producto prometedor','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Producto Valioso','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Muchos Productos','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1),
           (default,'Papa','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.' ,${getPriceRandom()}, 5,true,NOW() ,NOW(),1)
         `).catch(err=>console.log(err));
         await axios.post(
          `http://localhost:${process.env.PORT || 4000}/api/register`,
          {
            username: "henry",
            password: "101010",
            image:
              "https://i.pinimg.com/564x/49/c5/33/49c53331d19be74b52d47fcce7e97468.jpg",
          }
        );
      }, 8000);

    }
  } catch (err) {
    console.log(err);
  }
}
setTimeout(() => {
  paddingData();
}, 5000);
