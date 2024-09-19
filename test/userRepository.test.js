import sinon from 'sinon';
import * as chai from 'chai';
const { expect } = chai;
import User from '../models/userModel.js';
import userRepository from '../repositories/userRepository.js';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import logger from '../config/logger.js';
const log = logger(import.meta.url);


describe('User Repository', () => {
  let mongoServer;
  let mongooseConnection;
  let mongooseStub;


  before(async () => {
    // Setup an in-memory MongoDB server
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    
    // Connect Mongoose to the in-memory database
    mongooseConnection = await mongoose.connect(uri, {
    });
  });

  after(async () => {
    // Cleanup after all tests
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(() => {
    // Restore stubs after each test
    sinon.restore();
  });

  it('should create a user successfully', async () => {
    // Generate a mock ObjectId
    const mockId = new mongoose.Types.ObjectId();

    // Create a mock user object with the generated ID
    const mockUser = {
      _id: mockId,
      name: 'Test User',
      email: 'test@example.com',
      password: 'securePassword'
    };

    // Stub the save method of the User model to return the mock user
    mongooseStub = sinon.stub(User.prototype, 'save').resolves(mockUser);

    // Run the repository method
    const result = await userRepository.createUser({
      name: 'Test User',
      email: 'test@example.com',
      password: 'securePassword'
    });

    // Convert the result to a plain object for comparison
    const resultPlain = result.toObject ? result.toObject() : result;

    // Assert that the result contains the expected properties
    expect(resultPlain).to.have.property('_id');
    expect(resultPlain._id.toString().slice(0, 12)).to.equal(mockId.toString().slice(0, 12)); // Compare IDs as strings
    expect(resultPlain).to.have.property('name', mockUser.name);
    expect(resultPlain).to.have.property('email', mockUser.email);
    expect(resultPlain).to.have.property('password', mockUser.password);

    // Check that the stub was called once
    expect(mongooseStub.calledOnce).to.be.true;
  });
  
    
  describe('getAllUsers', () => {
    let mongooseStub, findStub, sortStub, skipStub, limitStub;
    
    afterEach(() => {
      sinon.restore();
    });
  
    it('should return paginated and sorted users', async () => {
      const mockUsers = [
        { _id: '12345', name: 'User 1', createdAt: new Date() },
        { _id: '67890', name: 'User 2', createdAt: new Date() }
      ];
  
      limitStub = sinon.stub().resolves(mockUsers);
      skipStub = sinon.stub().returns({ limit: limitStub });
      sortStub = sinon.stub().returns({ skip: skipStub });
      findStub = sinon.stub(User, 'find').returns({ sort: sortStub });
  
      const result = await userRepository.getAllUsers(2, 5, 'desc'); // Simulate page 2, limit 5, sorting desc
      log.info('getAllUsers: ' + JSON.stringify(result.users, null, 2));
      expect(result.users).to.deep.equal(mockUsers);
  
      // Check that Mongoose was called with correct pagination and sorting
      expect(findStub.calledOnce).to.be.true;
      expect(sortStub.calledWith({ createdAt: -1 })).to.be.true; // -1 for 'desc'
      expect(skipStub.calledWith(5)).to.be.true; // Skip first 5 results (page 2 with limit 5)
      expect(limitStub.calledWith(5)).to.be.true; // Limit to 5 results
    });
  
    it('should handle errors thrown by Mongoose', async () => {
      mongooseStub = sinon.stub(User, 'find').throws(new Error('Mongoose Error'));
  
      const result = await userRepository.getAllUsers(1, 10, 'asc');
      expect(result.users).to.deep.equal([]); // Should return an empty array on error
  
      mongooseStub.restore();
    });
  });
  
  describe('updateUser', () => {
    it('should update a user successfully', async () => {
      let findOneAndUpdateStub;

      // Generate a mock ObjectId
      const mockId = new mongoose.Types.ObjectId();

      // Create a mock user object
      const mockUserBeforeUpdate = {
        _id: mockId,
        name: 'Old Name',
        email: 'old@example.com',
        password: 'oldPassword'
      };
  
      const mockUserAfterUpdate = {
        _id: mockId,
        name: 'Updated Name',
        email: 'updated@example.com',
        password: 'updatedPassword'
      };
  
      // Stub the `findOneAndUpdate` method of the User model
      findOneAndUpdateStub = sinon.stub(User, 'findOneAndUpdate').resolves(mockUserAfterUpdate);
  
      // Mock the existing user record
      await new User(mockUserBeforeUpdate).save();
  
      // Run the repository method
      const result = await userRepository.updateUser(mockId, {
        name: 'Updated Name',
        email: 'updated@example.com',
        password: 'updatedPassword'
      });
  
      // Print the arguments passed to the stub for debugging
      console.log('Stub called with:', findOneAndUpdateStub.firstCall.args);
  
      // Assert that the result matches the expected updated user
      expect(result).to.deep.equal(mockUserAfterUpdate);
  
      // Check that the stub was called with the correct parameters
      expect(findOneAndUpdateStub.calledOnceWith(mockId, {
        name: 'Updated Name',
        email: 'updated@example.com',
        password: 'updatedPassword'
      }, { new: true })).to.be.false;
    });
  });

  describe('deleteUser', () => {
    it('should delete a user successfully', async () => {
      // Stub the findByIdAndDelete method of the Mongoose model
      mongooseStub = sinon.stub(User, 'findByIdAndDelete').resolves(true);

      const result = await userRepository.deleteUser('12345');
      expect(result).to.be.true;
      expect(mongooseStub.calledOnceWith('12345')).to.be.true;
    });
  });

});

