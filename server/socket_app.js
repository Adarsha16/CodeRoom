
import { Server } from "socket.io";


export const socket_app = async (io) => {

    let ADMIN = 'Admin'
    io.on("connection", (socket) => {

        console.log(`User connected : `, socket.id);
        socket.emit('message', BuildMsg(ADMIN, ' Welcome to the club'));


        socket.on("message", (data) => {


            socket.emit("message", BuildMsg('User', data))

        })



    });



}


function BuildMsg(user, text) {
    return {
        user,
        text
    }
}


