import { UsersRepo } from "../repositories/user.repo.js";
import argon from "argon2";
const userRepo = new UsersRepo();

export const getAllUsers = async (req, res) => {
	try {
		const filters = req.query;
		const users = await userRepo.getUsers(filters);
		return res.status(200).json(users);
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Error fetching users",
			error: error,
		});
	}
};
export const getSingleUser = async (req, res) => {
	const { id } = req.params;
	if (!id) {
		return res.status(400).json({ message: "no id provided" });
	}
	try {
		const user = await userRepo.getUserByID(id);
		if (user == null) {
			return res.status(404).json({ message: "user was not found" });
		}
		return res.status(200).json(user);
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Error fetching user",
			error: error,
		});
	}
};
export const createUser = async (req, res) => {
	//new user data
	const user = req?.body;
	if (user == null) {
		return res.status(400).json({ message: "no data provided" });
	}
	//check if the email is already in use
	try {
		const alreadyExist = await userRepo.getUsers({ email: user.email });
		if (alreadyExist.length > 0) {
			return res.status(409).json({
				message: "user email already in use",
			});
		}
		//hash the user password
		const hashedPassword = await argon.hash(user.password, {
			type: argon.argon2id, // Use Argon2id for best resistance against attacks
			timeCost: 3, // Number of iterations
			memoryCost: 65536, // 64 MB memory
			parallelism: 2, // Use 2 threads
		});
		user.password = hashedPassword;
		const result = await userRepo.createUser(user);
		//if something went wrong while inserting a user
		if (result.acknowledged) {
			return res.status(201).json({
				success: true,
				message: "user created",
				user: result,
			});
		} else {
			return res.status(406).json({
				message: "user data granted but failed to create a new user",
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Error creating a user",
			error: error,
		});
	}
};
export const updateUser = async (req, res) => {
	const update = req?.body;
	const id = req.params;
	console.log(update);
	if (id == null || update == null) {
		return res.status(400).json({
			success: false,
			message: "no data provided or id is missing",
		});
	}
	try {
		const result = await userRepo.updateUser(id, update);
		if (result.acknowledged && result.modifiedCount === 1) {
			return res.status(202).json({
				success: true,
				message: "user updated",
				user: result,
			});
		} else {
			return res.status(500).json({
				message: "enternal server error",
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Error updating a user",
			error: error,
		});
	}
};
export const deleteUser = async (req, res) => {
	const id = req.params.id;
	if (id == null) {
		return res.status(400).json({
			success: false,
			message: "id is missing",
		});
	}
	try {
		const result = await userRepo.deleteUser(id);
		if (result.acknowledged && result.deletedCount === 1) {
			return res.status(200).json({
				success: true,
				message: "user delted",
				result,
			});
		} else {
			return res.status(500).json({
				message: "enternal server error",
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Error deleting a user",
			error: error.message,
		});
	}
};
