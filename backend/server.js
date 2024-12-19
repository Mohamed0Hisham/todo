import app from "./app";
import { configDotenv } from "dotenv";
configDotenv();

app.listen(process.env.PORT, () => {
	console.log("🚀 server is initialized");
});
