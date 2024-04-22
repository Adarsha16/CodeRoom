import express from 'express'
const router = express.Router();

import { compiler, Github } from "../controller/index.js"


router.get("/api/github", Github);
router.route("/api/code/:lang").get(compiler)

export default router