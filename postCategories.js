
const Post = require("./Src/Models/Post");
let sequelize = require("./Src/Models/index")
console.log(sequelize.models);
var itCategories = 1
function idRamdom(max) {
     if (itCategories==16) {
       itCategories = 1
     }
     //Math.floor(Math.random() * max)+1
     itCategories++
     return itCategories

}
async function joinPostCategories() {

  try {
    let{CategoryPost} = sequelize.models

    if(CategoryPost.count()==0){
      let posts = await Post.findAll()
      let i=0
      while (i<3) {
        let prom = posts.map(p=>{
          return sequelize.query(`INSERT INTO public. "CategoryPost" ("createdAt", "updatedAt","CategoryId", "PostId")
          VALUES (NOW() ,NOW(),${idRamdom(15)}, ${p.id})`)
        })
        Promise.all(prom).catch(e=>console.log("tal vez siga funcionando el server"))
        i++
      }


    }


  } catch (e) {
     console.log("tal vez siga funcionando el server");
  }

}
setTimeout(()=>{
  joinPostCategories()
},20000)
