import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import { ApiError } from '../exceptions/ApiError.js';

const {MAIL_HOST, MAIL_PORT, MAIL_LOGIN, MAIL_PASSWORD} = dotenv.config().parsed;

const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  auth: {
    user: MAIL_LOGIN,
    pass: MAIL_PASSWORD,
  },
});

const sendMail = async (to, link) => {
  try {
    await transporter.sendMail({
      from: MAIL_LOGIN,
      to,
      subject: 'Активация аккаунта',
      text: 'Активация аккаута.',
      html: `
        <div>
          <h1>Активация аккаунта</h1>
          <p>Для активации аккаунта перейдите по <a href=${link}>ссылке</a></p>
        </div>
      `
    })
  } catch {
    throw ApiError.BadEmail('Введена не существующая почта, проверьте указанный адрес.');
  }
}

export {
  sendMail
}