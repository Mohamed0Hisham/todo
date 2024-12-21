import argon from "argon2";
import { UsersRepo } from "../repositories/user.repo.js";
import { generateToken } from "../helpers/generateOTP.js";

const userRepo = new UsersRepo();
export const signin = async (req, res) => {
	const { email, password } = req?.body;
	if (email == null || password == null) {
		return res.status(400).json({
			message: "Email and password are required",
		});
	}
	try {
		const user = await userRepo.getUsers({ email });

		if (user.length == 0) {
			return res.status(404).json({ message: "invalid email provided" });
		}
		if (email !== user[0].email) {
			return res
				.status(401)
				.json({ message: "invalid email or password" });
		}
		//checking password
		const isCorrectPassword = await argon.verify(
			user[0].password,
			password
		);
		if (isCorrectPassword === false) {
			return res
				.status(401)
				.json({ message: "invalid email or password" });
		}
		const token = generateToken();
		return res
			.status(200)
			.json({ message: "successfully signed in", token });
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ message: "internal server error while signing in" });
	}
};
