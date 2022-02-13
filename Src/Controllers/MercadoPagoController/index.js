const mercadopago = require("mercadopago");
const axios = require("axios").default;
const urlMp = "https://api.mercadopago.com/checkout/preferences";
const { transOrder } = require("../OrderControllers/index");
const { emailOrder } = require("../SendEmailController");
const User = require("../../Models/User");
const accesMp =
  "TEST-8815536356433300-012714-798045927f1e8d0e17b1412b6152bf2c-653565141";
mercadopago.configure({
  access_token:
    "TEST-8815536356433300-012714-798045927f1e8d0e17b1412b6152bf2c-653565141",
});

const createPreference = async (req, res) => {
  try {
    // console.log(req.body);
    const preference = {
      items: req.body.item,
      payer: {
        address: {
          street_name: req.body.payer.address.street_name,
        },
        email: req.body.payer.email,
      },
      metadata: {
        id: req.body.payer.id,
      },
      back_urls: {
        success: "https://api-ec.herokuapp.com/api/feedback",
        failure: "https://api-ec.herokuapp.com/api/feedback",
        pending: "https://api-ec.herokuapp.com/api/feedback",
      },
      auto_return: "approved",
    };

    const chargeData = await mercadopago.preferences.create(preference);
    //  console.log(chargeData);
    res
      .status(200)
      .json({ res: chargeData.body.init_point, userid: req.body.payer.id }); //status(200).json({ res: chargeData.body.init_point });
  } catch (err) {
    console.log(err);
  }
};

const feedback = async (req, res) => {
  try {
    const { status, preference_id } = req.query;
    //console.log(data);
    // res.redirect("http://localhost:3000/");
    console.log(status);
    if (status == "approved") {
      const preference = await axios.get(`${urlMp}/${preference_id}`, {
        headers: {
          Authorization: `Bearer ${accesMp}`,
        },
      });
      const { items, payer, metadata } = preference.data;
      // console.log(items);
      // console.log(payer);
      //realizamos la transacción
      await transOrder(items, payer, metadata);
      const user = await User.findByPk(Number(metadata.id));
      console.log(user.dataValues.email);
      await emailOrder(user.dataValues.email);
      // console.log(items, payer);
      res.redirect("http://localhost:3000/checkout/success");
    } else if (status == "rejected") {
      res.redirect("http://localhost:3000/checkout/failure");
    } else {
      res.redirect("http://localhost:3000/checkout/pending");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createPreference,
  feedback,
};
