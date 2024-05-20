import React from 'react'
import Inputfield from '../components/Header/Inputfield.jsx'
import Login_right from '../components/Assets/Login_right.jpg'
import Button from '../components/Home-components/Button.jsx'


function Login() {

  return (
    <div className='w-full h-full flex'>

      {/**************************************left part/////////////////////////// */}


      <div className='flex flex-col  w-1/2 bg-cyan h-full justify-center items-center '>

        {/**Info and Headline */}
        <div className='flex flex-col gap-1.5 mb-4 items-center text-white'>

          <h1 className='fira-sans-bold text-5xl mb-4 '>Code Room</h1>
          <h5 className=' text-2xl '>Welcome to Coders Hub</h5>
          <p className=''>Please sign in to create a room </p>

        </div>

        {/**Input filed */}

        <div className='flex flex-col'>



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

          <Button
            buttonLabel={"Login"}
            custom_class=' bg-primary py-3 w-80 text-white mt-4 hover:bg-green_hover  rounded-sm'
          />




          <p className='mt-10 text-white'>
            Don't have an account?
            <a className='ml-4 text-blue-500 underline font-semibold' href='/signup'>
              Register here!
            </a>
          </p>
        </div>


        {/* left div end */}
      </div>




      {/* Right part */}
      <div className='flex justify-center items-center w-1/2 fixed right-0'>

        <img src={Login_right} alt='Side Login panel' className='' />

      </div>

    </div >

  )
}

export default Login