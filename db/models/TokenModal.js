import { DataTypes } from "sequelize";
import $sequelize from "../index.js";
import UserModal from "./UserModal.js";

const TokenModal = $sequelize.define('Token', {
  token: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user: {
    type: DataTypes.UUID,
    references: {
      model: UserModal,
      key: '_id'
    }
  }
});

export default TokenModal;