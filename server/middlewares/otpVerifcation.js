import pool from "../db/connectDB.js";
import dotenv from "dotenv";
dotenv.config();




const otpVerification = async (req, res, next) => {

    try {

        const { username, github, email, password, otp } = req.body;

        console.log("OTP from middleware", otp);

        const otp_retrive_query = `
        SELECT * 
        FROM ${process.env.DB_NAME}.${process.env.DB_OTP_TABLE_NAME} 
        WHERE email = ? 
        ORDER BY expires_at
        DESC
        LIMIT 1;`

        const db_otp_retrive_response = await pool.query(otp_retrive_query, [email]);
        console.log("Middleware", db_otp_retrive_response);
        console.log("Middleware o o", !db_otp_retrive_response[0][0]);

        if (!db_otp_retrive_response[0][0]) {

            return res.status(500).json({ "Error": "Internal Server Error while fetching otp from db" })
        }


        const { otp: db_otp, expires_at } = db_otp_retrive_response[0][0];

        console.log("user otp , db otp", otp, db_otp);

        if (db_otp.toString() !== otp.toString()) {

            return res.status(400).json({ "OTP INVALID": "OTP doesnot match" });

        }


        req.user = { username, github, email, password }
        next();



    } catch (error) {
        console.log(error);

    }

}

export { otpVerification }