import express, {Request,Response,Application} from 'express';
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { APIRoutes } from './routes';

dotenv.config();
const app:Application = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

declare module 'express-serve-static-core' {
  export interface Request {
    userid: any
  }
}
const PORT = process.env.PORT || 8000;
app.get("/", (req:Request, res:Response):void => {
    res.send("Hello Typescript with Node.js!!!")
  });
app.use('/api',APIRoutes)
  app.listen(PORT, ():void => {
    console.log(`Server Running here 👉 http://localhost:${PORT}`);
  });