const mercadopago = require("mercadopago");
const axios = require("axios").default();

mercadopago.configure({
  access_token:
    "TEST-8815536356433300-012714-798045927f1e8d0e17b1412b6152bf2c-653565141",
});

const createPreference = async (req, res) => {
  console.log(req.body.item);
  const preference = {
    items: req.body.item,
    back_urls: {
      success: "http://localhost:4000/api/feedback",
      failure: "http://localhost:4000/api/feedback",
      pending: "http://localhost:4000/api/feedback",
    },
    auto_return: "approved",
  };

  const chargeData = await mercadopago.preferences.create(preference);
  console.log(chargeData);
  res.status(200).json({ res: chargeData.body.init_point });
};

const feedback = async (req, res) => {
  const data = req.query;

  console.log(data);
  res.redirect("http://localhost:3001/");
};

module.exports = {
  createPreference,
  feedback,
};
