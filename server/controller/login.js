import dotenv from "dotenv";
dotenv.config();
import pool from "../db/connectDB.js";
import { emailValidation, createJWT, verifyBcryptHash } from "./index.js";



const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Validate email
        if (!emailValidation(email)) {

            return res.status(400).json({ error: "Incorrect email format" });

        }
        if (!email || !password) {
            return res.status(400).json({ "Error": "wrong username, email or password" });
        }

        ///////////Database query///////////////
        const query = `
        SELECT * FROM ${process.env.DB_NAME}.${process.env.DB_TABLE_NAME} 
        WHERE email = ?;`;
        const if_present_data = await pool.query(query, [email]);
        ///////////////////////////////////////

        if (!if_present_data[0][0]) {
            return res.status(400).json({ "Error": "User doesnot Exists. Please register first!" })

        }


        const data = if_present_data[0][0];
        const verify_wait = await verifyBcryptHash(password, data?.password_hash)

        //////////////comparing hashed password/////////////////////
        if (!verify_wait) {

            return res.status(400).json({ "Error": "Password or email is incorrect" });
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