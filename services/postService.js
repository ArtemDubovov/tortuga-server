import { PostModal } from "../db/models/index.js"
import { ApiError } from "../exceptions/ApiError.js";

const create = async (userId, title, littleContent, content, imageTitle) => {
  const post = await PostModal.create({
    author: userId,
    title,
    littleContent,
    content,
    imageTitle
  });
  return post;
}

const getAll = async () => {
  const posts = await PostModal.findAll();
  return posts;
}
 
const remove = async (_id) => {
  const post = await PostModal.findOne({where: {_id}});
  if (!post) {
    throw ApiError.BadRequest('Такого поста не существует.');
  }
  await post.destroy();
}

const update = async (_id, title, littleContent, content, imageTitle) => {
  const post = await PostModal.findOne({where: {_id}});
  if (!post) {
    throw ApiError.BadRequest('Такого поста не существует.');
  }

  await post.update({title, littleContent, content, imageTitle});
  await post.save();
  return post.dataValues;
}

export {
  getAll,
  create,
  remove,
  update
}