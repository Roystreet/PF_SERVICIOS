require("dotenv").config();

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(`postgres://${process.env.USER}:${process.env.PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?sslmode=no-verify`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  dialectOptions : {
      ssl : {
        require: true,
        rejectUnauthorized: false // <<<<<<< YOU NEED THIS
      }
    }
})


module.exports = sequelize;
