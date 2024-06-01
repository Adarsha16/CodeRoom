import React from 'react'
import Button from '../Button.jsx'
import { useNavigate } from 'react-router-dom'
import Setting from '../Header/Setting.jsx';
import { useSelector } from 'react-redux';
// import { authReducer } from "../../store/authSlice.js"

function Header() {
    const navigate = useNavigate();
    const loginStatus = useSelector(state => state.auth.loginStatus);
    return (

        <div className={`w-full h-24 bg-tertiary text-customWhite flex justify-between items-center`}>

            {/* Left */}
            <div className='flex flex-row gap-10 mx-5'>
                {/* Logo */}
                <div
                    className='font-black cursor-pointer'
                    onClick={() => {
                        navigate("/")
                    }}>
                    Code Room

                </div>


                {/* Dynamic Login / Show Github */}
                {loginStatus ? "" :
                    <Button
                        custom_class='w-40 py-2.5 rounded-md bg-primary text-white'
                        buttonLabel={"Login"}
                        handleClick={() => { navigate('/login') }}
                    />}



            </div>



            {/* Right */}

            <div className='flex flex-row gap-10 mx-5'>


                {/* Dynamic Room / if logged in*/}
                <div >

                    Dynamic Room
                </div>


                {/* setting */}
                <div >

                    <Setting />
                </div>


            </div>





        </div>
    )
}

export default Header