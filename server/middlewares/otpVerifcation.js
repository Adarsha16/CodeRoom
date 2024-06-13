import pool from "../db/connectDB.js";
import dotenv from "dotenv";
dotenv.config();




const otpVerification = async (req, res, next) => {

    try {

        const { username, github, email, password, otp } = req.body;
        console.log("reqbody", req.body)

        if (!otp) {
            return res.status(404).json({ "error": "No OTP found" })
        }

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
        console.log("hellooooooooooooo")
        console.log("Middleware o o", !db_otp_retrive_response[0][0]);

        if (!db_otp_retrive_response[0][0]) {

            return res.status(500).json({ "error": "Internal Server Error while fetching otp from db" })
        }


        const { otp: db_otp, created_at, expires_at } = db_otp_retrive_response[0][0];

        console.log("user otp , db otp", otp, db_otp);

        //Checking if otp time is still valid


        // const Current_Time = new Date(`${created_at}`);
        const Current_Time = new Date();
        const Final_Time = new Date(`${expires_at}`);

        console.log(Current_Time, "----------", Final_Time)
        console.log("compare c>f", Current_Time > Final_Time)

        console.log("if condition", Current_Time > Final_Time && (Math.abs(Current_Time - Final_Time) >= Number(process.env.OTP_EXPIRY) * 60000))
        if (Current_Time > Final_Time && (Math.abs(Current_Time - Final_Time) >= Number(process.env.OTP_EXPIRY) * 60000)) {


            return res.status(400).json({ "error": "OTP has expired, Please try again" });
        }


        //Checking if otp matches
        if (db_otp.toString() !== otp.toString()) {

            return res.status(400).json({ "error": "OTP doesnot match" });

        }




        req.user = { username, github, email, password }
        next();



    } catch (error) {
        console.log(error);

    }

}

export { otpVerification }