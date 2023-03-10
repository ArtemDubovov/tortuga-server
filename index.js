import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import $sequelize from './db/index.js';
import * as models from './db/models/index.js';

import errorsMiddleware from './middlewares/errorsMiddleware.js';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';

const PORT = dotenv.config().parsed.PORT || 5000;

const app = new express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);
app.use(errorsMiddleware);
app.use('/*', (req, res) => {
  res.status(404).json({message: 'Не верный запрос.'});
})

const start = async () => {
  try {
    await $sequelize.authenticate();
    await $sequelize.sync({force: true});
    console.log('Подключение к БД прошло успешно.');
    app.listen(PORT, (err) => {
      err ? console.log(`Возникла ошибка при запуске сервера - ${err}`) : console.log(`Сервер запущен на порте ${PORT}`);
    })
  } catch (e) {
    console.log(e);
  }
}

start();