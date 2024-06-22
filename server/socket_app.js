//import { Server } from "socket.io";
import jwt from 'jsonwebtoken'


//State

const UserState = {

    users: [],
    setUsers: function (newUsersArray) {
        this.users = newUsersArray;
    }

};

let Server_InputText;


export const socket_app = async (io) => {

    let ADMIN = 'Admin';

    io.on("connection", (socket) => {


        /**
         * Authorize the user.
        */

        dcryptAndAuthorize(socket, io)
            .then(() => {              // Proceed with the connection only after authorization
                console.log(`Authorization successful for socket id: ${socket.id}`);
                handleConnection(socket, io, ADMIN);
            })
            .catch(error => {
                console.log(`Authorization error: ${error.message}`);
                socket.disconnect(true);
            });
    });

}


function handleConnection(socket, io, ADMIN) {

    //console.log(`User connected : `, socket.id);

    // socket.emit('message', BuildMsg(ADMIN, ' Welcome to the club'));

    /**
     * On Entering the Room
     */
    socket.on("enterroom", ({ username = "user", roomid }) => {


        console.log("room", username, roomid);

        /*///Check if prev room is present;
        const prevRoom = getUser(socket.id)?.room;

        console.log("prevRoom", prevRoom)
        if (prevRoom) {

            socket.leave(prevRoom);
            io.to(prevRoom).emit('message', BuildMsg(ADMIN, `${username} has left the room`))
        }*/

        // Activate User
        const user = ActivateUser(socket.id, username, roomid);
        console.log("Activated user ", user)

        /*//Update userlist on Previous room
        if (prevRoom) {

            const prev_users = getAllUsersInRoom(prevRoom);
            io.to(prevRoom).emit('userList', { users: prev_users });

        };*/

        // Check if there are existing users in the room
        const existingUsers = getAllUsersInRoom(user.room);
        if (existingUsers.length > 1) { // If users are already joined
            // Send a message to the user who joined
            socket.emit('message', BuildMsg(ADMIN, `You have joined room ${user.room}`));
        } else {
            // If no other users are in the room
            socket.emit('message', BuildMsg(ADMIN, `You have created and joined room ${user.room}`));
        }

        // Join Room
        socket.join(user.room);



        // To those other than the users joined
        socket.to(user.room).emit('message', BuildMsg(ADMIN, `${user.username} has just joined`));

        //////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////if BUG comment this out/////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////
        socket.emit("InputField", { InputText: Server_InputText }); //Updates the room data to the new user


        //Update the user list for just joined room
        // io.to(user.room).emit('userList', {
        //     users: getAllUsersInRoom(user.room)
        // })

        // Update room list for everyone
        // io.emit('roomList', {
        //     rooms: getAllActiveRooms()
        // })

        console.log("reached to bottom")

        // if (room) {
        //     io.emit('LanguageSwitched', extension, language);
        // }
    });

    /**
     * Disconnected user
     */

    socket.on('disconnect', () => {

        const user = getUser(socket.id);


        if (user) {
            io.to(user.room).emit('message', BuildMsg(ADMIN, `${user.username} has disconnected`));

            // io.to(user.room).emit('userList', {
            //     users: getAllUsersInRoom(user.room)
            // })

            // io.emit('roomList', {
            //     rooms: getAllActiveRooms()
            // })
            handleUserLeavefn(user, user.room);
        }

        // Remove user from current state
        userLeavesApp(socket.id);
        console.log(`User ${socket.id} disconnected`)

    });

    socket.on("userListOnRoom", (data) => {

        console.log("Room list run", data);
        const Userinrooms = getAllUsersInRoom(data)

        console.log("usersinroom on req", Userinrooms)
        io.to(data).emit("userListOnRoom", Userinrooms)
    })



    /**
     * When Message from client
     */
    socket.on("message", ({ username = 'user', text }) => {

        console.log("Message receieved ", username, text)

        const room = getUser(socket.id)?.room;
        if (room) {
            io.to(room).emit("message", BuildMsg(username, text));
        }

    });


    socket.on('InputField', ({ InputText }) => {

        console.log("data:", { InputText });
        Server_InputText = InputText;

        const room = (getUser(socket.id))?.room;
        // console.log("if", room)
        socket.broadcast.to(room).emit("InputField", { InputText });
    })

    socket.on('OutputField', ({ OutputText }) => {

        console.log("data on output", OutputText);

        const room = (getUser(socket.id))?.room;

        socket.broadcast.to(room).emit('OutputField', { OutputText })
    });




    function handleUserLeavefn(user, room) {

        const allUsersInRoom = getAllUsersInRoom(room);
        const OnlyUsersPresentOnRoom = allUsersInRoom.filter(each => each.username !== user.username)

        if (user) {
            io.to(room).emit('userListAfterLeave', { users: OnlyUsersPresentOnRoom });

        }

    };




    /**
     * When user wants to leave the room
     */

    socket.on("unsubscribe", (room) => {

        socket.leave(room);

        //Emit disconnection messages to the room
        const user = getUser(socket.id);
        handleUserLeavefn(user, room)
        // const allUsersInRoom = getAllUsersInRoom(room);
        // const OnlyUsersPresentOnRoom = allUsersInRoom.filter(each => each.username !== user.username)

        if (user) {
            io.to(room).emit('message', BuildMsg(ADMIN, `${user.username} has left the room`));
            // io.to(room).emit('userListAfterLeave', { users: OnlyUsersPresentOnRoom });

            // io.emit('roomList', { rooms: getAllActiveRooms() });
        }

    });
}

/**
 * When room not assigned
 * 
 */

// socket.on("notAssigned", (msg) => {

//     socket.emit("notAssigned", msg)

// })









function BuildMsg(username, text) {

    return {
        username,
        text
    };
}



function getUser(id) {

    return UserState.users.find(user =>
        // console.log("getuserid", user)
        user.id === id
    );

}

function ActivateUser(id, username = "user", room) {

    console.log("Activate user ", id, username, room)
    const user = { id, username, room }
    UserState.setUsers([

        ...UserState.users.filter(user => user.id !== id), user

    ])

    return user;
};


function getAllUsersInRoom(room) {

    return UserState.users.filter((user) => user.room === room)

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

