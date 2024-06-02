import { React, useState, useEffect } from "react";
import Button from "../Button.jsx";
import { io } from "socket.io-client"


const socket = io.connect("http://localhost:5002");
function Chat() {

    //const [room, setRoom] = useState("");
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit("send_message", message);
    }

    {/* const joinRoom = () => {
        socket.emit("join_room", room);
    }
*/}

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageReceived(prev_message => [...prev_message, data]);
        });

    }, []);



    return (
        <>
            <div className='absolute bottom-0 h-4/6 rounded-md border border-brown w-full'>
                {/*for general display elements*/}
                < div className="px-8 pb-2  text-primary w-full border-b-[1px] border-brown rounded-xl" >

                    {/* Cross Button */}
                    <Button
                        custom_class={'pl-56 text-brown'}
                        buttonLabel={
                            <svg xmlns="http://www.w3.org/2000/svg"
                                width="24px"
                                height="16px"
                                viewBox="0 0 16 16">
                                <path fill="currentColor" d="M7.293 8L3.146 3.854a.5.5 0 1 1 .708-.708L8 7.293l4.146-4.147a.5.5 0 0 1 .708.708L8.707 8l4.147 4.146a.5.5 0 0 1-.708.708L8 8.707l-4.146 4.147a.5.5 0 0 1-.708-.708z" />
                            </svg>
                        } />

                    <p className="text-3xl font-semibold">Room</p>
                    <p className="text-white">Coding Pratice #4111fop</p>
                    <p>Profile pics here</p>



                </div>

                {/*for chat main body */}

                <div id="message_container" className="h-full overflow-scroll mt-3 px-3 text-slate-400 text-sm">

                    {messageReceived.length === 0 ? (
                        <p>No messages yet</p>
                    ) : (
                        messageReceived.map((msg, index) => (
                            <p key={index}>Person: {msg}</p>
                        ))
                    )}

                </div>

                {/*for chat input*/}
                <div className="fixed w-full bottom-0 p-0 m-0 flex items-center">

                    <form id="send_container" onSubmit={handleSubmit} name="message_form" className="flex justify-center items-center">

                        <input
                            type="text"
                            placeholder="Start a conversation"
                            className="p-5 h-10 w-full bg-brown border-none outline-none"
                            id='message'

                            onChange={(e) => {
                                e.preventDefault();
                                setMessage(e.target.value);
                            }

                            } />
                        <Button
                            custom_class={'bg-primary w-1/6 h-10'}
                            type={"Submit"}
                            buttonLabel={'^'}
                            id={"send_button"}
                        />



                    </form>
                </div>
            </div>

        </>
    )
}
export default Chat;