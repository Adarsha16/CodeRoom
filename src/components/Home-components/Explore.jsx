import React from 'react'
import Chat from './Chat'
function Explore({ _grid = "" }) {
    return (

        <div className={`text-customWhite bg-tertiary ${_grid}`}>


            <div className='flex flex-col'>

                {/* Head line */}
                <div
                    className='px-6 h-10 border-[2px]  border-r-0  border-brown flex items-center font-bold'
                >
                    Explorer
                </div>


                {/* Chat */}
                <Chat />


            </div >

        </div>

    )
}

export default Explore