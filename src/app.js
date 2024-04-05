import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import router from "./routers";
import connect from './utils/connect';


// Middleware
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// Connect to database
connect()

// Routers
app.use('/api/v1', router)

export const viteNodeApp = app;