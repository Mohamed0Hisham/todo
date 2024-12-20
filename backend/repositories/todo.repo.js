import { connectToDB } from "../config/db.connect.js";
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
		const collection = await this.getCollection();
		return collection
			.find({ _id: id }, { projection: { name: 1, todos: 1, _id: 0 } })
			.toArray();
	}
	async createTodo(id, todo) {
		const collection = await this.getCollection();
		//find the user of these todos
		try {
			return collection.updateOne(
				{ _id: id },
				{ $push: { todos: { ...todo } } }
			);
		} catch (error) {
			console.log(error.message);
			process.exit(1);
		}
	}
	async updateTodo(id, todoId, update) {
		const collection = await this.getCollection();
		//find the user of these todos
		try {
			return await collection.updateOne(
				{ _id: id, "todos.id": todoId },
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
			console.log(error.message);
			process.exit(1);
		}
	}
	async deleteTodo(id, todoId) {
		const collection = await this.getCollection();
		return await collection.updateOne(
			{ _id: id },
			{ $pull: { todos: { id: todoId } } }
		);
	}
}
