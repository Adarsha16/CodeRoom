import express from 'express'
const router = express.Router();

import { compiler, Github } from "../controller/index.js"


router.post("/api/github", Github);
router.route("/api/code/:lang").post(compiler)

export default router