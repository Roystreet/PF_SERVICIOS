const posts = require("./post (1).json");
const axios = require("axios");

var Token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbnJ5Iiwicm9sIjoidXNlciIsImlhdCI6MTY0NDM3NzQ5NiwiZXhwIjoxNjQ0NDYzODk2fQ.Q_sFCFbGmSVrMltvcMtbsmm_Kf9dGZ6zg9geRGsbaLs.QTmOgTwnCc6F1tGFTfjsY4FjfY-3lbFO62sK2O_9Ibo";
function create_post(payload, token) {
  return axios
    .post("http://127.0.0.1:4000/api/admin/post", payload, {
      headers: {
        "token": token,
        "content-type": "application/json",
      },
    })
    .then((response) => response.data)
    .then((json) => {
      console.log("succes");
    })
    .catch((e) => console.error(e));
}


let obj = {
  "name": "ejemplazo",
  "description":
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.",
  "price": "16",
  "stock": 5,
  "ratingProm": "0",
  "status": true,
  "UserId": 1,
  "Images": [
    "https://st.depositphotos.com/4177785/52464/v/600/depositphotos_524644756-stock-illustration-auction-winner-gradient-linear-vector.jpg",
    "https://st.depositphotos.com/4177785/51549/v/600/depositphotos_515492510-stock-illustration-bomb-defusing-robots-rgb-color.jpg",
    "https://st4.depositphotos.com/12780408/25377/v/450/depositphotos_253773806-stock-illustration-quality-control-line-icon-concept.jpg",
  ],
  "Categories": [],
  "Questions": [],
};
//create_post(obj,Token);

function productsWithImages() {
  try {
    posts.map(p=>{
      return create_post({
          "name": p.name,
          "description":p.description,
          "price": p.price,
          "stock": p.stock,
          "ratingProm": p.ratingProm,
          "status": p.status,
          "UserId": p.UserId,
          "Images": p.Images.map(i=>i.link),
          "Categories":p.Categories.map(i=>i.id)

        },
        Token
    )
    })
  } catch (e) {
    console.log("Actualiza el token de los scripts");
  }

}
setTimeout(()=>{
  console.log("creating products")
  productsWithImages()
},20000)
module.exports = productsWithImages
