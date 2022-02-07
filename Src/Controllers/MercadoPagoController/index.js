const mercadopago = require("mercadopago");
const axios = require("axios").default;
const urlMp = "https://api.mercadopago.com/checkout/preferences";
const { transOrder } = require("../OrderControllers/index");
const accesMp =
  "TEST-8815536356433300-012714-798045927f1e8d0e17b1412b6152bf2c-653565141";
mercadopago.configure({
  access_token:
    "TEST-8815536356433300-012714-798045927f1e8d0e17b1412b6152bf2c-653565141",
});

const createPreference = async (req, res) => {
  console.log(req.body.item);
  const preference = {
    items: req.body.item,
    payer: {
      id: req.body.id,
    },
    back_urls: {
      success: "https://api-ec.herokuapp.com/api/feedback",
      failure: "https://api-ec.herokuapp.com/api/feedback",
      pending: "https://api-ec.herokuapp.com/api/feedback",
    },
    auto_return: "approved",
  };

  const chargeData = await mercadopago.preferences.create(preference);
  console.log(chargeData);
  res.status(200).json({ res: chargeData.body.init_point }); //status(200).json({ res: chargeData.body.init_point });
};

const feedback = async (req, res) => {
  const { status, preference_id } = req.query;
  //console.log(data);
  // res.redirect("http://localhost:3000/");
  if (status == "approved") {
    const preference = await axios.get(`${urlMp}/${preference_id}`, {
      headers: {
        Authorization: `Bearer ${accesMp}`,
      },
    });
    const { items, payer } = preference.data;
    //realizamos la transacción
    await transOrder(items, payer);

    // console.log(items, payer);
    res.redirect("http://localhost:3000/checkout/success");
  } else if (status == "failure") {
    res.redirect("http://localhost:3000/checkout/failure");
  } else {
    res.redirect("http://localhost:3000/checkout/pending");
  }
};

module.exports = {
  createPreference,
  feedback,
};
