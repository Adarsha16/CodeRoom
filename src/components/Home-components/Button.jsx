import React from "react";
import { useState } from "react";

export default function Button({ buttonLabel, handleClick, bgColor, round, paddingX, paddingY, width }) {
    const [loginState, setLoginState] = useState(true);


    return (
        <>
            <button type="button" className={`px-${paddingX} w-${width} py-${paddingY} ${bgColor} ${round}  hover:bg-hover`} onClick={handleClick}>{buttonLabel}</button>
        </>
    )
}