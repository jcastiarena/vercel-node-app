import userService from '../services/userService.js';

import logger from '../config/logger.js';
const log = logger(import.meta.url);

const userController = {
  async createUser(req, res) {
    try {
      const data = req.body;
      const user = await userService.createUser(data);
      if (!user) {
        return res.status(500).json({ message: 'Failed to create user' });
      }
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getAllUsers(req, res) {
    const { page = 1, limit = 10, sort = 'asc' } = req.query; // Extract query params
    log.info(`Getting users - Page: ${page}, Limit: ${limit}, Sort: ${sort}`);
    try {
      const result = await userService.getAllUsers(Number(page), Number(limit), sort);
      res.status(200).json(result); // Return paginated users with metadata
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving users', error: error.message });
    }
  },

  async getUser(req, res) {
    try {
      const userId = req.params.id;
      const user = await userService.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: 'User with ID ' + userId + ' not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async patchUser(req, res) {
    try {
      const userId = req.params.id;
      const userData = req.body;
      const user = await userService.patchUser(userId, userData);
      if (!user) {
        return res.status(404).json({ message: 'User with ID ' + userId + ' not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async updateUser(req, res) {
    try {
      const userId = req.params.id;
      const userData = req.body;
      const user = await userService.updateUser(userId, userData);
      if (!user) {
        return res.status(404).json({ message: 'User with ID ' + userId + ' not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      const user = await userService.deleteUser(userId);
      if (!user) {
        return res.status(404).json({ message: 'User with ID ' + userId + ' not found' });
      }
      res.status(200).json({ message: 'User with ID ' + userId + ' deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export default userController;