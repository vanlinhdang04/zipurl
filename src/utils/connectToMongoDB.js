import {MongoClient} from 'mongodb'

async function connectToMongoDB() {
    try {
        const url = 'mongodb+srv://vanlinhdang1999:vanlinhdang1999@booking.rumwttu.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB server URL
  
        // Create a new MongoClient
        const client = new MongoClient(url);
    
        // Connect to the MongoDB server
        await client.connect();
        console.log('Connected to MongoDB');
    
        // Do further operations with the database
    
        // Disconnect from the MongoDB server
        await client.close();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

export default connectToMongoDB;