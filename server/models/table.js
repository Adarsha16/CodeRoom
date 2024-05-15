import pool from "../db/connectDB.js";
import dotenv from "dotenv";
dotenv.config();

//DEFINING SCHEMA FOR DATABASE, creating table and columns
//Creating Table on name : userstable if not exists......(NOTE: can be of any name)
function createTable() {

    pool.query(
        `CREATE TABLE IF NOT EXISTS 
        ${process.env.DB_TABLE_NAME}(
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL UNIQUE,
            github VARCHAR(100),
            email VARCHAR(100) NOT NULL UNIQUE,
            password_hash CHAR(60) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`)
        .then(data => {
            console.log(`MYSQL:: (table.js)Table created : ${process.env.DB_TABLE_NAME} \n`);
        })
        .catch(error => {
            console.log("MYSQL:: Database error :: app.js :: while creating table\n", error)
        })


};


export { createTable };


