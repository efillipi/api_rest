const express = require('express');
const routes = express();
// -----------------------------
const rotaProdutos = require('./produtos');
const rotaPedidos = require('./pedidos');
const rotaUsuarios = require('./usuarios');
// -----------------------------
routes.use('/produtos', rotaProdutos);
routes.use('/pedidos', rotaPedidos);
routes.use('/usuarios', rotaUsuarios);
// -----------------------------
module.exports = routes;

