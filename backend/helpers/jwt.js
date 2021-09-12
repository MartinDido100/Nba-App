const jwt = require('jsonwebtoken');

const generarJwt = async ( id , name ) =>{

    const payload = { id,name };

    return new Promise( (resolve,reject) => {

        jwt.sign(payload,process.env.JWT_SEED,{
            expiresIn: '5h'
        },(error,token) =>{
            if(error){
                reject(error);
            }else{
                resolve(token);
            }
        })

    } )

}

module.exports = {
    generarJwt
}