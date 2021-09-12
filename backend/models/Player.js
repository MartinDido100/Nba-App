const { Schema, model } = require('mongoose');


const PlayerSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    titles: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        default: 'https://us.123rf.com/450wm/urfandadashov/urfandadashov1809/urfandadashov180901275/109135379-foto-no-disponible-icono-del-vector-aislado-en-la-ilustración-transparente-transparente-concepto-de-.jpg?ver=6'
    }
},{
    versionKey: false
});


module.exports = model('players',PlayerSchema);