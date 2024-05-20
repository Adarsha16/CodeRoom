import React from 'react'
import Inputfield from '../components/Header/Inputfield.jsx'
import Login_right from '../components/Assets/Login_right.jpg'
import Button from '../components/Home-components/Button.jsx'
import { useNavigate } from 'react-router-dom'

function Login() {
  let navigate = useNavigate();
  return (
    <>
      <div className='relative flex justify-center items-center fira-sans-bold h-[calc(100vh-6rem)]'
      >
        {/**container */}
        <div className='absolute inset-y-0 left-0 px-10 py-24 w-1/2 flex flex-col items-start m-t-25 bg-cyan'>

          {/**left part */}


          {/**Info and Headline */}
          <div className='flex flex-col gap-1.5 mb-4 fira-sans-regular'>

            <h1 className='fira-sans-medium text-6xl mb-4 text-black'>Code Room</h1>

            <h5 className=' text-3xl text-brown'>Welcome to Coders Hub</h5>

            <p className='text-brown'>Please sign in to create a room and continue this journey even better</p>

            {/**Input filed */}
            <div className='flex flex-col w-full'>

              {/*Email field*/}
              <Inputfield

                input_type={'text'}
                customcss={' '}
                custom_placeholder={'Email'}
                inputId={'input_useremail'}
                inputName={'input_useremail'}
              />


              {/*password field*/}
              <Inputfield

                input_type={'password'}
                customcss={' '}
                custom_placeholder={'Password'}
                inputId={'input_password'}
                inputName={'input_password'}

              />
              <div className='ml-2 mt-2'>
                <Button buttonLabel={"Login"} bgColor={'bg-primary'} paddingX={10} paddingY={2} round={'rounded-md'} />

              </div>
              <div className='mx-2 mt-1'>
                <p>Don't have an account?<a className='ml-4 text-blue-500 underline' href='/signup'>Register here!</a></p>
              </div>
            </div>

          </div>
          {/**Right Part */}

        </div>
        <div className='absolute inset-y-0 right-0 w-1/2 '>
          <img src={Login_right} alt='Side Login panel' className='h-[calc(100vh-6rem)]' />
        </div>

      </div >

    </>
  )
}

export default Login