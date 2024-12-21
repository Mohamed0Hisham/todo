import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.DB_URL;
const dbName = process.env.DB_NAME;
const client = new MongoClient(uri);
let db;

export const connectToDB = async function dbConnection() {
	if (!db) {
		try {
			await client.connect();
			db = client.db(dbName);
			console.log(`✅ MongoDB connected to ${dbName} database🌍`);
		} catch (error) {
			console.error("❌ Error connecting to MongoDB:", error);
			throw error;
		}
	}
	return db;
};

// Graceful shutdown
process.on("SIGINT", async () => {
	try {
		await client.close();
		console.log("✅ MongoDB connection closed gracefully");
		process.exit(0);
	} catch (error) {
		console.error("❌ Error closing MongoDB connection:", error);
		process.exit(1);
	}
});
