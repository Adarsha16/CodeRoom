import React from 'react'
import Inputfield from '../components/Header/Inputfield.jsx'


function Login() {
  return (
    <div

      className='h-full flex justify-center items-center fira-sans-bold'
    >




      {/**container */}
      <div className='h-full px-10 py-24 border rounded-md bg-primary bg-opacity-5 border-brown flex flex-col justify-center align-middle  items-center'>

        {/**left part */}
        <div className='block'>

          {/**Info and Headline */}
          <div className='flex flex-col gap-1.5 mb-4 fira-sans-regular'>

            <h1 className='fira-sans-medium text-6xl mb-4'>Code Room</h1>

            <h5 className=' text-3xl'>Welcome to Coders Hub</h5>
            <p className='text-brown'>Please sign in to create a room and continue this journey even better</p>

          </div>


          {/**Input filed */}
          <div className='flex flex-col w-full'>

            {/*Email field*/}
            <Inputfield

              input_type={'text'}
              customcss={' '}
              custom_placeholder={'Email'}
              inputId={'input_username'}
              inputName={'input_username'}
            />


            {/*password field*/}
            <Inputfield

              input_type={'password'}
              customcss={' '}
              custom_placeholder={'Password'}
              inputId={'input_password'}
              inputName={'input_password'}

            />


          </div>

        </div>



        {/**Right Part */}

        <div>

          <h1>Images here</h1>
        </div>




      </div>

    </div>
  )
}

export default Login