import dotenv from "dotenv";
dotenv.config();
import pool from "../db/connectDB.js";
import { emailValidation, bcryptHash } from "./index.js";



async function register(req, res) {

    try {

        const { username, github, email, password } = req.body;

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
            res.status(400).json({ "Bad Request": "User already registered!, Please login" });
        }

        /////////////////////Hashing password//////////////////////
        let password_hash = await bcryptHash(password);


        ///Registering user in database
        const register_query =
            `
            INSERT INTO ${process.env.DB_NAME}.${process.env.DB_TABLE_NAME} 
            (username, github , email, password_hash)
            VALUES
            (?,?,?,?);
        `;

        const registered_data = await pool.query(register_query, [username, github, email, password_hash]);


        //status created
        res.status(201).json({ "Status: ": "Created successfully" })

    } catch (error) {

        console.log(error);

    }

}

export { register };