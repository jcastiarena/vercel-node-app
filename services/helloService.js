// export const sayHello = () => {
//   return "Hello from Vercel Serverless, Saverio!";
// };

// services/helloService.js
import Greeting from '../models/Greeting.js';

export const getGreeting = async () => {
  let greeting = await Greeting.findOne();
  if (!greeting) {
    greeting = new Greeting({ value: 'Hello from MongoDB!' });
    await greeting.save();
  }
  return greeting.value;
};

export const updateGreeting = async (newValue) => {
  let greeting = await Greeting.findOne();
  if (!greeting) {
    greeting = new Greeting({ value: newValue });
  } else {
    greeting.value = newValue;
  }
  await greeting.save();
  return greeting.value;
};






// services/helloService.js
import { helloRepository } from '../repositories/helloRepository.js';

export const helloService = {
  async getHelloMessage() {
    // Use the repository to retrieve the message
    const message = await helloRepository.findHelloMessage();
    return message || 'Hello from MongoDB!';
  },

  async setHelloMessage(newMessage) {
    // Use the repository to save the message
    await helloRepository.saveHelloMessage(newMessage);
  },
};


