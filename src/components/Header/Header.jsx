import React from 'react'

export default function Header() {
    return (

        <div className={`w-full h-24 bg-tertiary text-customWhite flex justify-between  items-center `}>

            {/* Left */}
            <div className='flex flex-row gap-10 mx-5'>

                {/* Logo */}
                <div >
                    CodeRoomLogo

                </div>


                {/* Dynamic Login / Show Github */}
                <div >
                    Dynamic Login
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
