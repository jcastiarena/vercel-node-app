import express from 'express';
const app = express();

import userController from '../controllers/userController.js';
import { validateUser, handleValidationErrors } from '../middlewares/userValidation.js';

app.use(express.json());

app.post('/api/users', validateUser, handleValidationErrors, userController.createUser);
app.get('/api/users', userController.getAllUsers);
app.get('/api/users/:id', userController.getUser);
app.patch('/api/users/:id', userController.patchUser);
app.put('/api/users/:id', userController.updateUser);
app.delete('/api/users/:id', userController.deleteUser);

import connectDB from '../config/db.js';
connectDB();

export default app;