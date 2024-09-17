import commentService from '../services/commentService.js';

export const createComment = async (req, res) => {
  try {
    const comment = await commentService.createComment(req.body);
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCommentsByUser = async (req, res) => {
  try {
    const comments = await commentService.getCommentsByUser(req.params.userId);
    res.status(200).json(comments);
  } catch (error) {
    res.status(404).json({ message: 'Comments not found' });
  }
};
