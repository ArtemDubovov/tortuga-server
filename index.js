require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleWare');
const path = require('path');


const PORT = 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);


// Handle Errors
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connect');
    await sequelize.sync();
    app.listen(process.env.PORT, () => console.log('Server is OK'));
  } catch (e) {
    console.log(e);
  }
}

start();
