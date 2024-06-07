import express from 'express'
import http from 'http'
const app = express();
import router from './router/route.js';
import pool from './db/connectDB.js';

//ws
import { Server } from 'socket.io';

import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';
import { createTable } from "./models/table.js"
// import { authentication } from "./middlewares/authentication.js"


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


/**
 * ERROR Handling MIDDLEWARE
 */

app.use(notFoundMiddleware)


/**
 * To startup the server
 */

// let server_io;
const PORT = process.env.PORT || 5001;

console.log(PORT);
const start = async (req, res) => {

    try {

        const expressServer = app.listen(PORT, () => {

            console.log(`Connecting to the server on port ${PORT}`)

        });


        //Creating Database on name : users....if not exists
        await pool.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`)
            .then(() => {

                console.log(`MYSQL:: (app.js)Database Created : ${process.env.DB_NAME}`)
            })
            .catch(error => console.log("MYSQL:: Database error :: app.js :: while creating database\n", error));


        //making it work like schema.
        createTable();


        return expressServer

    } catch (error) {

        console.log(error);

    }

}

const expressServer = await start();


/**
 * Websocket request
 */

const io = new Server(expressServer, {

    path: '/api/room',
    cors: {
        origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:5173", "http://127.0.0.1:5173"]
    }

});


import { socket_app } from './socket_app.js';
socket_app(io);

