import React from "react"
import Button from "./Button"
import Input from "./Inputfield"
import OTP_pic from './Assets/OTP_code.jpg'

export default function OTP() {
    const onSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <>
            <div className='w-full h-full flex'>

                {/**************************************left part/////////////////////////// */}
                <div className='flex flex-col  w-1/2 bg-Otp-page-color h-full justify-center items-center '>

                    {/**Info and Headline */}
                    <div className='flex flex-col gap-1.5 mb-4 items-center text-white'>

                        <h1 className='fira-sans-bold text-5xl mb-4 '>Code Room</h1>
                        <h5 className=' text-2xl '>Verify your email</h5>
                        <p>Check your email for OTP code</p>

                    </div>

                    <form onSubmit={onSubmit}>
                        {/**Input filed */}

                        <div className='flex flex-col'>

                            {/*Email field*/}
                            <Input

                                type={'text'}
                                custom_placeholder={'OTP Code Here'}
                                name={'OTP'}
                            />
                            <Button
                                type={"submit"}
                                buttonLabel={"Enter OTP"}
                                custom_class=' bg-otp-button py-3 w-80 text-white mt-4 hover:bg-otp-hover  rounded-sm focus:ring'
                            />
                        </div>
                    </form>
                </div>  {/* left div end */}

                {/**************************************Right part/////////////////////////// */}
                <div className='flex justify-center items-center w-1/2 fixed right-0'>

                    <img src={OTP_pic} alt='Side Login panel' />


                    {

                        <div className='absolute -bottom-10 border-2 text-green p-2 m-0 font-bold shadow-md'>

                        </div>
                    }

                </div>

            </div >
        </>

    )
}