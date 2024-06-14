import React from 'react'
import Chat from './Chat'
import { useSelector } from 'react-redux'
function Explore({ _grid = "" }) {

    const loginStatus = useSelector(state => state.auth.loginStatus)
    const roomStatus = useSelector(state => state.room.roomStatus)
    return (

        <div className={`text-customWhite bg-tertiary ${_grid} relative`}>


            <div className='flex flex-col  w-full box-border '>

                {/* Head line */}
                <div
                    className='px-5 h-10 border-[2px] mb-0 pt-1  border-r-0 flex items-center border-brown  font-bold '
                >
                    Chat Room

                    
                </div>



                {/* Chat */}

                {
                    !loginStatus
                        ?
                        <>
                        <div className='absolute top-80 items-center text-explore-text text-wrap'>
                            <p className='mt-0 text-sm'><center><em>Login or Sign up to start creating rooms 
                             and collaborate with other people......</em></center>

                            </p>
                        </div>
                        </>
                        :

                        !roomStatus ? "" : <Chat />
                }

            </div >

        </div>

    )
}

export default Explore