import express from 'express'
const router = express.Router();

import { compiler, getUser, Github, login, register } from "../controller/index.js"



router.post("/github", Github);
router.route("/code/:lang").post(compiler);
router.route("/auth/login").post(login);
router.route("/auth/register").post(register);
router.route("/getuser").get(getUser);


export default router