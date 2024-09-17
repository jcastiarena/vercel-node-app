import Comment from '../models/commentModel.js';

const commentRepository = {
  async create(commentData) {
    const comment = new Comment(commentData);
    return await comment.save();
  },
  
  async findByUserId(userId) {
    return await Comment.find({ userId });
  },
  
  async delete(commentId) {
    return await Comment.findByIdAndDelete(commentId);
  }
};

export default commentRepository;
