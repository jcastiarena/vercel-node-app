import sinon from 'sinon';
import * as chai from 'chai';
const { expect } = chai;
import userService from '../services/userService.js';
import userRepository from '../repositories/userRepository.js';

describe('User Service', () => {
  let repositoryStub;

  beforeEach(() => {
    repositoryStub = sinon.stub(userRepository);
  });

  afterEach(() => {
    sinon.restore();
  });

   // Test for createUser service method
   describe('createUser', () => {
    it('should create a user successfully', async () => {
      const mockUser = { _id: '12345', name: 'Test User' };
      repositoryStub.createUser.resolves(mockUser);

      const result = await userService.createUser({ name: 'Test User' });
      expect(result).to.deep.equal(mockUser);
      expect(repositoryStub.createUser.calledOnce).to.be.true;
    });

    it('should throw an error if repository fails', async () => {
      repositoryStub.createUser.rejects(new Error('Repository error'));

      try {
        await userService.createUser({ name: 'Test User' });
      } catch (error) {
        expect(error.message).to.equal('Repository error');
      }
      expect(repositoryStub.createUser.calledOnce).to.be.true;
    });
  });

  // Test for getAllUsers service method
  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const mockUsers = [{ _id: '12345', name: 'User1' }, { _id: '67890', name: 'User2' }];
      repositoryStub.getAllUsers.resolves(mockUsers);

      const result = await userService.getAllUsers();
      expect(result).to.deep.equal(mockUsers);
      expect(repositoryStub.getAllUsers.calledOnce).to.be.true;
    });
  });

  // Test for getUser service method
  describe('getUser', () => {
    it('should return a user by ID', async () => {
      const mockUser = { _id: '12345', name: 'Test User' };
      repositoryStub.getUser.resolves(mockUser);

      const result = await userService.getUser('12345');
      expect(result).to.deep.equal(mockUser);
      expect(repositoryStub.getUser.calledOnceWith('12345')).to.be.true;
    });

    it('should return null if user is not found', async () => {
      repositoryStub.getUser.resolves(null);

      const result = await userService.getUser('nonexistent-id');
      expect(result).to.be.null;
      expect(repositoryStub.getUser.calledOnceWith('nonexistent-id')).to.be.true;
    });
  });

  // Test for updateUser service method
  describe('updateUser', () => {
    it('should update a user successfully', async () => {
      const mockUpdatedUser = { _id: '12345', name: 'Updated User' };
      repositoryStub.updateUser = sinon.stub().resolves(mockUpdatedUser); // Correctly stubbing the updateUser method

      const result = await userService.updateUser('12345', { name: 'Updated User' });
      expect(result).to.deep.equal(mockUpdatedUser);
      expect(repositoryStub.updateUser.calledOnceWith('12345', { name: 'Updated User' })).to.be.true;
    });
  });

  // Test for patchUser service method
  describe('patchUser', () => {
    it('should patch a user successfully', async () => {
      const mockUpdatedUser = { _id: '12345', name: 'Patched User' };
      repositoryStub.patchUser = sinon.stub().resolves(mockUpdatedUser); // Correctly stubbing the patchUser method

      const result = await userService.patchUser('12345', { name: 'Patched User' });
      expect(result).to.deep.equal(mockUpdatedUser);
      expect(repositoryStub.patchUser.calledOnceWith('12345', { name: 'Patched User' })).to.be.true;
    });
  });

  // Test for deleteUser service method
  describe('deleteUser', () => {
    it('should delete a user successfully', async () => {
      repositoryStub.deleteUser = sinon.stub().resolves(true); // Correctly stubbing the deleteUser method

      const result = await userService.deleteUser('12345');
      expect(result).to.be.true;
      expect(repositoryStub.deleteUser.calledOnceWith('12345')).to.be.true;
    });

    it('should return false if user is not found', async () => {
      repositoryStub.deleteUser = sinon.stub().resolves(false); // Correctly stubbing the deleteUser method for not found case

      const result = await userService.deleteUser('nonexistent-id');
      expect(result).to.be.false;
      expect(repositoryStub.deleteUser.calledOnceWith('nonexistent-id')).to.be.true;
    });
  });
});
