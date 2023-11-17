import express, { Request, Response, Application } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { APIRoutes } from "./routes";
// import { Worker } from "bullmq";
// import { queueEvents } from "./config/queue.config";
dotenv.config();
const app: Application = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

declare module "express-serve-static-core" {
  export interface Request {
    userid: any;
    role: string;
  }
}
// queueEvents.on("completed", () => {});
const PORT = process.env.PORT || 8000;
app.get("/", (req: Request, res: Response): void => {
  res.send("Hello Typescript with1 Node.js!!!");
});
app.use("/api", APIRoutes);
app.listen(PORT, (): void => {
  // redis.on("connect", () => console.log("redis connected!"));
  console.log(`Server Running here 👉 http://localhost:${PORT}`);
});
