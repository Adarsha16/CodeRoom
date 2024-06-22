import express from 'express'
const router = express.Router();

import { compiler, getUser, Github, login, register, beforeRegisteration } from "../controller/index.js"
import { otpVerification } from '../middlewares/otpVerifcation.js';
import { rateLimit } from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutes
    limit: 300, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    message: {
        msg: 'To many requests from this IP. Please Try again later'
    }

})

router.post("/github", Github);
router.route("/code").post(compiler);
router.route("/auth/login").post(limiter, login);

// router.route("/auth/register").post(register);
router.route("/auth/register").post(limiter, beforeRegisteration);
router.route("/auth/otp/registeration").post(otpVerification, register);

router.route("/getuser").get(limiter, getUser);

export default router