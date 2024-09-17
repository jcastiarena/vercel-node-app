// import { sayHello } from '../services/helloService.js';

// export const getHello = (req, res) => {
//   const message = sayHello();
//   res.status(200).json({ message });
// };

// controllers/helloController.js
import { getGreeting, updateGreeting } from '../services/helloService.js';


export const getHello = async (req, res) => {
  const greetingValue = await getGreeting();
  res.status(200).json({ message: greetingValue });
};

export const updateHello = async (req, res) => {
  const { newValue } = req.body;
  const updatedValue = await updateGreeting(newValue);
  res.status(200).json({ message: updatedValue });
};
