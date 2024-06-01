import { React, useState } from "react"
import Button from "../Button";


function CreateRoom({
    handleClick

}) {




    return (

        <Button
            type={'button'}
            custom_class={'bg-primary text-white rounded-md px-4 py-3'}
            buttonLabel={'Create Room'}
            handleClick={handleClick}

        />

    );
};

export default CreateRoom;