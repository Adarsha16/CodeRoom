import dotenv from "dotenv"
dotenv.config()
// import pool from "../db/connectDB.js"
import JWT from "jsonwebtoken"

const getUser = async (req, res) => {

    try {


        console.log("header", req.headers)
        const authHeader = req.headers.authorization || req.headers.Authorization
        const token = authHeader?.startsWith("Bearer") && authHeader.split(" ")[1]


        // const { token } = req.params;
        console.log(token);


        if (!token) {
            return res.status(400).json({ "Error": "Bad or No Token Provided" })
        }
        const payload = JWT.verify(token, process.env.JWT_SECRET);
        console.log("getuser payload", payload)

        if (!payload) {
            return res.status(404).json({ "Error": "Payload Data not found while verifying the token" })
        }


        return res.status(200).json(payload)

    } catch (error) {
        console.log(error);
    }
};


export { getUser }