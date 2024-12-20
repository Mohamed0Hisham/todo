import { connectToDB } from "../config/db.connect.js";
import { ObjectId } from "mongodb";

export class UsersRepo {
	constructor() {
		this.collectionName = "users";
	}
	async getCollection() {
		const db = await connectToDB();
		return db.collection(this.collectionName);
	}
	async getUsers(filters = {}) {
		const collection = await this.getCollection();
		return collection.find(filters).toArray();
	}
	async getUserByID(id) {
		const collection = await this.getCollection();
		const objectId = new ObjectId(id);
		return collection.findOne({ _id: objectId });
	}
	async createUser(user) {
		const collection = await this.getCollection();
		return collection.insertOne(user);
	}
	async updateUser(id, update) {
		const collection = await this.getCollection();
		const objectId = new ObjectId(id);
		return collection.updateOne(
			{ _id: objectId },
			{ $set: update },
		);
	}
	async deleteUser(id) {
		const collection = await this.getCollection();
		const objectId = new ObjectId(id);
		return collection.deleteOne({ _id: objectId });
	}
}
