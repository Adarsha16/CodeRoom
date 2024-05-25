import React from 'react'
import Button from '../Button.jsx'
import { useNavigate } from 'react-router-dom'
import Setting from '../Header/Setting.jsx';
function Header() {
    const navigate = useNavigate();
    return (

        <div className={`w-full h-24 bg-tertiary text-customWhite flex justify-between items-center`}>

            {/* Left */}
            <div className='flex flex-row gap-10 mx-5'>
                {/* Logo */}
                <div >
                    CodeRoomLogo

                </div>


                {/* Dynamic Login / Show Github */}

                <Button
                    custom_class='w-40 py-2.5 rounded-md bg-primary text-white'
                    buttonLabel={"Login"}
                    handleClick={() => { navigate('/login') }}
                />


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