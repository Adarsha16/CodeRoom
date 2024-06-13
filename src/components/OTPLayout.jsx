import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const OTPLayout = ({ children }) => {

    const signupStatus = useSelector(state => state.auth.signupStatus);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {

        if (signupStatus === false) {

            navigate("/");
            return;

        }

        setLoading(false)
    }, [signupStatus, navigate])

    return loading ? <h1>Loading...</h1> : <>{children}</>
}

export default OTPLayout