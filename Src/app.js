const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.set('PORT', process.env.PORT || 4000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

module.exports = app;
