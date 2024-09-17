import * as chai from 'chai';
import sinon from 'sinon';
import userController from '../controllers/userController.js';
import userService from '../services/userService.js';

const { expect } = chai;

describe('User Controller', () => {
  let req, res;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
  });

  describe('createUser', () => {
    it('should create a user successfully and return 201 status', async () => {
      const mockUser = { id: 1, name: 'John Doe' };
      sinon.stub(userService, 'createUser').resolves(mockUser);

      req.body = mockUser;

      await userController.createUser(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(mockUser)).to.be.true;

      userService.createUser.restore();
    });

    it('should return 500 if service throws an error', async () => {
      sinon.stub(userService, 'createUser').throws(new Error('Service Error'));

      req.body = { name: 'John Doe' };

      await userController.createUser(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: 'Service Error' })).to.be.true;

      userService.createUser.restore();
    });
  });

  describe('getAllUsers', () => {
    it('should return all users and status 200', async () => {
      const mockUsers = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }];
      sinon.stub(userService, 'getAllUsers').resolves(mockUsers);

      await userController.getAllUsers(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(mockUsers)).to.be.true;

      userService.getAllUsers.restore();
    });

    it('should return 500 if service throws an error', async () => {
      sinon.stub(userService, 'getAllUsers').throws(new Error('Service Error'));

      await userController.getAllUsers(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: 'Service Error' })).to.be.true;

      userService.getAllUsers.restore();
    });
  });

  describe('getUser', () => {
    it('should return a user and status 200 if user exists', async () => {
      const mockUser = { id: 1, name: 'John Doe' };
      req.params.id = '1';
      sinon.stub(userService, 'getUser').resolves(mockUser);

      await userController.getUser(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(mockUser)).to.be.true;

      userService.getUser.restore();
    });

    it('should return 404 if user does not exist', async () => {
      req.params.id = '1';
      sinon.stub(userService, 'getUser').resolves(null);

      await userController.getUser(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'User with ID 1 not found' })).to.be.true;

      userService.getUser.restore();
    });

    it('should return 500 if service throws an error', async () => {
      req.params.id = '1';
      sinon.stub(userService, 'getUser').throws(new Error('Service Error'));

      await userController.getUser(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: 'Service Error' })).to.be.true;

      userService.getUser.restore();
    });
  });

  describe('patchUser', () => {
    it('should patch a user and return status 200', async () => {
      const partialUpdate = { name: 'John Updated' };
      const updatedUser = { id: 1, name: 'John Updated', email: 'john@example.com' };

      req.params.id = '1';
      req.body = partialUpdate;
      sinon.stub(userService, 'patchUser').resolves(updatedUser);

      await userController.patchUser(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(updatedUser)).to.be.true;

      userService.patchUser.restore();
    });

    it('should return 404 if user does not exist', async () => {
      req.params.id = '1';
      req.body = { name: 'John Updated' };
      sinon.stub(userService, 'patchUser').resolves(null);

      await userController.patchUser(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'User with ID 1 not found' })).to.be.true;

      userService.patchUser.restore();
    });

    it('should return 500 if service throws an error', async () => {
      req.params.id = '1';
      req.body = { name: 'John Updated' };
      sinon.stub(userService, 'patchUser').throws(new Error('Service Error'));

      await userController.patchUser(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: 'Service Error' })).to.be.true;

      userService.patchUser.restore();
    });
  });

  describe('updateUser', () => {
    it('should update a user and return status 200', async () => {
      const updatedUser = { id: 1, name: 'John Doe Updated' };
      req.params.id = '1';
      req.body = updatedUser;
      sinon.stub(userService, 'updateUser').resolves(updatedUser);

      await userController.updateUser(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(updatedUser)).to.be.true;

      userService.updateUser.restore();
    });

    it('should return 404 if user does not exist', async () => {
      req.params.id = '1';
      req.body = { name: 'John Doe Updated' };
      sinon.stub(userService, 'updateUser').resolves(null);

      await userController.updateUser(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'User with ID 1 not found' })).to.be.true;

      userService.updateUser.restore();
    });

    it('should return 500 if service throws an error', async () => {
      req.params.id = '1';
      req.body = { name: 'John Doe Updated' };
      sinon.stub(userService, 'updateUser').throws(new Error('Service Error'));

      await userController.updateUser(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: 'Service Error' })).to.be.true;

      userService.updateUser.restore();
    });
  });

  describe('deleteUser', () => {
    it('should delete a user and return status 200', async () => {
      req.params.id = '1';
      sinon.stub(userService, 'deleteUser').resolves({});

      await userController.deleteUser(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ message: 'User with ID 1 deleted successfully' })).to.be.true;

      userService.deleteUser.restore();
    });

    it('should return 404 if user does not exist', async () => {
      req.params.id = '1';
      sinon.stub(userService, 'deleteUser').resolves(null);

      await userController.deleteUser(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'User with ID 1 not found' })).to.be.true;

      userService.deleteUser.restore();
    });

    it('should return 500 if service throws an error', async () => {
      req.params.id = '1';
      sinon.stub(userService, 'deleteUser').throws(new Error('Service Error'));

      await userController.deleteUser(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: 'Service Error' })).to.be.true;

      userService.deleteUser.restore();
    });
  });
});
