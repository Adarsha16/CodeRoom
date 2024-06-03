import { React, useState } from 'react'
import Chat from './Chat'

function Explore() {
    const [toggleExplorer, setToggleExplorer] = useState(true);
    return (
        toggleExplorer ? (
            <div className='relative w-72 text-customWhite bg-tertiary' >
                <div
                    className='px-2 h-10 border-[2px]  border-r-0 gap-1 border-brown flex items-center font-bold'
                >
                    <button type='button'
                        onClick={() => setToggleExplorer(!toggleExplorer)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="24px" viewBox="0 0 24 24"><path fill="currentColor" d="M4 7a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m0 5a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m0 5a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1" /></svg>
                    </button>
                    Explorer
                </div>
                <div>
                    <Chat />
                </div>
            </div >
        ) :
            (
                <div className='relative bg-tertiary' >
                    <div
                        className='px-2 h-10 border-[2px] border-r-0 border-brown flex items-center text-white'
                    >
                        <button type='button'
                            onClick={() => setToggleExplorer(!toggleExplorer)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="24px" viewBox="0 0 24 24"><path fill="currentColor" d="M4 7a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m0 5a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m0 5a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1" /></svg>
                        </button>
                    </div>
                </div>
            )

    );
}

export default Explore