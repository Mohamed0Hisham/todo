import app from "./app.js";
import { configDotenv } from "dotenv";
configDotenv();

app.listen(process.env.PORT, () => {
	console.log("🚀 server is initialized");
});
