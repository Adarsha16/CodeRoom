import express from 'express'
const app = express();
import router from './router/route.js';
import pool from './db/connectDB.js';

import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';
import { createTable } from "./models/table.js"
import { authentication } from "./middlewares/authentication.js"
import room_router from "./router/room.js"

//security package
import helmet from "helmet"
import cors from 'cors'



app.use(express.json());  //To parse the json file
app.use(cors());          //For cross origin resource sharing
app.use(helmet());        //Secure express apps by setting response header



/**
 * Routes 
 */

app.use("/api", router)
app.use("/api/room", authentication, room_router)


/**
 * ERROR Handling MIDDLEWARE
 */

app.use(notFoundMiddleware)


/**
 * To startup the server
 */

const PORT = process.env.PORT || 5069;


const start = async (req, res) => {

    try {

        app.listen(PORT, () => {

            console.log(`Connecting to the server on port ${PORT}`)

        })

        //Creating Database on name : users....if not exists
        await pool.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`)
            .then(() => {

                console.log(`MYSQL:: (app.js)Database Created : ${process.env.DB_NAME}`)
            })
            .catch(error => console.log("MYSQL:: Database error :: app.js :: while creating database\n", error));


        //making it work like schema.
        createTable();




    } catch (error) {

        console.log(error);

    }

}

start();