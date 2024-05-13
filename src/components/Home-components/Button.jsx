import React from "react";
import { useState } from "react";

export default function Button({ buttonLabel, handleClick, bgColor, round }) {
    const [loginState, setLoginState] = useState(true);


    return (
        <>
            <button type="button" className={`px-8 py-1 ${bgColor} ${round}  hover:bg-hover`} onClick={handleClick}>{buttonLabel}</button>
        </>
    )
}