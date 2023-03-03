import { CommentModal, PostModal } from "../db/models/index.js";
import { ApiError } from "../exceptions/ApiError.js";

const create = async (userId, postId, content) => {
  const comment = await CommentModal.create({
    author: userId,
    post: postId,
    content
  });
  return comment;
}

const getAll = async (postId) => {
  const comments = await CommentModal.findAll({where: {post: postId}});
  return comments;
}

const getOne = async (userId, _id) => {

  await checkUser(userId, _id);

  const comments = await CommentModal.findAll({where: {author: userId}});
  return comments;
}
 
const remove = async (userId, _id) => {

  const comment = await CommentModal.findOne({where: {_id}});
  if (!comment) {
    throw ApiError.BadRequest('Такого комментария не существует.', []);
  }

  await checkUser(userId, _id);

  await comment.destroy();
}

const update = async (userId, _id, commentId, content) => {

  await checkUser(userId, commentId);

  const comment = await CommentModal.findOne({where: {_id: commentId}});
  if (!comment) {
    throw ApiError.BadRequest('Такого комментария не существует.', []);
  }

  await comment.update({content});
  await comment.save();
  return comment.dataValues;
}

const checkUser = async (userId, commentId) => {
  const isUserCanEdit = await CommentModal.findOne({where: {_id: commentId}});

  if (!isUserCanEdit || isUserCanEdit.dataValues.author !== userId) {
    throw ApiError.BadRequest('Нет прав для таких действий.');
  }
}

export {
  getAll,
  getOne,
  create,
  remove,
  update
}