const express = require('express');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const routes = require('./routes/controllers');
const cors = require('cors');
const app = express();

app.use(
    cors({
        origin: '*'
    })
);
app.use(express.json());
app.use('/voiture', routes);

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));