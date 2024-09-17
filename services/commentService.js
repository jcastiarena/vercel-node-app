import commentRepository from '../repositories/commentRepository.js';

const commentService = {
  async createComment(commentData) {
    return await commentRepository.create(commentData);
  },
  
  async getCommentsByUser(userId) {
    return await commentRepository.findByUserId(userId);
  },
  
  async deleteComment(commentId) {
    return await commentRepository.delete(commentId);
  }
};

export default commentService;
