import express from 'express';
import * as dotenv from 'dotenv';
import $sequelize from './db/index.js';
import * as models from './db/models/index.js';

import errorsMiddleware from './middlewares/errorsMiddleware.js';
import router from './routers/index.js';

const PORT = dotenv.config().parsed.PORT || 5000;

const app = new express();

app.use(express.json());
app.use('/api', router);
app.use(errorsMiddleware);

const start = async () => {
  try {
    await $sequelize.authenticate();
    await $sequelize.sync();
    console.log('Подключение к БД прошло успешно.');
    app.listen(PORT, (err) => {
      err ? console.log(`Возникла ошибка при запуске сервера - ${err}`) : console.log(`Сервер запущен на порте ${PORT}`);
    })
  } catch (e) {
    console.log(e);
  }
}

start();