import userRepository from '../repositories/userRepository.js';

const userService = {
  async createUser(userData) {
    return await userRepository.createUser(userData);
  },
  
  async getUser(userId) {
    return await userRepository.getUser(userId);
  },
  
  async getAllUsers() {
    return await userRepository.getAllUsers();
  },
  
  async patchUser(userId, userData) {
    return await userRepository.patch(userId, userData);
  },
  
  async updateUser(userId, userData) {
    return await userRepository.update(userId, userData);
  },
  
  async deleteUser(userId) {
    return await userRepository.delete(userId);
  }
};

export default userService;
