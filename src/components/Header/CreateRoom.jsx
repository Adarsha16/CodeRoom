import { React, useState } from "react"
import Button from "../Button";


function CreateRoom() {

    const [displayButton, setDisplayButton] = useState(true);

    const handleClick = () => {
        setDisplayButton(!displayButton);
    }
    return (
        <>
            {displayButton ? (<Button
                type={'button'}
                custom_class={'bg-primary text-white rounded-md px-4 py-1'}
                buttonLabel={'Create Room'}
                handleClick={handleClick}
            />) : (<div className="m-1 gap-1">
                <input type="text" placeholder="Enter room code" className="w-40 h-8 rounded-md gap-1 bg-brown focus:outline-none" />
                <Button
                    type={'button'}
                    custom_class={'bg-primary text-white rounded-md px-4 py-1'}
                    buttonLabel={'Create'}
                />
            </div>)}
        </>);
};

export default CreateRoom;