
const Post = require("./Src/Models/Post");
let sequelize = require("./Src/Models/index")
console.log(sequelize.models);
function idRamdom(max) {
  let result = 0
  while(result === 0) {
    result = Math.floor(Math.random() * max)
  }
  return result

}
async function joinPostCategories() {

  try {
    let{CategoryPost} = sequelize.models

    if(CategoryPost.count()){
      let posts = await Post.findAll()
      let prom = posts.map(p=>{
        return sequelize.query(`INSERT INTO public. "CategoryPost" ("createdAt", "updatedAt","CategoryId", "PostId")
        VALUES (NOW() ,NOW(),${idRamdom(14)}, ${p.id})`)
      })

    }


  } catch (e) {
     console.log("el error en el scripts CategoryPost se está arreglando. Tenga paciencia");
  }

}
setTimeout(()=>{
  joinPostCategories()
},20000)
