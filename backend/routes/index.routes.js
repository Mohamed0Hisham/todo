import express from "express";
import {
	createUser,
	deleteUser,
	getAllUsers,
	getSingleUser,
	updateUser,
} from "../controllers/user.controller.js";
import {
	createTodo,
	deleteTodo,
	getAllTodos,
	getSingleTodo,
	updateTodo,
} from "../controllers/todo.controller.js";
import { signin } from "../controllers/auth.controller.js";
const router = express.Router();

// user route
router.get("/users", getAllUsers);
router.get("/user/:id", getSingleUser);
router.post("/user", createUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

// todo route
router.get("/todos", getAllTodos);
router.get("/todo/:id", getSingleTodo);
router.post("/todo", createTodo);
router.put("/todo", updateTodo);
router.delete("/todo", deleteTodo);

// authentication route
router.post("/signin", signin);

export default router;
