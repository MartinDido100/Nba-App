const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role: {
        ref: 'roles',
        required: true,
        type: Schema.Types.ObjectId
    }
},{
    versionKey: false
});

UserSchema.plugin(uniqueValidator,{message: 'El {PATH} ya fue tomado'});


module.exports = model('usuarios',UserSchema);