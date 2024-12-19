import express from "express";

import router from "./routes/index.routes.js";
const app = express();
app.use(express.json());

//routes goes here
app.use("/api", router);

export default app;
