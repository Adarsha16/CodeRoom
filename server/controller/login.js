import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import pool from "../db/connectDB.js";
import { emailValidation, createJWT } from "./index.js";



const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Validate email
        if (!emailValidation(email)) {

            return res.status(400).json({ error: "Incorrect email format" });

        }
        if (!email || !password) {
            return res.status(400).json({ "Bad Request, Error": "wrong username, email or password" });
        }

        ///////////Database query///////////////

        const query = `
        SELECT * FROM ${process.env.DB_NAME}.${process.env.DB_TABLE_NAME} 
        WHERE email = ?;`;
        const if_present_data = await pool.query(query, [email]);
        //////////////////////////////////////

        if (!if_present_data) {
            console.log("User doesnot Exists. Please register first!");
        }


        const data = if_present_data[0][0];


        //comparing password
        if (data?.password_hash !== password) {

            res.status(400).json({ "Unauthentication Error": "Password or email is incorrect" });
        }

        //Creating token of the data
        let token = createJWT(data);

        //status ok
        res.status(200).json({
            user: {

                token
            }

        });




    } catch (error) {

        console.log("Error", error);

    }

};

export { login };