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
	updateTodo,
} from "../controllers/todo.controller.js";
import { signin } from "../controllers/auth.controller.js";
const router = express.Router();

// user route
router.get("/users", getAllUsers);
router.get("/user/:id", getSingleUser);
router.post("/user", createUser);
router.put("/user/:id/", updateUser);
router.delete("/user/:id", deleteUser);

// todo route
router.get("/todos/:id", getAllTodos);
router.post("/todo/:id", createTodo);
router.put("/todo/:id", updateTodo);
router.delete("/todo/:id", deleteTodo);

// authentication route
router.post("/signin", signin);

export default router;
