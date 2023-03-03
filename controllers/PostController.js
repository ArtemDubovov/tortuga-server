import * as UserService from '../services/userService.js';
import * as PostService from '../services/postService.js';

class PostController {
  async create(req, res, next) {
    try {
      const {userId} = req;
      await UserService.checkUserId(userId);

      const {title, littleContent, content, imageTitle} = req.body;
      const postData = await PostService.create(userId, title, littleContent, content, imageTitle);
      res.json(postData);
    } catch (e) {
      next(e);
    }
  }

  async remove(req, res, next) {
    try {
      const {userId} = req;
      await UserService.checkUserId(userId);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const {userId} = req;
      await UserService.checkUserId(userId);
    } catch (e) {
      next(e);
    }
  }

  async get(req, res, next) {
    try {
      const {userId} = req;
      await UserService.checkUserId(userId);
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const {userId} = req;
      await UserService.checkUserId(userId);

      
      const postsData = await PostService.getAll();
      res.json(postsData);
    } catch (e) {
      next(e);
    }
  }
}

export default new PostController();
