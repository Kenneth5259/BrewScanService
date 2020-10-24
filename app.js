const express = require('express');

// allows reading of environment from the .env file
const dotenv = require('dotenv');

// loads variables
dotenv.config();

// initializes the express app
const app = express();

// starts the application 
app.listen(process.env.PORT);