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
            <div className='absolute bottom-0 h-96 rounded-md border border-brown w-full'>
                {/*for general display elements*/}
                < div className="px-8 pt-1  text-primary w-full " >
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
                    {/* <input placeholder="room" onChange={(e) => {
                        setRoom(e.target.value);
                    }} />
                    <button onClick={joinRoom}>Room</button>
                */}



                </div>

                {/*for chat main body */}

                <div id="message_container" className="h-44 overflow-scroll">
                    {messageReceived.length === 0 ? (
                        <p>No messages yet</p>
                    ) : (
                        messageReceived.map((msg, index) => (
                            <p key={index} className="mt-1 px-8">Person: {msg}</p>
                        ))
                    )}
                </div>

                {/*for chat input*/}
                <div className="absolute bottom-0 h-20">
                    <form id="send_container" onSubmit={handleSubmit} name="message_form">
                        <input type="text"
                            placeholder="Start a conversation"
                            className=" rounded-md h-10 bg-brown"
                            id='message'
                            onChange={(e) => {
                                e.preventDefault();
                                setMessage(e.target.value);
                            }
                            } />
                        <Button
                            custom_class={'bg-primary rounded-md h-10 w-20 ml-1.5'}
                            type={"Submit"}
                            buttonLabel={'Send'}
                            id={"send_button"}
                        />
                    </form>
                </div>
            </div>

        </>
    )
}
export default Chat;