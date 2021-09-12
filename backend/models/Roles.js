const { Schema,model } = require('mongoose');


const RoleSchema = new Schema({
    name: {
        type: String,
        require: true
    }
},{
    versionKey: false
});



module.exports = model('roles',RoleSchema);