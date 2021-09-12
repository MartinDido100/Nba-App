const { Router } = require("express");
const { check } = require('express-validator');
const { validarCampos } = require("../middlewares/validarCampos");
const { verificarRol } = require("../middlewares/verificarRol");
const { changeRole } = require('../controllers/roles');

const router = Router();

router.put('/change',[
    check('email','Email obligatorio').isEmail().notEmpty(),
    check('username','Username Obligatorio').notEmpty(),
    check('role','Rol necesatrio').notEmpty(),
    verificarRol,
    validarCampos,
],changeRole);

module.exports = router;