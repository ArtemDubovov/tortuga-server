import { DataTypes, UUIDV4 } from "sequelize";
import $sequelize from "../index.js";
import PostModal from "./PostModal.js";
import UserModal from "./UserModal.js";

const CommentModal = $sequelize.define('Comment', {
  _id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4(),
    primaryKey: true,
    unique: true
  },
  post: {
    type: DataTypes.UUID,
    references: {
      model: PostModal,
      key: '_id'
    }
  },
  author: {
    type: DataTypes.UUID,
    references: {
      model: UserModal,
      key: '_id'
    }
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

export default CommentModal;
