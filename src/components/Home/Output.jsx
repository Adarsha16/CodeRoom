
import React from 'react'

function Output() {


    return (
        <div className=' col-start-4 col-end-6 text-customWhite bg-secondary'>

            <div
                className='px-6 h-10 border-[2px]  border-brown flex items-center font-bold'
            >
                Output
            </div>

            <div>

                <textarea id="input" name="inputbox" className=' border-[2px] border-t-0  border-brown w-full h-[calc(100vh-96px)] outline-none bg-secondary resize-none overflow-auto scroll-m-0 p-4' disabled >

                </textarea>

            </div>





        </div >
    )
}

export default Output


