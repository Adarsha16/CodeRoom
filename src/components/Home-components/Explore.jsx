import React from 'react'
import Chat from './Chat'
import { useSelector } from 'react-redux'
function Explore({ _grid = "" }) {

    const loginStatus = useSelector(state => state.auth.loginStatus);
    const roomStatus = useSelector(state => state.room.roomStatus);
    return (

        <div className={`text-customWhite bg-tertiary ${_grid} relative`}>


            <div className='flex flex-col  w-full box-border '>

                {/* Head line */}
                <div
                    className='px-6 h-10 border-[2px]  border-r-0 flex items-center border-brown  font-bold '
                >
                    Explorer
                </div>


                {/* Chat */}
                {loginStatus ? (roomStatus ? <Chat /> : "") : ""}

            </div >

        </div>

    )
}

export default Explore