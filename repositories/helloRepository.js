// repositories/helloRepository.js
import { MongoClient } from 'mongodb';

// Setup your MongoDB connection URI and database
const uri = process.env.MONGO_URI; // Make sure you have your MongoDB URI in the environment variable
const dbName = 'test';
const collectionName = 'greetings';

const client = new MongoClient(uri);

export const helloRepository = {
  async connect() {
    if (!client.isConnected()) {
      await client.connect();
    }
    return client.db(dbName).collection(collectionName);
  },

  async findHelloMessage() {
    const collection = await this.connect();
    // Fetch the message from the collection
    const message = await collection.findOne({ name: 'helloMessage' });
    return message ? message.text : null;
  },

  async saveHelloMessage(text) {
    const collection = await this.connect();
    // Insert or update the hello message
    await collection.updateOne(
      { name: 'helloMessage' },
      { $set: { text } },
      { upsert: true }
    );
  },
};
