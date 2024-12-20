import { TodoRepo } from "../repositories/todo.repo.js";
import { ObjectId } from "mongodb";
import generateID from "../helpers/generateOTP.js";

const todoRepo = new TodoRepo();
export const getAllTodos = async (req, res) => {
	const userId = req.params.id;
	if (userId == null) {
		return res.status(400).json({ message: "no id provided" });
	}
	try {
		const objectId = new ObjectId(userId);
		const todos = await todoRepo.getAllTodos(objectId);
		return res.json(todos);
	} catch (error) {
		console.log(error);
		return res.status(404).json({
			message: "no todos found",
			error: error.message,
		});
	}
};
export const createTodo = async (req, res) => {
	const id = req.params.id;
	const todoId = generateID();
	const todo = req?.body;
	if (id == null || todo == null) {
		return res.status(400).json({ message: "missing required data" });
	}
	const newTodo = {
		id: todoId,
		...todo,
		createdAt: new Date(),
		updatedAt: new Date(),
	};
	try {
		const userId = new ObjectId(id);
		const result = await todoRepo.createTodo(userId, newTodo);
		if (result.acknowledged && result.modifiedCount === 1) {
			return res.status(201).json({ message: "todos inserted" });
		} else {
			return res.status(500).json({
				message: "please check the user id",
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: "no todos found",
			error: error.message,
		});
	}
};
export const updateTodo = async (req, res) => {
	const id = req.params.id;
	const todoId = req.query.todo;
	console.log(todoId);
	const todo = req?.body;
	if (id == null || todo == null) {
		return res.status(400).json({ message: "missing required data" });
	}
	try {
		const userId = new ObjectId(id);
		todo.updatedAt = new Date();
		const result = await todoRepo.updateTodo(userId, todoId, todo);
		if (result.acknowledged && result.modifiedCount === 1) {
			return res.status(201).json({ message: "todo updated" });
		} else {
			return res.status(500).json({
				message: "no modification is done",
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: "no todos found",
			error: error.message,
		});
	}
};
export const deleteTodo = async (req, res) => {
	const id = req.params.id;
	const todoId = req.query.todo;
	console.log(todoId);
	const todo = req?.body;
	if (id == null || todo == null) {
		return res.status(400).json({ message: "missing required data" });
	}
	try {
		const userId = new ObjectId(id);
		todo.updatedAt = new Date();
		const result = await todoRepo.deleteTodo(userId, todoId);
		if (result.acknowledged) {
			return res.status(201).json({ message: "todo deleted" });
		} else {
			return res.status(500).json({
				message: "no modification is done",
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: "no todos found",
			error: error.message,
		});
	}
};
