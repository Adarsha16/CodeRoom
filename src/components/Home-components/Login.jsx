import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginButton() {
    const [loginState, setLoginState] = useState(true);
    const navigate = useNavigate();

    return (
        <>
            <div className="border-solid bg-primary rounded-md hover:bg-hover">
                <button type="button" className="px-8 py-1" onClick={() => { navigate("/login") }}>Login</button>
            </div>
        </>
    )
}