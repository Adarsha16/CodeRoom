import express from 'express'
import http from 'http'
const app = express();
import router from './router/route.js';
import pool from './db/connectDB.js';

//ws
import { Server } from 'socket.io';

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

const server = http.createServer(app);
/** Setting up socket for chat
 */

const socket_start = async () => {
    const io = new Server(server,
        {
            cors: {
                origin: "http://localhost:5173",
                methods: ["GET", "POST"]
            }
        }
    );

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id} `);

        //socket.on("join_room", (room) => {
        //  socket.join(room);
        //console.log(room);
        //});

        socket.on("send_message", (data) => {
            io.emit("receive_message", data);
        });
    })
    server.listen(5002, () => {
        console.log("Server is running");
    });
}

/**
 * To startup the server
 */

const PORT = process.env.PORT || 5001;

console.log(PORT);
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
socket_start();