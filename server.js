const express = require('express');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const routes = require('./routes/controllers');
const cors = require('cors');
const app = express();

app.use(cors({origin: ['http://127.0.0.1:5500', 'https://captainmoh.github.io/locationCar', 'https://captainmoh.github.io']}));
app.use(express.json());
app.use('/voiture', routes);

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));