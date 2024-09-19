// repositories/userRepository.js
import User from '../models/userModel.js';
import logger from '../config/logger.js';
const log = logger(import.meta.url);

const userRepository = {
  async createUser(userData) {
    try {
      // const collection = await this.connect();
      log.info('Creating user with data '+ JSON.stringify(userData, null, 2));
      
      // Create a new user and insert into database
      const user = new User({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });
      await user.save();
      log.info('User created successfully');
      return user;
    } catch (error) {
      log.error('Failed to create user', error);
      return null;
    }
  },
  
  async getAllUsers(page = 1, limit = 10, sort = 'asc') {
    try {
      log.info(`Getting users - Page: ${page}, Limit: ${limit}, Sort: ${sort}`);
  
      const users = await User.find()
        .sort({ createdAt: sort === 'asc' ? 1 : -1 }) // Adjust sorting based on 'asc' or 'desc'
        .skip((page - 1) * limit) // Skip documents for pagination
        .limit(limit); // Limit number of documents per page
  
      const totalUsers = await User.countDocuments(); // Total users for calculating total pages
      const totalPages = Math.ceil(totalUsers / limit);
  
      log.info(`Users retrieved: ${users.length}`);
      return {
        users,
        currentPage: page,
        totalPages,
        totalUsers
      };
    } catch (error) {
      log.error('Failed to retrieve users');
      return {
        users: [],
        currentPage: page,
        totalPages: 0,
        totalUsers: 0
      };
    }
  },
  
  async getUser(userId) {
    try {
      log.info('Getting user with ID: ' + userId);
      const user = await User.findById(userId);
      if (!user) {
        const errorMessage = 'User with id ' + userId + ' not found';
        log.error(errorMessage);
        throw new Error(errorMessage);
      }
      log.info('User retrieved successfully: ' + user);
      return user;
    } catch (error) {
      log.error('Failed to retrieve user with id: ' + userId);
      return null;
    }
  },

  async patchUser(userId, userData) {
    try {
      log.info('Patching user with ID: ' + userId);
      return await User.findByIdAndUpdate(userId, { $set: userData }, { new: true });
    } catch (error) {
      log.error('Failed to patch user with id: ' + userId);
      return null;
    }
  },
  
  async updateUser(userId, userData) {
    try {
      log.info('Updating user with ID: ' + userId);
      // return await User.findByIdAndUpdate(userId, userData, { new: true });
      
      const existingUser = await User.findById(userId);
      if (!existingUser) return null;
    
      // Overwrite fields in the existing user object with the incoming data
      Object.keys(existingUser.toObject()).forEach(key => {
        if (!(key in userData) && key !== '_id' && key !== 'createdAt') {
          userData[key] = null;
        }
      });
    
      return await User.findByIdAndUpdate(userId, userData, { new: true });
      
    } catch (error) {
      log.error('Failed to update user with id: ' + userId + ' ' + error);
      return null;
    }
  },
  
  async deleteUser(userId) {
    try {
      log.info('Deleting user with ID: ' + userId);
      return await User.findByIdAndDelete(userId);
    } catch (error) {
      log.error('Failed to delete user with id: ' + userId);
      return null;
    }
    
  }
  
};

export default userRepository;