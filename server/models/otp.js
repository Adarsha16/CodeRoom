import pool from "../db/connectDB.js";
import dotenv from "dotenv";
dotenv.config();


function CreateOTPTable() {


    pool.query(`
    CREATE TABLE IF NOT EXISTS 
    ${process.env.DB_OTP_TABLE_NAME} (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    otp VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP
    );
    `)
        .then(data => {
            console.log(`Just Created OPT table : ${process.env.DB_OTP_TABLE_NAME}`, data)
        })
        .catch(error => {
            console.log(`Error Occured While created OTP Verif. Table :${process.env.DB_OTP_TABLE_NAME} `, error)
        })




};

export { CreateOTPTable };