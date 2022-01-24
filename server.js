const express = require('express');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const path = require('path')
const routes = require('./routes/controllers');
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use('/voiture', routes);

app.get('/*', (_, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})


app.listen(process.env.PORT, () => console.log(`Listening http://localhost:${process.env.PORT}`));