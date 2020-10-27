const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const mainRouter = require('./routes/main-routes');
const scanRouter = require('./routes/scan-route');


dotenv.config();

const app = new express();

app.use(bodyParser.json({ limit: "50mb" }));

mongoose.connect(`mongodb://${process.env.DB_ADDR}:${process.env.DB_PORT}/${process.env.DB_NAME}`)
    .then(() => {
        console.log('Connection Successful');
    })
    .catch((err) => {
        console.error(err);
    })

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));


app.use('/scan', scanRouter);

app.use('/', mainRouter);

app.listen(process.env.PORT);