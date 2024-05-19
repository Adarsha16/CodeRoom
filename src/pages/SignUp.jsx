import React from 'react'
import Inputfield from '../components/Header/Inputfield.jsx'
import signupImage from '../components/Assets/signUpImage.jpg'
import Button from '../components/Home-components/Button.jsx'

function SignUp() {
  return (
    <>
      <div className='relative flex justify-center items-center fira-sans-bold '
      >
        {/**container */}
        <div className='absolute inset-y-0 left-0 px-10 py-24 w-1/2 flex flex-col items-start m-t-25 bg-cyan h-screen'>

          {/**left part */}


          {/**Info and Headline */}
          <div className='flex flex-col gap-1.5 mb-4 fira-sans-regular'>

            <h1 className='fira-sans-medium text-6xl mb-4'>Code Room</h1>

            <h5 className=' text-3xl'>Welcome to Coders Hub</h5>
            <p className='text-brown'>Please sign in to create a room and continue this journey even better</p>




            {/**Input filed */}
            <div className='flex flex-col w-full'>

              {/*Name*/}
              <Inputfield

                input_type={'text'}
                customcss={' '}
                custom_placeholder={'Name'}
                inputId={'input_username'}
                inputName={'input_username'}
              />
              {/*Github*/}
              <Inputfield

                input_type={'text'}
                customcss={' '}
                custom_placeholder={'Github'}
                inputId={'input_github'}
                inputName={'input_github'}
              />
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
              <div className='ml-20'>
                <Button buttonLabel={"Login"} bgColor={'bg-primary'} round={'rounded-md'} />
              </div>

            </div>

          </div>
          {/**Right Part */}

        </div>
        <div className='absolute inset-y-0 right-0 w-1/2 '>
          <img src={signupImage} alt='Side Login panel' />
        </div>

      </div>

    </>
  )
}

export default SignUp