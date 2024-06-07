// import { socketAuth } from "../middlewares/socketAuth.js";
// import { socket_app } from "../socket_app.js";
// import express from 'express'
// const sapp = express()
// // import { call_io } from "../app.js";

// const room = (req, res) => {

//     const PORT = process.env.PORT || 5001;
//     const sappServer = sapp.listen(PORT);


//     try {

//         const io = new Server(sappServer, {

//             path: "/api/room",
// // 
//             cors: {
//                 origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:5173", "http://127.0.0.1:5173"]
//             }
//         });

//         io.use(socketAuth);



//         // let io = call_io()
//         console.log("controller io", io.id)
//         socket_app(io)


//         // //To be implimented........
//         // const { username, email, github } = req.user;
//         // res.status(200).json({ "User Data": `Room is now available to ${username} ( ${email} ) with ${github}` })

//     } catch (error) {

//         console.log(error);

//     }
// }

// export { room }