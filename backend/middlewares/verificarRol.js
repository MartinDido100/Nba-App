const { response } = require("express");
const { validationResult } = require('express-validator');
const User = require('../models/User');


const verificarRol = async (req, res = response ,next) => {

    const { email, username } = req.body;
    try {
        const user = await User.findOne({email}).populate('role');

        const userToChange = await User.findOne({username});

        if(!userToChange){
            return res.status(404).json({
                ok: false,
                msg:'No se encontro el usuario'
            })
        }


        if(userToChange.username === 'Padre'){
            return res.status(400).json({
                ok: false,
                msg: 'Sos padre flaco'
            })
        }

        if(user.role.name !== 'admin'){
            return res.status(400).json({
                ok: false,
                msg: 'No tienes permisos para hacer esta accion'
            })
        }

    } catch (error) {
        console.log(error)
    }

    next();

}

module.exports = {
    verificarRol
}