import express from 'express';
import * as dotenv from 'dotenv';

const PORT = dotenv.config().parsed.PORT || 5000;

const app = new express();

app.use(express.json());

const start = async () => {
  try {
    app.listen(PORT, (err) => {
      err ? console.log(`Возникла ошибка при запуске сервера - ${err}`) : console.log(`Сервер запущен на порте ${PORT}`);
    })
  } catch (e) {
    console.log(e);
  }
}

start();