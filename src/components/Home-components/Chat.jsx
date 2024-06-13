import { React, useState, useEffect, useRef } from "react";
import Button from "../Button.jsx";
import { io } from "socket.io-client"
import '../../App.css';
import { useDispatch, useSelector } from "react-redux";
import { leaveRoom } from "../../store/roomSlice.js";


let socket;
function Chat() {

    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const roomStatus = useSelector(state => state.room.roomStatus);
    const roomData = useSelector(state => state.room.roomData);

    const userData = useSelector(state => state.auth.userData);
    const token = useSelector(state => state.auth.token);


    const [closing, setclosing] = useState(false); // for chat button closing

    const msgRef = useRef("");
    const [message, setMessage] = useState("");

    useEffect(() => {

        if (!token) {
            console.log("No token present")
            return;
        }

        socket = io("http://localhost:5001", {
            path: "/api/room",
            auth: {
                token: `${token}`
            },
            transports: ["websocket"],
            reconnectionDelayMax: 10000,
            'force new connection': true,
            reconnectionAttempts: 'infinity',
            autoConnect: true
        });

        setLoading(false);

    }, [token])



    /**
     * It send message to server 
     * @param {event} e 
     */
    const handleSubmit = (e) => {

        e.preventDefault();

        // if (!roomData.roomid) {
        //     socket.emit("notAssigned", "Please Join or Create Room first");
        //     return;
        // }

        console.log(message)


        const data = {
            username: userData.username,
            text: message
        }

        socket.emit("message", data);
        setMessage("");

    };

    /**
     * It append child to the ul
     * @param {message} msg 
     */
    const appendMessage = (msg) => {

        const node = document.createElement('li');
        node.classList.add("msg_li");
        node.textContent = msg;
        msgRef?.current?.appendChild(node)

    };


    /**
     * Handle Click on Cross Button , Leave Room
     */

    const handleClick = (e) => {
        e.preventDefault();
        setclosing(true);
    }

    const HandleLeaveRoomClick = (e) => {
        e.preventDefault();

        // If user click not to leave
        if (e.target.id == "No") {


            setclosing(false);
            return;
        }

        // If user click yes to leave
        setclosing(false);
        dispatch(leaveRoom());
        socket.emit("unsubscribe", roomData.roomid)
        // window.location.reload();

    }



    /**
     * Enter room event, send room status to server
     */
    useEffect(() => {



        if (!roomStatus || !roomData) {

            console.log("Room status false", roomStatus);
            return;
        }

        const { roomid } = roomData;
        // console.log("room status chat", roomData)

        const { username } = userData;

        console.log("chat", username, roomid)

        socket.emit("enterroom",
            {
                username,
                roomid
            }
        );
    }, [roomStatus]);


    /**
     * It runs on every mount and listen for message event from server
     */
    useEffect(() => {

        socket.on('forcedisconnect', (data) => {
            appendMessage(data);
            socket.disconnect()
            return;
        }
        );


        socket.on("message", (data) => {

            console.log("Mounted chat");
            const { username, text } = data;


            if (!text) {

                console.log("No text to show msg")
                return;
            }

            const Message = `${username} : ${text}`;
            console.log("message", Message)
            appendMessage(Message);

        });

    }, []);




    return loading ? "chat..." : (
        <div className="flex flex-col m-0 w-full box-content h-full">

            {/* Info about the Room */}
            <div className="p-5 flex flex-col text-primary  border-y-[1px] border-brown rounded-xl" >

                {/**CLosing room option, available only when room is on */}

                {
                    !roomStatus
                        ?
                        ""
                        :
                        <Button
                            custom_class={'top-2 text-slate-400 hover:scale-90 hover:text-white'}
                            buttonLabel={
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    width="24px"
                                    height="16px"
                                    viewBox="0 0 16 16">
                                    <path fill="currentColor" d="M7.293 8L3.146 3.854a.5.5 0 1 1 .708-.708L8 7.293l4.146-4.147a.5.5 0 0 1 .708.708L8.707 8l4.147 4.146a.5.5 0 0 1-.708.708L8 8.707l-4.146 4.147a.5.5 0 0 1-.708-.708z" />
                                </svg>

                            }

                            handleClick={handleClick}
                        />
                }

                <p className="text-3xl font-semibold">Room:
                    <span className="font-semibold text-white text-base">&nbsp;&nbsp;{roomData?.roomid || `no room yet!`}</span>
                </p>

                <p>Profile pics here</p>

            </div>


            {/* Message Container */}
            <div id="message_container" className="w-full text-slate-400 h-52 text-sm font-normal overflow-scroll mt-1 px-2 hide-scrollbar text-wrap">
                {
                    <ul ref={msgRef}>
                    </ul>
                }

            </div>


            {/* Input Type Message Container */}
            <div className="w-full h-full">

                <form
                    id="send_container"
                    onSubmit={handleSubmit}
                    name="message_form"
                >


                    <input
                        type="text"
                        placeholder="Start a conversation"
                        className="p-5 h-10 w-full bg-brown border-none outline-none shadow-2xl text-sm"
                        id='message'
                        value={message}


                        onChange={(e) => {
                            e.preventDefault();
                            setMessage(e.target.value);
                        }

                        } />

                </form>
            </div>





            {/*
            *
            * Pop window to ask user if they/them wants to leave the room
            */}

            {
                closing
                    ?
                    <>
                        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 "></div>

                        <div className="fixed inset-0 flex items-center justify-center z-50 text-black">

                            <div className="bg-white p-6 rounded shadow-lg w-96">
                                <h2 className="text-2xl mb-4">Are you sure?</h2>
                                <p>Click yes to leave your current room</p>
                                <button className="mt-4 px-4 py-2 bg-primary text-white rounded mr-5" onClick={HandleLeaveRoomClick} id={"Yes"}>Yes</button>
                                <button className="mt-4 px-4 py-2 bg-primary text-white rounded" onClick={HandleLeaveRoomClick} id={"No"}>No</button>
                            </div>

                        </div>
                    </>

                    : ""
            }

        </div>
    )

}
export default Chat;

export { socket }