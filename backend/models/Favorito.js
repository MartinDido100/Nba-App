const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const FavSchema = new Schema({
    favs: [{type:Schema.Types.ObjectId,ref:'players'}],
    author:{
        type: Schema.Types.ObjectId,
        ref: 'usuarios',
        unique: true
    }
},{
   skipVersioning: true 
});


FavSchema.plugin(uniqueValidator,{message: 'Usuario duplicado'});

module.exports = model('favoritos',FavSchema)