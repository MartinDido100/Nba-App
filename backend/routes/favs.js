const { Router } = require("express");
const { addFav, removeFav, getFavs } = require("../controllers/favs");
const {takeId} = require('../middlewares/takeId');


const router = Router();


router.put('/add',addFav);

router.get('/get',takeId,getFavs)

router.put('/delete',removeFav);



module.exports = router;