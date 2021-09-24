const { response } = require("express");
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generarJwt } = require('../helpers/jwt');
const Roles = require("../models/Roles");
const Favorito = require('../models/Favorito');


const registerUser = async (req, res = response) => {

    const { username, email, password } = req.body;

    try {
        
        const newUser = new User(req.body);

        //Role por default (user)
        const foundRole = await Roles.findOne({name: {$in: 'user'}});
        newUser.role = foundRole._id;

        //Encriptar password
        const salt = bcrypt.genSaltSync(10);
        newUser.password = bcrypt.hashSync(password,salt); 

        //Genero el JWT
        const token = await generarJwt(newUser.id,username);

        //Crean Documento de Favoritos para este usuario
        const favBody = {
            favs : [],
            author: newUser.id
        }

        
        await newUser.save();
        
        const newFavDocument = new Favorito(favBody);
        await newFavDocument.save();

        return res.status(200).json({
            ok: true,
            username,
            email,
            token,
            role: foundRole._id
        })

    } catch (error) {
        const errores = error.errors;
        return res.status(500).json({
            ok: false,
            msg:errores,
        })
    }

}


const loginUser = async ( req, res = response ) =>{
    const { username, password } = req.body;

    try {
        
        const dbUser = await User.findOne({username});

        if(!dbUser){
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales incorrectas'
            })
        };

        //Comparo passwords
        const validPassword = bcrypt.compareSync(password,dbUser.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Error de credenciales'
            })
        }

        //Obtener role
        const role = await Roles.findById(dbUser.role);
        
        //Generar JWT
        token = await generarJwt(dbUser._id,username);

        return res.status(200).json({
            ok:true,
            id: dbUser._id,
            username: username,
            email: dbUser.email,
            role: role.name,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error de servidor'
        })
    }
}

const verifyToken = async (req, res= response) => {

    const { name,_id } = req.body;
    const dbUser = await User.findOne({_id}).populate('role');

    const token = await generarJwt(dbUser._id,dbUser.name);

    return res.json({
        ok: true,
        username: dbUser.username,
        email: dbUser.email,
        token,
        id: dbUser._id,
        role: dbUser.role.name 
    })

}

module.exports = {
    registerUser,
    loginUser,
    verifyToken
}