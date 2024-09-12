import express from 'express';
const app = express();
import { getHello } from '../controllers/helloController.js'

app.get('/api/hello', getHello);

export default app;
