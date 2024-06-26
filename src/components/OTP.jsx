import React, { useEffect, useState } from "react"
import Button from "./Button"
import Input from "./Inputfield"
import OTP_pic from './Assets/OTP_code.jpg'
import { useNavigate, useLocation } from "react-router-dom";
import callOTPandRegister from "../custom_fn/callOTPandRegister";


export default function OTP() {

    const navigate = useNavigate();
    const [userOtp, setUserOtp] = useState("");
    const [FormErrors, setFormErrors] = useState();
    const [Info, setInfo] = useState("");


    const Location = useLocation();
    const User_data = Location.state?.values;


    const handleChanges = (e) => {
        setUserOtp(e.target.value);
    }


    const handleSubmitOTP = async (e) => {
        e.preventDefault();

        if (!userOtp) {

            setFormErrors("Empty Field : This is required!")
            console.log("No otp entered");
            return;
        }



        User_data.otp = userOtp.trim();
        console.log(User_data);

        if (!User_data) {
            setFormErrors("Please Register First!")
            console.log("cannot request to the server")
            return;
        }
        const response = await callOTPandRegister(User_data);
        const result = await response?.json();

        console.log(result)


        if (!response?.ok) {

            console.log("No response", response.statusText)
            setFormErrors(`Error :  ${result.error}`)
            return;
        }





        console.log(response);
        console.log("result", result)

        setInfo("Redirecting to Login...");

        setTimeout(() => {
            navigate("/login");
        }, 1700);


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

                    <form onSubmit={handleSubmitOTP}>
                        {/**Input filed */}

                        <div className='flex flex-col'>

                            {/*Email field*/}
                            <Input

                                type={'number'}
                                custom_placeholder={'OTP Code Here : 0000'}
                                name={'OTP'}
                                value={userOtp}
                                handleChanges={handleChanges}
                            // onChange={(e) => setUserOtp(e.target.value)}
                            />


                            {FormErrors && <p className='error text-sm/[15px]'>{FormErrors}</p>}



                            <Button
                                type={"submit"}
                                buttonLabel={"Confirm"}
                                custom_class=' bg-otp-button py-3 w-80 text-white mt-4 hover:bg-otp-hover  rounded-sm focus:ring'
                            />
                        </div>
                    </form>
                </div>  {/* left div end */}

                {/**************************************Right part/////////////////////////// */}
                <div className='flex justify-center items-center w-1/2 fixed right-0 '>

                    <img src={OTP_pic} alt='Side Login panel' className="w-[80%]" />


                    {Info && (
                        <div className='absolute -bottom-10 border-2 text-green p-2 m-0 font-bold shadow-md'>
                            <p>{Info}</p>
                        </div>
                    )}

                </div>

            </div >
        </>

    )
}