import * as CommentService from '../services/commentService.js';

class CommentController {
  async getAll(req, res, next) {
    try {
      const {id} = req.params;
      const commentData = await CommentService.getAll(id);
      res.json(commentData);
    } catch (e) {
      next(e);
    }
  }

  async get(req, res, next) {
    try {
      const {userId} = req;
      const {id} = req.params;

      const comment = await CommentService.getOne(userId, id);
      res.json(comment);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const {userId} = req;
      const {id} = req.params;
      const {content} = req.body;

      const commentData = await CommentService.create(userId, id, content);

      res.json(commentData);

    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const {userId} = req;
      const {id} = req.params;
      const {content, commentId} = req.body;

      const commentData = await CommentService.update(userId, id, commentId, content);

      res.json(commentData);

    } catch (e) {
      next(e);
    }
  }

  async remove(req, res, next) {
    try {
      const {userId} = req;
      const {commentId} = req.body;

      await CommentService.remove(userId, commentId);

      res.json({message: 'success'});

    } catch (e) {
      next(e);
    }
  }
}

export default new CommentController();
