
import React from 'react'

function Input() {

    const placeholderText = 'printf("Hello World")'


    return (
        <div className=' col-start-1 col-end-4  text-customWhite bg-secondary '>

            <div
                className='px-6 h-10 border-[2px]  border-r-0 border-brown flex items-center font-bold'
            >
                Nav Bar
            </div>


            <div className='m-0 p-0 '>

                <textarea id="input" name="inputbox" className=' border-[2px] border-t-0 border-r-0  border-brown w-full h-[calc(100vh-96px)] outline-none bg-secondary resize-none overflow-auto scroll-m-0 p-4 ' placeholder={placeholderText}>

                </textarea>
            </div>






        </div >
    )
}

export default Input