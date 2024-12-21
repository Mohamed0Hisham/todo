import { connectToDB } from "../config/db.connect.js";
import { ObjectId } from "mongodb";

export class TodoRepo {
	constructor() {
		//going with embedding
		this.collectionName = "users";
	}

	async getCollection() {
		const db = await connectToDB();
		return db.collection(this.collectionName);
	}

	async getAllTodos(id) {
		try {
			const collection = await this.getCollection();
			const objectId = new ObjectId(id);
			return await collection
				.find(
					{ _id: objectId },
					{ projection: { name: 1, todos: 1, _id: 0 } }
				)
				.toArray();
		} catch (error) {
			console.error("Error fetching todos:", error);
			throw new Error("Database error");
		}
	}

	async createTodo(id, todo) {
		try {
			const collection = await this.getCollection();
			const objectId = new ObjectId(id);
			return await collection.updateOne(
				{ _id: objectId },
				{ $push: { todos: { ...todo } } }
			);
		} catch (error) {
			console.error("Error creating todo:", error);
			throw new Error("Database error");
		}
	}

	async updateTodo(id, todoId, update) {
		try {
			const collection = await this.getCollection();
			const objectId = new ObjectId(id);
			return await collection.updateOne(
				{ _id: objectId, "todos.id": todoId },
				{
					$set: Object.fromEntries(
						Object.entries(update).map(([key, value]) => [
							`todos.$.${key}`,
							value,
						])
					), // Dynamically map fields to dot notation
				}
			);
		} catch (error) {
			console.error("Error updating todo:", error);
			throw new Error("Database error");
		}
	}

	async deleteTodo(id, todoId) {
		try {
			const collection = await this.getCollection();
			const objectId = new ObjectId(id);
			return await collection.updateOne(
				{ _id: objectId },
				{ $pull: { todos: { id: todoId } } }
			);
		} catch (error) {
			console.error("Error deleting todo:", error);
			throw new Error("Database error");
		}
	}
}
