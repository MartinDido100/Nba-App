const { response } = require('express');
const Player = require('../models/Player');
const Favorito = require('../models/Favorito');


const deletePlayer = async(req, res = response) => {
    const { playerId, userId } = req.body;
    try {

        await Favorito.findOneAndUpdate({author: {$in: userId}},{
            $pull:{
                favs: playerId
            }
        })

        await Player.findOneAndDelete({_id: playerId});

        const dbPlayers = await Player.find();


        return res.json({
            ok: true,
            players: dbPlayers
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg:'Algo salio mal'
        })
    }
}

const addPlayer = async (req,res = response) => {
    const { name, team, age, titles , img } = req.body;

    try {

        const dbPlayer = await Player.findOne({name});
        if(dbPlayer){
            return res.status(400).json({
                ok: false,
                msg: 'El jugador ya se encuentra en la lista'
            });
        }

        
        const newPlayer = new Player(req.body);
        
        if(!img){
            newPlayer.img = 'https://us.123rf.com/450wm/urfandadashov/urfandadashov1809/urfandadashov180901275/109135379-foto-no-disponible-icono-del-vector-aislado-en-la-ilustración-transparente-transparente-concepto-de-.jpg?ver=6'
        }

        await newPlayer.save();

        const dbPlayers = await Player.find();

        return res.status(201).json({
            ok: true,
            players : dbPlayers
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error de servidor'
        })
    }
}

const getPlayers = async (req, res = response ) =>{
    try {
        const dbPlayers = await Player.find();
        if(!dbPlayers.length){
            return res.json({
                ok: false,
                msg:'No hay jugadores guardados'
            })
        }
        
        const players = dbPlayers.map(player => {
            return {
                _id: player._id,
                name: player.name,
                team: player.team,
                age: player.age,
                titles: player.titles,
                img: player.img,
            }
        }); 

        return res.status(200).json({
            ok:true,
            players
        })
        
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg:'Error de servidor'
        })
    }


}


module.exports = {
    getPlayers,
    addPlayer,
    deletePlayer
}