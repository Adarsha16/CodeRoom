import dotenv from "dotenv";
dotenv.config();
import pool from "../db/connectDB.js";
import { emailValidation, bcryptHash } from "./index.js";
import { generateotp } from "./otp/generateotp.js";
import { sendMailThroughNodemailer } from "./otp/NodeMailer.js";
import { CreateOTPTable } from "../models/otp.js";


const beforeRegisteration = async (req, res) => {

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
        WHERE email = ? OR username = ?;`;

        const [if_present_data] = await pool.query(query, [email, username]);

        if (Object.values(if_present_data[0])[0] !== 0) {
            return res.status(400).json({ "statusText": "login", "status": 400, "Error": "Username or Email is already registered!" });

        };





        ///////////////////////////////////////////////////OTP GEN AND STORE IN DB//////////////////////////////////////////////////////
        //Generate otp
        const otp = generateotp();

        //Expiration time, in ms
        const expires_at = new Date(Date.now() + (Number(process.env.OTP_EXPIRY) * 60000))

        //call database
        CreateOTPTable();
        //store on database
        const otp_query = `INSERT INTO ${process.env.DB_NAME}.${process.env.DB_OTP_TABLE_NAME} (email, otp, expires_at) VALUES (?,?,?)`

        const db_otp_response = await pool.query(otp_query, [email, otp, expires_at])
        console.log(db_otp_response);

        if (!db_otp_response) {
            return res.status(500).json({ "statusText": "Internal Server Error" })
        }

        //Send mail
        sendMailThroughNodemailer(email, otp);


        res.status(200).json({ "Success!": "Can proceed to OTP" });

    } catch (error) {

        console.log(error);

    }

}

export { beforeRegisteration }
