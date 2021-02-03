const express = require('express');
const routes = express();

const rotaProdutos = require('./produtos');
const rotaPedidos = require('./pedidos');


routes.use('/produtos', rotaProdutos);
routes.use('/pedidos', rotaPedidos);

module.exports = routes;

