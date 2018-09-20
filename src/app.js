'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();

mongoose.connect(config.connectionString);
//Carga dos Models
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

//Import das rotas
const indexRoute = require('./routers/index-route');
const productsRoute = require('./routers/products-route');
const customerRoute = require('./routers/customer-route');
const orderRoute = require('./routers/order-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/products', productsRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

module.exports = app;