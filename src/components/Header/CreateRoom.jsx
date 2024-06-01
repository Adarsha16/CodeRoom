import React from "react"
import Button from "../Button";

function CreateRoom() {
    return (
        <>
            <Button
                type={'button'}
                custom_class={'bg-primary text-white rounded-md px-4 py-1'}
                buttonLabel={'Create Room'}
            />
        </>);
};

export default CreateRoom;