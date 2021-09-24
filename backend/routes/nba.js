const { Router } = require("express");
const { check } = require('express-validator');
const { getPlayers, addPlayer, deletePlayer, editPlayer, getPlayer } = require('../controllers/nba');
const { validarCampos } = require("../middlewares/validarCampos");

const router = Router();

//Agregar jugador si es admin
router.post('/add',[
    check('name','El nombre es onligatorio').isLength({min:2}).notEmpty(),
    check('team','El equipo es obligatorio').isLength({min:3}).notEmpty(),
    check('age','Edad Obligatoria').isNumeric({no_symbols: true}).notEmpty(),
    validarCampos,
],addPlayer);


//Obtener jugadores
router.get('/players',getPlayers);

router.put('/edit',[
    check('name','El nombre es onligatorio').isLength({min:2}).notEmpty(),
    check('team','El equipo es obligatorio').isLength({min:3}).notEmpty(),
    check('age','Edad Obligatoria').isNumeric({no_symbols: true}).notEmpty(),
    check('img','Url Invalido').notEmpty().isURL({require_protocol: true, validate_length: true}),
    validarCampos
],editPlayer);

router.get('/getPlayer/:name',getPlayer);

router.delete('/delete',deletePlayer);


module.exports = router;