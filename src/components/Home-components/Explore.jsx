import React from 'react'
import Chat from './Chat'
function Explore() {
    return (

        <div className='relative w-72 text-customWhite bg-tertiary'>

            <div
                className='px-6 h-10 border-[2px]  border-r-0  border-brown flex items-center font-bold'
            >
                Explorer
            </div>
            <div className='fle'>
            <Chat />
            </div>

        </div >

    )
}

export default Explore