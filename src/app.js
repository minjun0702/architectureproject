import express from "express";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error-handler.middleware.js";
import { SERVER_PORT } from "./constants/env.constant.js";
import { apirouter } from "./routers/index.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api", apirouter);
app.use(errorMiddleware);

app.listen(SERVER_PORT, () => {
  console.log(SERVER_PORT, "포트로 서버가 열렸어요!");
});
