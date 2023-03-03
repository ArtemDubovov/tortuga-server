import { PostModal } from "../db/models/index.js"

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

export {
  getAll,
  create
}