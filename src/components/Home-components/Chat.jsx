import { React, useState, useEffect } from "react";
import Button from "../Button.jsx";
import { io } from "socket.io-client"
import '../../App.css';



const socket = io.connect("http://localhost:5002");

function Chat() {
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit("send_message", message);
        setMessage("")
    }


    // const joinRoom = () => {
    //     socket.emit("join_room", room);
    // }


    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageReceived(prev_message => [...prev_message, data]);
        });

    }, []);




    return (
        <div className=" flex flex-col m-0 fixed bottom-0 w-full">

            {/* Info about the Room */}
            <div className="relative p-5 flex flex-col text-primary w-max border-y-[1px] border-brown rounded-xl" >

                <Button
                    custom_class={'absolute right-0 top-2 text-slate-400'}
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
            <div id="message_container" className="text-slate-400 h-52 text-sm font-normal overflow-scroll mt-1 px-2 hide-scrollbar text-wrap">
                {
                    messageReceived.length === 0
                        ?
                        (
                            <p>No messages yet</p>
                        )
                        :
                        (
                            messageReceived.map((msg, index) => (
                                <p key={index}>Person: {msg}</p>

                            ))
                        )
                }

            </div>


            {/* Input Type Message Container */}
            <div className="">

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