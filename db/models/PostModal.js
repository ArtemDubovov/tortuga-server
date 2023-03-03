import { DataTypes, UUIDV4 } from "sequelize";
import $sequelize from "../index.js";
import UserModal from "./UserModal.js";

const PostModal = $sequelize.define('Post', {
  _id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4(),
    primaryKey: true,
    unique: true
  },
  author: {
    type: DataTypes.UUID,
    references: {
      model: UserModal,
      key: '_id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  littleContent: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  imageTitle: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

export default PostModal;
