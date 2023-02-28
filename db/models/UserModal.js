import { DataTypes, UUIDV4 } from "sequelize";
import $sequelize from "../index.js";

const UserModal = $sequelize.define('User', {
  _id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4(),
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'USER'
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true
  },
  about: {
    type: DataTypes.STRING,
    allowNull: true
  },
  activationLink: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default UserModal;
