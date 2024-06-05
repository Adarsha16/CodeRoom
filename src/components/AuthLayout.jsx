import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



const Protected = ({ children, authentication = true }) => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const loginStatus = useSelector(state => state.auth.loginStatus);
    console.log("login", loginStatus);

    useEffect(() => {

        if (authentication && loginStatus !== authentication) {

            navigate("/login");
        }
        else if (!authentication && loginStatus !== authentication) {

            navigate("/")
        }

        setLoading(false)



    }, [loginStatus, navigate, authentication])

    return loading ? <h1>Loading...</h1> : <>{children}</>;
}

export default Protected