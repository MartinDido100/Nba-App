const User = require('../models/User');
const Favorito = require('../models/Favorito');
const Player = require('../models/Player');
const { response } = require("express");
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb')


const addFav = async (req, res = response) => {

    const { userId, playerId } = req.body;

    try {

        const favDoc = await Favorito.findOneAndUpdate({author: {$in: userId}},{
            $addToSet:{
                favs: playerId
            }
        },{new: true}).populate('favs');

        res.status(201).json({
            ok: true,
            favs: favDoc.favs
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            msg: 'Error al agregar'
        })
    }
    

}

const getFavs = async (req, res = response) => {

    const {userId} = req;
    try {
        const favsById = await Favorito.findOne({author: {$in:userId}}).populate('favs');

        if(!favsById){
            return res.status(502).json({
                ok: false,
                msg:'No existe el usuario'
            });
        };

        return res.status(201).json({
            ok: true,
            favs: favsById.favs
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg:'Usuario no encontrado'
        })
    }
}


const removeFav = async (req, res = response) => {
    const { userId, playerId } = req.body;

    try {

        const favDoc = await Favorito.findOneAndUpdate({author: {$in: userId}},{
            $pull:{
                favs: playerId
            }
        },{new:true}).populate('favs');

        console.log(favDoc);

        res.status(201).json({
            ok: true,
            favs: favDoc.favs
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            msg: 'Error al eliminar'
        })
    }
}

module.exports = {
    addFav,
    getFavs,
    removeFav
}
