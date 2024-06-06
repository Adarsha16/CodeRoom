import { React, useState, useEffect, useRef } from "react";
import Button from "../Button.jsx";
import { io } from "socket.io-client"
import '../../App.css';
import { useDispatch, useSelector } from "react-redux";



const socket = io.connect("http://localhost:5001");

function Chat() {

    const roomStatus = useSelector(state => state.room.roomStatus);
    const roomData = useSelector(state => state.room.roomData);

    const userData = useSelector(state => state.auth.userData);
    const msgRef = useRef("");
    const [message, setMessage] = useState("");


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
        // const username = l;
        // console.log("usrname", username)

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
        msgRef?.current.appendChild(node)

    };

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

        // socket.on("notAssigned", (msg) => {

        //     // console.log(msgRef?.current);
        //     let nodes = document.getElementsByClassName("msg_li");
        //     if (nodes[0]) {
        //         msgRef?.current.removeChild(nodes[0])
        //     }
        //     appendMessage(msg);

        //     setTimeout(() => {
        //         if (nodes[0]) {
        //             msgRef?.current.removeChild(nodes[0])
        //         }
        //     }, 3000)

        //     return;

        // });

        console.log("Mounted chat");

        socket.on("message", (data) => {

            const { username, text } = data;

            if (!text) {

                console.log("No text to show msg")
                return;
            }

            const Message = `${username} : ${text}`;
            appendMessage(Message);

        });

    }, []);




    return (
        <div className="absolute  bottom-10 flex flex-col m-0 w-full box-content ">

            {/* Info about the Room */}
            <div className="relative p-5 flex flex-col text-primary  border-y-[1px] border-brown rounded-xl" >

                <Button
                    custom_class={'absolute end-0 top-2 text-slate-400'}
                    buttonLabel={
                        <svg xmlns="http://www.w3.org/2000/svg"
                            width="24px"
                            height="16px"
                            viewBox="0 0 16 16">
                            <path fill="currentColor" d="M7.293 8L3.146 3.854a.5.5 0 1 1 .708-.708L8 7.293l4.146-4.147a.5.5 0 0 1 .708.708L8.707 8l4.147 4.146a.5.5 0 0 1-.708.708L8 8.707l-4.146 4.147a.5.5 0 0 1-.708-.708z" />
                        </svg>
                    } />

                <p className="text-3xl font-semibold">Room</p>
                <p className="text-white">Coding Pratice <span className="font-bold">#4111fop</span></p>
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
            <div className="w-full">

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


        </div>
    )

}
export default Chat;