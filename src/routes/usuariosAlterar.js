require('dotenv').config();
const express = require('express');
const router = express.Router();
const UsuariosAlterarController = require('../controllers/UsuariosAlterarController')


// -------------------------------------------------
router.put('/senha/:idUser',UsuariosAlterarController.alterarSenha)
router.put('/email/:idUser',UsuariosAlterarController.alterarEmail)

module.exports = router;