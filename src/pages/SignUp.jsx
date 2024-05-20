import React from 'react'
import Inputfield from '../components/Header/Inputfield.jsx'
import signupImage from '../components/Assets/signUpImage.jpg'
import Button from '../components/Home-components/Button.jsx'

function SignUp() {

  return (
    <div className='w-full h-full flex'>

      {/**************************************left part/////////////////////////// */}


      <div className='flex flex-col  w-1/2 bg-signup h-full justify-center items-center '>

        {/**Info and Headline */}
        <div className='flex flex-col gap-1.5 mb-4 items-center text-white'>

          <h1 className='fira-sans-bold text-5xl mb-4 '>Code Room</h1>
          <h5 className=' text-md '>Create an account to continue</h5>


        </div>

        {/**Input filed */}

        <div className='flex flex-col'>


          {/*name field*/}
          <Inputfield

            input_type={'text'}
            customcss={' '}
            custom_placeholder={'Name'}
            inputId={'input_name'}
            inputName={'input_name'}

          />


          {/*Email field*/}
          <Inputfield

            input_type={'text'}
            customcss={' '}
            custom_placeholder={'Email'}
            inputId={'input_useremail'}
            inputName={'input_useremail'}
          />


          {/*github field*/}
          <Inputfield

            input_type={'text'}
            customcss={' '}
            custom_placeholder={'Github'}
            inputId={'input_github'}
            inputName={'input_github'}

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
            buttonLabel={"Sign up"}
            custom_class='py-3 w-80 rounded-sm bg-signupBTN text-white item-center mt-4 font-semibold hover:bg-blue_hover  rounded-sm'
          />




          <p className='mt-10 text-white'>
            Already have an account?
            <a className='ml-4 text-blue-500 underline font-semibold' href='/login'>
              Login here!
            </a>
          </p>


        </div>


        {/* left div end */}
      </div>




      {/* Right part */}
      <div className='flex justify-center items-center w-1/2 fixed right-0'>

        <img src={signupImage} alt='Side Login panel' className='' />

      </div>

    </div >

  )
}

export default SignUp