// Order
const Order = require("../../Models/Order");
const User = require("../../Models/User");
const Post = require("../../Models/Post");
const OrderDetail = require("../../Models/OrderDetail");
const sequelize = require("../../database");

const createOrder = async (req, res) => {
  try {
    const { posts, userId, total, delivery_adress } = req.body;
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
      include: [User, { model: OrderDetail, include: { model: Post } }],
    });
    const orderResul = orders.map((data) => {
      return {
        id: data.id,
        delivery_adress: data.delivery_address,
        status: data.status,
        total: data.total,
        created: data.createdAt,
        user: {
          id: data.User.id,
          username: data.User.username,
        },
        OrderDetail: data.OrderDetails.map((data) => {
          return {
            id: data.id,
            amount: data.amount,
            posts: {
              id: data.Post.id,
              name: data.Post.name,
              description: data.Post.description,
              price: data.Post.price,
            },
          };
        }),
      };
    });

    res.status(200).json(orderResul);
  } catch (err) {
    console.error(err);
  }
};
const getOrderId = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(parseInt(id));

    if (order) res.status(200).json(order);
    else
      res.status(404).json({
        msg: "Order not found",
      });
  } catch (err) {
    console.error(err);
  }
};

const getOrderUser = async (req, res) => {
  try {
    const { id } = req.body;
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
  try {
    const { status } = req.body;
    const order = await Order.findByPk(parseInt(req.params.id));
    if (order) {
      await Order.update({ status: status }, { where: { id: req.params.id } });
      res.json({ msg: "Order updated successfully" });
    } else {
      res.json({ msg: "Order not found" });
    }
  } catch (err) {
    console.log(err);
  }
};

const getOrderForUser = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [User, { model: OrderDetail, include: { model: Post } }],
      where: { username: req.username },
    });
    const orderResul = orders.map((data) => {
      return {
        id: data.id,
        delivery_adress: data.delivery_address,
        status: data.status,
        total: data.total,
        created: data.createdAt,
        user: {
          id: data.User.id,
          username: data.User.username,
        },
        OrderDetail: data.OrderDetails.map((data) => {
          return {
            id: data.id,
            amount: data.amount,
            posts: {
              id: data.Post.id,
              name: data.Post.name,
              description: data.Post.description,
              price: data.Post.price,
            },
          };
        }),
      };
    });

    res.status(200).json(orderResul);
  } catch (err) {
    console.error(err);
  }
};

const transOrder = async (item, payer) => {
  const t = await sequelize.transaction();
  try {
    // iniciamos la transaccion
    //const t = await sequelize.transaction();
    const totalOrder = item
      .map((data) => data.quantity * data.unit_price)
      .reduce((acc, item) => acc + item);
    const order = await Order.create(
      {
        delivery_adress: payer.address.street_name || "direccion de prueba ",
        total: totalOrder,
        UserId: payer.id || 1,
      },
      { transaction: t }
    );
    // llenar la base de detalle
    // const orderDetail
    console.log("transaccion" + order.id);
    const promises = [];
    for (let i = 0; i < item.length; i++) {
      const ordenDetail = OrderDetail.create(
        {
          PostId: item[i].id,
          OrderId: order.id,
          amount: item[i].quantity,
        },
        { transaction: t }
      );
      promises.push(ordenDetail);
    }
    await Promise.all(promises);
    // commit de la transaccion
    await t.commit();
  } catch (err) {
    // en caso no pueda realizarse la transaccion regresamos los cambios realizados
    await t.rollback();
    console.log(err);
  }
};
const getOrderDetailId = async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await Order.findByPk(parseInt(id), {
      include: [User, { model: OrderDetail, include: { model: Post } }],
      where: { username: req.username },
    });
    const orderResul = orders.map((data) => {
      return {
        id: data.id,
        delivery_adress: data.delivery_address,
        status: data.status,
        total: data.total,
        created: data.createdAt,
        user: {
          id: data.User.id,
          username: data.User.username,
        },
        OrderDetail: data.OrderDetails.map((data) => {
          return {
            id: data.id,
            amount: data.amount,
            posts: {
              id: data.Post.id,
              name: data.Post.name,
              description: data.Post.description,
              price: data.Post.price,
            },
          };
        }),
      };
    });

    res.status(200).json(orderResul);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getOrders,
  getOrderId,
  createOrder,
  getOrderUser,
  transOrder,
  getOrderForUser,
  getOrderDetailId,
  updateStatusOrder,
};
