import express from 'express';
import cors from 'cors';

const app = express();

// Allow localhost:3000 for CORS
const corsOptions = {
  origin: 'http://localhost:5173', // Your client origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies if needed
}

import userController from '../controllers/userController.js';
import { validateUser, handleValidationErrors } from '../middlewares/userValidation.js';

app.use(express.json());
app.use(cors(corsOptions));

app.post('/api/users', validateUser, handleValidationErrors, userController.createUser);
app.get('/api/users', userController.getAllUsers);
app.get('/api/users/:id', userController.getUser);
app.patch('/api/users/:id', userController.patchUser);
app.put('/api/users/:id', userController.updateUser);
app.delete('/api/users/:id', userController.deleteUser);

import connectDB from '../config/db.js';
connectDB();

export default app;