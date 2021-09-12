const { response } = require("express");

const takeId = async (req,res = response,next) => {

    const id = req.header('userId');

    try {
        req.userId = id;
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg:"Error de servidor"
        })
    }

    next()
}


module.exports = {
    takeId
}