
const Post = require("./Src/Models/Post");
let sequelize = require("./Src/Models/index")
console.log(sequelize.models);
function idRamdom(max) {

       return Math.floor(Math.random() * max)

}
async function joinPostCategories() {

  try {
    let{CategoryPost} = sequelize.models

    if(CategoryPost.count()){
      let posts = await Post.findAll()
      let prom = posts.map(p=>{
        return sequelize.query(`INSERT INTO public. "CategoryPost" ("createdAt", "updatedAt","CategoryId", "PostId")
        VALUES (NOW() ,NOW(),${idRamdom(15)}, ${p.id})`)
      })

    }


  } catch (e) {
     console.log(e);
  }

}
setTimeout(()=>{
  joinPostCategories()
},20000)
