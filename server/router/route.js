import express from 'express'
const router = express.Router();

import { compiler, getUser, Github, login, register, beforeRegisteration } from "../controller/index.js"
import { otpVerification } from '../middlewares/otpVerifcation.js';



router.post("/github", Github);
router.route("/code/:lang").post(compiler);
router.route("/auth/login").post(login);

// router.route("/auth/register").post(register);
router.route("/auth/register").post(beforeRegisteration);
router.route("/auth/otp/registeration").post(otpVerification, register);

router.route("/getuser").get(getUser);


export default router