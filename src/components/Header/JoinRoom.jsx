import React from "react";
import Button from "../Button";

function JoinRoom() {
    return (
        <>
            <Button
                type={'button'}
                custom_class={'bg-white text-black rounded-md px-4 py-1'}
                buttonLabel={'Join Room'}
            />
        </>
    );
};

export default JoinRoom;