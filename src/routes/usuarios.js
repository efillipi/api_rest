require('dotenv').config();
const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController')
const UsuariosAlterarController = require('../controllers/UsuariosAlterarController')
const login = require('../middleware/login');

// -------------------------------------------------
router.get('/',UsuarioController.getall)
// -------------------------------------------------
router.post('/',UsuarioController.create)
// -------------------------------------------------
router.get('/:idUser',UsuarioController.byid)
// -------------------------------------------------
router.put('/:idUser', UsuarioController.put)
// -------------------------------------------------
router.delete('/:idUser', UsuarioController.delete)
// -------------------------------------------------
router.put('/senha/:idUser',UsuariosAlterarController.alterarSenha)
// -------------------------------------------------
router.put('/email/:idUser',UsuariosAlterarController.alterarEmail)
// -------------------------------------------------

module.exports = router;