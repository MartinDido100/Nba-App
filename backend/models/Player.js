const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const PlayerSchema = new Schema({
    name : {
        type: String,
        required: true,
        unique: true
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
    }
},{
    versionKey: false
});


PlayerSchema.plugin(uniqueValidator,{message: 'El {PATH} ya existe'});

module.exports = model('players',PlayerSchema);