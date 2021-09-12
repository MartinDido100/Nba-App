const jwt = require('jsonwebtoken');
const { response } = require("express");


const validarJWT = async (req, res = response, next) =>{
    const token = req.header('autorizathion')

    if(!token || !token.startsWith('bearer ')){
        return res.status(401).json({
            ok: false,
            msg: 'Error de autenticacion'
        })
    };

    try {
        const { id, name } = jwt.verify(token.substring(7),process.env.JWT_SEED);
        req.body._id = id;
        req.body.name = name;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg:'Error de autenticacion'
        })
    }

    next();

}


module.exports = {
    validarJWT
}