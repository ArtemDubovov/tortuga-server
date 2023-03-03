import { PostModal } from "../db/models/index.js"

const getAll = async () => {
  const posts = await PostModal.findAll();
  return posts;
}

export {
  getAll
}