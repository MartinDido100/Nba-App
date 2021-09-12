const Role = require('../models/Roles');


const createRoles = async () => {
    
    try {

        const elements = await Role.estimatedDocumentCount();
        if(elements > 0){
            return;
        }
    
        await Promise.all([
            new Role({name:'user'}).save(),
            new Role({name: 'moderator'}).save(),
            new Role({name:'admin'}).save()
        ]);

        console.log("Roles creados");
        
    } catch (error) {
        console.log(error);
    }
    
};


module.exports = {
    createRoles
}