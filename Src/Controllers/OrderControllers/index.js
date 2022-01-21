// Order
const Order = require("../../Models/Order");
const User = require("../../Models/User");
const Product = require("../../Models/Product");

const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();

    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
  }
};
const getOrderId = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(parseInt(id));

    if (order) res.status(200).json(order);
    else res.status(404).json({ msg: "Order not found" });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getOrders,
  getOrderId,
};
