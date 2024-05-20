import express from 'express';
const room_router = express.Router()

import { room } from "../controller/index.js"

/////Functions to be implimented
room_router.route("/").post(room);

export default room_router;