import  { MongoClient } from 'mongodb';

export let client, db;

async function connectToDatabase() {
  try {
    const url = process.env.MONGO;

    // Create a new MongoClient
    client = new MongoClient(url);

    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB');

    // Access a specific database
    db = client.db('url-shortener'); // Replace with your desired database name

    // Return the database connection
    return {db, client};
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export default connectToDatabase;