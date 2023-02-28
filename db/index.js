import { Sequelize } from "sequelize";
import * as dotenv from 'dotenv';

const {DB_NAME, DB_HOST, DB_PASSWORD, DB_LOGIN} = dotenv.config().parsed;

const $sequelize = new Sequelize(DB_NAME, DB_LOGIN, DB_PASSWORD, {
  dialect: 'mysql',
  host: DB_HOST
});

export default $sequelize;
