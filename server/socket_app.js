
import { Server } from "socket.io";


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

        console.log(`User connected : `, socket.id);
        // socket.emit('message', BuildMsg(ADMIN, ' Welcome to the club'));


        /**
         * On Entering the Room
         */
        socket.on("enterroom", ({ username = "user", roomid }) => {
            console.log("room", username, roomid);

            ///Check if prev room is present;
            const prevRoom = getUser(socket.id)?.room;
            if (prevRoom) {

                socket.leave(prevRoom);
                io.to(prevRoom).emit('message', BuildMsg(ADMIN, `${username} has left the room`))
            }

            // Activate User
            const user = ActivateUser(socket.id, username, roomid);

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

            console.log(username, text)

            console.log(socket.id)
            const room = getUser(socket.id)?.room;
            console.log(room)

            io.to(room).emit("message", BuildMsg(username, text))

        })


        /**
         * When room not assigned
         * 
         */

        socket.on("notAssigned", (msg) => {

            socket.emit("notAssigned", msg)

        })



    });



};


function BuildMsg(username, text) {

    return {
        username,
        text
    }
}



function getUser(id) {

    return UserState.users.find(user => {
        console.log(user)
        return user.id === id
    })

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

