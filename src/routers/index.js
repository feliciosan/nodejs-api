const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const userRouter = require('./user');
const productRouter = require('./product');

const routes = (app) => {
    app.use(userRouter(router, auth));
    app.use(productRouter(router, auth));
};

module.exports = routes;
