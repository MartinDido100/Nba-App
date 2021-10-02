const { Router } = require("express");
const { check } = require('express-validator');
const { registerUser, loginUser, verifyToken, googleLogin } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


//Registrar usuario
router.post('/register',[
    check('username','El nombre de usuario es obligatorio').isLength({min:3}).notEmpty(),
    check('email','El email es obligatorio').isEmail().notEmpty(),
    check('password','Contraseña obligatoria').isLength({min: 6}).notEmpty(),
    validarCampos
],registerUser);

router.post('/login',[
    check('username','El username es obligatorio').notEmpty(),
    check('password','Contraseña obligatoria').isLength({min: 6}).notEmpty(),
    validarCampos   
],loginUser);

router.post('/google',googleLogin);

router.get('/verify',validarJWT,verifyToken);

module.exports = router;