const express = require('express');
const router = express.Router();
const PedidosController = require('../controllers/PedidosController')
const login = require('../middleware/login');

router.get('/', PedidosController.getall);
router.post('/', login.required, PedidosController.create);
router.get('/:idPedido', PedidosController.byid);
router.put('/:idPedido', PedidosController.put);
router.delete('/:idPedido', PedidosController.delete);

module.exports = router;