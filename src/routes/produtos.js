require('dotenv').config();
const express = require('express');
const router = express.Router();
const multer = require('../utils/multer');
const login = require('../middleware/login');
const ProdutosController = require('../controllers/ProdutosController')

router.get('/', ProdutosController.getall)
router.post('/',  login.required, multer.upload.single('imagem'),ProdutosController.getall)
router.put('/:idProduto', login.required,ProdutosController.put)
router.get('/:idProduto', login.optional,ProdutosController.byid)
router.delete('/:idProduto', login.required,ProdutosController.delete)

module.exports = router;