const { Router } = require("express");
const { check } = require('express-validator');
const { getPlayers, addPlayer, deletePlayer } = require('../controllers/nba');
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

router.delete('/delete',deletePlayer)


module.exports = router;