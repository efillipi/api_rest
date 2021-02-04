require('dotenv').config();
const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController')

// -------------------------------------------------
router.get('/',UsuarioController.getall)
// -------------------------------------------------
router.post('/',UsuarioController.create)
// -------------------------------------------------
router.get('/:idUser',UsuarioController.byid)

router.put('/:idUser', UsuarioController.put)

router.delete('/:idUser', UsuarioController.delete)
// -------------------------------------------------
module.exports = router;