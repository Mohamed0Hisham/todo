import { MongoClient } from "mongodb";
import { configDotenv } from "dotenv";

configDotenv();
const uri = process.env.DB_URL;
const dbName = process.env.DB_NAME;

const client = new MongoClient(uri);
let db;

export const connectToDB = async function dbConnection() {
	if (!db) {
		try {
			await client.connect();
			db =client.db(dbName);
			console.log(`✅ MongoDB connected to ${dbName} database🌍`);
		} catch (error) {
			console.error("❌ Error connecting to MongoDB:", error);
			throw error;
		}
	}
};
