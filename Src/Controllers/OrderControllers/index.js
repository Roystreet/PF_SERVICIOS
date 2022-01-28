// Order
const Order = require("../../Models/Order");
const User = require("../../Models/User");
const Post = require("../../Models/Post");

const createOrder = async (req, res) => {
  try {
    const {
      posts,
      userId,
      total,
      delivery_adress
    } = req.body;
    const newOrder = await Order.create({
      delivery_adress: delivery_adress,
      total: total,
      UserId: userId,
    });
    await newOrder.setPosts(posts);
    res.status(200).json(newOrder);
  } catch (err) {
    console.log(err);
  }
};
const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [Post, User]
    });

    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
  }
};
const getOrderId = async (req, res) => {
  try {
    const {
      id
    } = req.params;

    const order = await Order.findByPk(parseInt(id));

    if (order) res.status(200).json(order);
    else res.status(404).json({
      msg: "Order not found"
    });
  } catch (err) {
    console.error(err);
  }
};

const getOrderUser = async (req, res) => {
  try {
    const {
      id
    } = req.body;
    const orderCustomer = await Order.findAll({
      where: {
        UserId: parseInt(id),
      },
      include: Post,
    });
    console.log(orderCustomer);
    res.status(200).json(orderCustomer);
  } catch (err) {
    console.log(err);
  }
};

const updateStatusOrder = async (req, res) => {
  try {} catch (err) {}
};

module.exports = {
  getOrders,
  getOrderId,
  createOrder,
  getOrderUser,
};