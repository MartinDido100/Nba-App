const { response } = require('express');
const Player = require('../models/Player');



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

        const newUser = new Player(req.body);

        await newUser.save();

        return res.status(201).json({
            ok: true,
            name,
            team,
            age,
            titles,
            img,
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
    addPlayer
}