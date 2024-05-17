import React from 'react'
import Button from '../Home-components/Button'
import { useNavigate } from 'react-router-dom'
function Header() {
    const navigate = useNavigate();
    return (

        <div className={`w-full h-24 bg-tertiary text-customWhite flex justify-between  items-center`}>

            {/* Left */}
            <div className='flex flex-row gap-10 mx-5'>

                {/* Logo */}
                <div >
                    CodeRoomLogo

                </div>


                {/* Dynamic Login / Show Github */}
                <div >
                    <Button buttonLabel={"Login"} handleClick={() => { navigate('/login') }} bgColor={'bg-primary'} round={'rounded-md'} />
                </div>

            </div>



            {/* Right */}

            <div className='flex flex-row gap-10 mx-5'>


                {/* Dynamic Room / if logged in*/}
                <div >

                    Dynamic Room
                </div>


                {/* setting */}
                <div >

                    setting
                </div>


            </div>





        </div>
    )
}

export default Header