
// import { Server } from "socket.io";
import jwt from 'jsonwebtoken'


//State

const UserState = {

    users: [],
    setUsers: function (newUsersArray) {
        this.users = newUsersArray;
    }

};


export const socket_app = async (io) => {

    let ADMIN = 'Admin';

    io.on("connection", (socket) => {




        /**
         * Authorize the user.
        */



        dcryptAndAuthorize(socket, io);

        console.log(`User connected : `, socket.id);


        // socket.emit('message', BuildMsg(ADMIN, ' Welcome to the club'));

        /**
         * On Entering the Room
         */
        socket.on("enterroom", ({ username = "user", roomid }) => {
            console.log("room", username, roomid);

            ///Check if prev room is present;
            const prevRoom = getUser(socket.id)?.room;
            console.log("prevRoom", prevRoom)
            if (prevRoom) {

                socket.leave(prevRoom);
                io.to(prevRoom).emit('message', BuildMsg(ADMIN, `${username} has left the room`))
            }

            // Activate User
            const user = ActivateUser(socket.id, username, roomid);
            console.log("Activated user", user)

            //Update userlist on Previous room
            if (prevRoom) {

                const prev_users = getAllUsersInRoom(prevRoom);
                io.to(prevRoom).emit('userList', { users: prev_users });

            };


            // Join Room
            socket.join(user.room);

            // To user who have joined the room
            socket.emit('message', BuildMsg(ADMIN, `You have just joined ${user.room}`));

            // To those, other than the user joined
            socket.broadcast.to(user.room).emit('message', BuildMsg(ADMIN, `${user.username} Just Joined`));


            //Update the user list for just joined room
            io.to(user.room).emit('userList', {
                users: getAllUsersInRoom(user.room)
            })

            // Update room list for everyone
            io.emit('roomList', {
                rooms: getAllActiveRooms()
            })

            console.log("reached to bottom")


        });

        /**
         * Disconnected user
         */

        socket.on('disconnect', () => {

            const user = getUser(socket.id);
            userLeavesApp(socket.id);

            if (user) {
                io.to(user.room).emit('message', BuildMsg(ADMIN, `${user.username} has disconnected`));

                io.to(user.room).emit('userList', {
                    users: getAllUsersInRoom(user.room)
                })

                io.emit('roomList', {
                    rooms: getAllActiveRooms()
                })
            }

            console.log(`User ${socket.id} disconnected`)

        })




        /**
         * When Message from client
         */
        socket.on("message", ({ username = 'user', text }) => {

            console.log("message", username, text)

            console.log(socket.id)
            const room = (getUser(socket.id))?.room;


            io.to(room).emit("message", BuildMsg(username, text))

        });


        socket.on('InputField', ({ InputText }) => {

            console.log("data:", { InputText });

            const room = (getUser(socket.id))?.room;
            // console.log("if", room)
            socket.broadcast.to(room).emit("InputField", { InputText });
        })

        socket.on('OutputField', ({ OutputText }) => {

            console.log("data on output", OutputText);

            const room = (getUser(socket.id))?.room;
    
            // io.to(room).emit('OutputField', { OutputText })
            socket.broadcast.to(room).emit('OutputField', { OutputText })
        })


        /**
         * When room not assigned
         * 
         */

        // socket.on("notAssigned", (msg) => {

        //     socket.emit("notAssigned", msg)

        // })



    });



};



















function BuildMsg(username, text) {

    return {
        username,
        text
    }
}



function getUser(id) {

    return UserState.users.find(user =>
        // console.log("getuserid", user)
        user.id === id
    )

}

function ActivateUser(id, username = "user", room) {

    console.log("Activate user", id, username, room)
    const user = { id, username, room }
    UserState.setUsers([

        ...UserState.users.filter(user => user.id !== id), user

    ])

    return user;
};

function getAllUsersInRoom(prevRoom) {

    return UserState.users.filter((user) => user.room === prevRoom)

};

function getAllActiveRooms() {

    return Array.from(new Set(UserState.users.map(user => user.room)))
};

function userLeavesApp(id) {

    UserState.setUsers(
        UserState.users.filter(user => user.id !== id)
    );

}


async function dcryptAndAuthorize(socket, io) {


    try {

        const { token } = socket?.handshake?.auth;

        // console.log("token", token)
        if (!token) {
            io.emit("forcedisconnect", 'Authentication error: No token provided')
            // throw new Error('Authentication error: No token provided');
        }
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        if (!payload) {
            io.emit("forcedisconnect", 'Authentication error: Bad token provided')
            // throw new Error('Authentication error: Bad token provided');
        }

        socket.data.user = payload;
        console.log("pass");

    } catch (error) {

        io.emit("forcedisconnect", error)
        console.log(error)
        throw new Error(error)

    }
}

