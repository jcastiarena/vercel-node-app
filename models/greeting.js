// models/greeting.js
import mongoose from 'mongoose';

const greetingSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
});

const Greeting = mongoose.model('Greeting', greetingSchema);
export default Greeting;
