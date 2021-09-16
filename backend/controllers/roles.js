const { response } = require("express");
const User = require('../models/User');
const Roles = require("../models/Roles");


const changeRole = async (req, res = response) => {
    const { email, username, role } = req.body;
    try {
        //Busco el id del nuevo rol
        const newRole = await Roles.findOne({name: {$in: role}});

        const userToUpdate = await User.findOneAndUpdate({username},{ role: newRole._id });

        return res.status(200).json({
            ok: true,
            msg: 'Modificado correctamente'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg:'Error de servidor'
        })
    }
}


module.exports = {
    changeRole
}