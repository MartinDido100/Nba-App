const mongoose = require('mongoose');


const dbConnection = async () => {
    console.log(process.env.DB_CNN)  
    try {
        await mongoose.connect(process.env.DB_CNN,{
            useNewUrlParser : true,
            useUnifiedTopology: true,
        });
        console.log('Mongo Iniciado');
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar MongoDB');
    }
}

module.exports= {
    dbConnection
}