const { response } = require("express");
const { validationResult } = require('express-validator');
const User = require('../models/User');


const verificarRol = async (req, res = response ,next) => {

    const { email, role } = req.body;
    try {
        const user = await User.findOne({email});
        console.log(user);
        if(user.role !== '6132b7ee44786d887cbaef92' || role === 'admin'){
            console.log("entre al if");
            return res.status(400).json({
                ok: false,
                msg: 'No tienes permisos para hacer esta accion'
            })
        }

    } catch (error) {
        
    }

    next();

}

module.exports = {
    verificarRol
}