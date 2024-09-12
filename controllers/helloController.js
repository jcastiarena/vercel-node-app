import { sayHello } from '../services/helloService.js';

export const getHello = (req, res) => {
  const message = sayHello();
  res.status(200).json({ message });
};