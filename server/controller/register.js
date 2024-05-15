import dotenv from "dotenv";
dotenv.config();
import pool from "../db/connectDB.js";
import { emailValidation } from "./index.js";



async function register(req, res) {

    try {

        const { username, github, email, password } = req.body;

        console.log(req.body)
        //checking email regix;
        if (!emailValidation(email)) {
            return res.status(400).json({ error: "Incorrect email format" });
        };

        //checking field input;
        if (!username || !github || !email || !password) {
            return res.status(400).json({ error: "Incorrect Field input" });
        }


        //checking if email is already registered or not
        const query = `
        SELECT COUNT(*) FROM ${process.env.DB_NAME}.${process.env.DB_TABLE_NAME} 
        WHERE email = ?;`;

        const if_present_data = await pool.query(query, [email]);




        if (if_present_data[0][0]['COUNT(*)'] !== 0) {
            console.log("equal to 0")
            res.status(400).json({ "Bad Request": "User already registered!, Please login" });
        }


        ///Registering user in database
        const register_query =
            `
            INSERT INTO ${process.env.DB_NAME}.${process.env.DB_TABLE_NAME} 
            (username, github , email, password_hash)
            VALUES
            (?,?,?,?);
        `;

        const registered_data = await pool.query(register_query, [username, github, email, password]);
        console.log("registered", registered_data);

        //status created
        res.status(201).json({ "Status: ": "Created successfully" })

    } catch (error) {

        console.log(error);

    }

}

export { register };