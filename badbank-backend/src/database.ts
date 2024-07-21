import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const dbURI = process.env.DB_URI || "mongodb+srv://BrennaBaker:GuppyScuba2024@badbank.tvgccqu.mongodb.net/?retryWrites=true&w=majority&appName=BadBank";

const client = new MongoClient(dbURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectDB() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1); // Exit the process with an error code
  }
}

connectDB();

export default client;
