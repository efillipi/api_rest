require('dotenv').config();
const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController')
const UsuariosAlterarController = require('../controllers/UsuariosAlterarController')
const login = require('../middleware/login');

// -------------------------------------------------
router.get('/',login.required,UsuarioController.getall)
// -------------------------------------------------
router.post('/',UsuarioController.create)
// -------------------------------------------------
router.get('/:idUser',UsuarioController.byid)
// -------------------------------------------------
router.put('/:idUser', login.required,UsuarioController.put)
// -------------------------------------------------
router.delete('/:idUser', login.required,UsuarioController.delete)
// -------------------------------------------------
router.put('/senha/:idUser',login.required,UsuariosAlterarController.alterarSenha)
// -------------------------------------------------
router.put('/email/:idUser',login.required,UsuariosAlterarController.alterarEmail)
// -------------------------------------------------

module.exports = router;