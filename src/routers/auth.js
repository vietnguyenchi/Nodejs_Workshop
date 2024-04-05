import express from "express";
import { login, register } from "../controllers/auth";
import validBodyRequest from "../middlewares/validRequestBody";
import { loginValidator, registerValidator } from "../validations/auth";

const router = express.Router();

router.post('/register', validBodyRequest(registerValidator), register);
router.post('/login', validBodyRequest(loginValidator), login);

export default router;