const decoder = require("jwt-decode");
const User = require("../../Models/User");
const GoogleAuth = async (req, res) => {
  try {
    let token;
    if (req.body.credential) {
      token = req.body.credential;
    } else {
      token = req.query.token;
    }
    const data = decoder(token);
    console.log(data, "asdasdasd");
    const user = await User.findOne({
      where: {
        email: data.email,
      },
    });
    if (user) {
      user.update({image:data.picture})
      return res.status(200).json({
        msg: "user logged",
        token: token,
        id: Number(user.id),
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        rol: user.role,
        image: user.image,
      });
    }

    const dat = {
      username: data.given_name,
      email: data.email,
      first_name: data.given_name,
      last_name: data.family_name,
      image: data.picture,
      token: token,
    };
    await User.create(dat);
    return res.status(200).json(dat);
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

module.exports = { GoogleAuth };
