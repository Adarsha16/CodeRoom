import { React, useState, useEffect, useRef } from "react";
import Button from "../Button.jsx";
import { io } from "socket.io-client"
import '../../App.css';



const socket = io.connect("http://localhost:5001");

function Chat() {


    const msgRef = useRef();
    const [message, setMessage] = useState("");


    /**
     * It send message to server 
     * @param {event} e 
     */
    const handleSubmit = (e) => {

        e.preventDefault();
        socket.emit("message", message);
        setMessage("");

    };

    /**
     * It append child to the ul
     * @param {Message} msg 
     */
    const appendMessage = (msg) => {

        const node = document.createElement('li');
        node.textContent = msg;
        msgRef.current.appendChild(node)

    };


    useEffect(() => {

        console.log("Mounted chat");

        socket.on("message", (data) => {

            const { user, text } = data;

            if (!text) {

                console.log("No text to show msg")
                return;
            }

            const Message = `${user} : ${text}`;
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