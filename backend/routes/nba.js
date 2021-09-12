const { Router } = require("express");
const { check } = require('express-validator');
const { getPlayers, addPlayer } = require('../controllers/nba');
const { validarCampos } = require("../middlewares/validarCampos");

const router = Router();

//Agregar jugador si es admin
router.post('/add',[
    check('name','El nombre es onligatorio').isLength({min:2}).notEmpty(),
    check('team','El equipo es obligatorio').isLength({min:3}).notEmpty(),
    check('age','Edad Obligatoria').isNumeric({no_symbols: true}).notEmpty(),
    check('img','Url invalido').isURL({validate_length: true}),
    validarCampos,
],addPlayer);


//Obtener jugadores
router.get('/players',getPlayers);



module.exports = router;