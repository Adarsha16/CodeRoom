import { React, useState } from "react";
import Dropdown from "../Assets/dropdown.jsx"


function Chat() {
    const [displayChat, setdisplayChat] = useState(false);
    return (
        <>
            {/*for navbar*/}
            < div className="flex border-solid border-primary px-8 py-1 items-center rounded-md bg-primary" >
                Chat
                <Dropdown />
            </div >
            {/*for chat body*/}
            <div >
                <input type="text" placeholder="Start a conversation" className="w-full rounded-md px-4 py-1 mt-44" />
            </div>
        </>
    )
}
export default Chat;