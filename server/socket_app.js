//import { Server } from "socket.io";
import { text } from 'express';
import jwt from 'jsonwebtoken'


//State

let roomInputText = {};
let roomOutputText = {};
let roomLanguagesObj = {};

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

        // Activate User
        const user = ActivateUser(socket.id, username, roomid);
        console.log("Activated user ", user)


        // Check if there are existing users in the room
        const existingUsers = getAllUsersInRoom(user.room);
        if (existingUsers.length === 1) { // If this user is the first to join the room

            socket.emit('message', BuildMsg(ADMIN, `You have created and joined room ${user.room}`));

            // Initialize InputField and OutputField for the new user
            socket.emit("InputField", { InputText: "//comment here" });
            socket.emit("OutputField", { OutputText: "" });

        } else {  // If other users are already in the room
            socket.emit('message', BuildMsg(ADMIN, `You have joined room ${user.room}`));
        }

        // Join Room
        socket.join(user.room);


        if (roomInputText[user.room]) {
            socket.emit("InputField", { InputText: roomInputText[user.room] });
        }
        if (roomOutputText[user.room]) {
            socket.emit("OutputField", { OutputText: roomOutputText[user.room] });
        }


        // To those other than the users joined
        socket.to(user.room).emit('message', BuildMsg(ADMIN, `${user.username} has just joined`));

        //////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////if BUG comment this out/////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////


        //socket.emit("InputField", { InputText: Server_InputText }); //Updates the room data to the new user

        if (roomInputText[user.room]) {
            socket.emit("InputField", { InputText: roomInputText[user.room] });
        }
        if (roomOutputText[user.room]) {
            socket.emit("OutputField", { OutputText: roomOutputText[user.room] });
        }


        //Update the user list for just joined room
        // io.to(user.room).emit('userList', {
        //     users: getAllUsersInRoom(user.room)
        // })

        // Update room list for everyone
        // io.emit('roomList', {
        //     rooms: getAllActiveRooms()
        // })

        console.log("reached to bottom")

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


    /**
    * Language change for all users in a room
    * 
    */


    socket.on('roomUpdate', ({ roomLanguages }) => {
        Object.keys(roomLanguages).forEach(roomId => {
            if (!roomLanguagesObj[roomId]) { // Check if roomid doesn't exist in roomLanguagesObj
                roomLanguagesObj[roomId] = roomLanguages[roomId]; // Add roomid and its language to roomLanguagesObj
                console.log(`Added room ${roomId} to roomLanguagesObj with language ${roomLanguages[roomId].language}`);
            } else {
                console.log(`Room ${roomId} already exists in roomLanguagesObj. Skipping update.`);
            }
        });

        console.log("Updated roomLanguagesObj:", roomLanguagesObj);

    });

    socket.on('languageRetrieval', ({ roomLanguages }) => {
        Object.keys(roomLanguages).forEach(roomId => {
            const { language } = roomLanguages[roomId];
            console.log(`Room ID: ${roomId}, Language: ${language}`);
        });

    });


    socket.on('languageChange', ({ language_ }) => {

        console.log("NOT CHANGING TO THIS: ", language_)
        const user = getUser(socket.id)
        const roomid = user?.room;
        console.log("check: ", roomLanguagesObj[roomid]);
        if (roomLanguagesObj[roomid]) {
            const { language } = roomLanguagesObj[roomid];
            console.log("ROOM ALREADY EXISTS HEHE. SEE THIS: ", language)
            console.log("Now changing the language of user: ", language);
            io.to(roomid).emit("languageChange", { language_: language });
        }
    });



    /**
 * Displaying Input and Output
 */


    socket.on('InputField', ({ InputText }) => {

        console.log("data:", { InputText });
        Server_InputText = InputText;

        const user = (getUser(socket.id));
        if (user && user.room) {
            roomInputText[user.room] = InputText;
            socket.broadcast.to(user.room).emit("InputField", { InputText });
        }
    })

    socket.on('OutputField', ({ OutputText }) => {

        console.log("data on output", OutputText);

        const user = getUser(socket.id);
        if (user && user.room) {
            roomOutputText[user.room] = OutputText;
            socket.broadcast.to(user.room).emit("OutputField", { OutputText });
        }
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

