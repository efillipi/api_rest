const express = require('express');
const routes = express();
// -----------------------------
const rotaProdutos = require('./produtos');
const rotaPedidos = require('./pedidos');
const rotaUsuarios = require('./usuarios');
const rotaLogin = require('./login');
// -----------------------------
routes.use('/produtos', rotaProdutos);

routes.use('/pedidos', rotaPedidos);

routes.use('/usuarios', rotaUsuarios);

routes.use('/login', rotaLogin);
// -----------------------------
module.exports = routes;

