const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path')



const routerAuth = require('./routes/auth');
const routerNba = require('./routes/nba');
const routerRoles = require('./routes/roles');
const routerFavs = require('./routes/favs');
const { dbConnection } = require('./db/config');
const { createRoles } = require('./libs/initialSetup'); 


//.env
dotenv.config({path: 'backend/.env'});

//express app
const app = express();
const port = process.env.PORT;

//cors and espress json
app.use(cors());
app.use(express.json());
dbConnection();
createRoles();


//Routes
app.use('/api/auth',routerAuth);
app.use('/api/nba',routerNba);
app.use('/api/roles',routerRoles);
app.use('/api/fav',routerFavs);

app.use(express.static(path.join(__dirname,'../frontend/docs')));

//Server listen
app.listen(port,()=>{
    console.log(`Corriendo en puerto ${port}`);
})


