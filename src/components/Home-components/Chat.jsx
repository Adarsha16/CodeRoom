import React from "react";
import Button from "../Button.jsx";


function Chat() {

    const handleSubmit = (e) => {
        e.preventDefault();
        {/*Implement Chat logic*/ }

    }

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

                </div>
                {/*for chat main body */}
                <div id="message_container">

                </div>

                {/*for chat input*/}
                <div className="mt-48">
                    <form id="send_container" onSubmit={handleSubmit}>
                        <input type="text" placeholder="Start a conversation" className=" rounded-md h-10 bg-brown" id='message' />
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