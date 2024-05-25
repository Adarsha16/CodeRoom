import React, { useEffect, useState } from 'react'
import Input from './Inputfield.jsx'
import signupImage from './Assets/signUpImage.jpg'
import Button from './Button.jsx'


function Signup() {


  async function callGithub() {
    try {

      const response = await fetch("http://localhost:5001/api/github", {
        method: "POST",
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ user_name: github })

      })
      const result = await response.json();
      return result;

    } catch (error) {
      console.log(error);
    }
  };



  async function callRegister() {

    try {

      const register = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ username, github, email, password })
      })

      const result = await register.json();

      ////IF user is already registered!
      if (register.status == 400 && result.statusText == "login") {
        console.log(register.status, result.Error)///
      }

      ////If user successfully registered
      if (register.status == 200) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div className='w-full h-full flex'>

      {/**************************************left part/////////////////////////// */}
      <div className='flex flex-col  w-1/2 bg-signup h-full justify-center items-center '>

        {/**Info and Headline */}
        <div className='flex flex-col gap-1 mb-4 items-center text-white'>
          <h1 className='fira-sans-bold text-5xl '>Code Room</h1>
          <h5 className=' text-md '>Create an account to continue</h5>
        </div>

        {/**Input filed */}
        <div >

          <form>

            <div className='flex flex-col justify-center' >
              {/*name field*/}
              <Input

                type={'text'}
                customcss={' '}
                custom_placeholder={'Name'}
                inputId={'input_name'}
              />


              {/*Email field*/}
              <Input

                type={'text'}
                customcss={' '}
                custom_placeholder={'Email'}
                inputId={'input_email'}
              />

              {/*github field*/}
              <Input

                type={'text'}
                customcss={' '}
                custom_placeholder={'Github'}
                inputId={'input_github'}
              />

              {/*password field*/}
              <Input

                type={'password'}
                customcss={' '}
                custom_placeholder={'Password'}
                inputId={'input_password'}

              />


              <Button
                buttonLabel={"Sign up"}
                custom_class='py-3 w-80 bg-signupBTN text-white item-center mt-4 font-semibold hover:bg-blue_hover  rounded-sm'
                type={"submit"}

              />
            </div>

          </form>



          <p className='mt-10 text-white'>
            Already have an account?
            <a className='ml-4 text-blue-500 underline font-semibold' href='/login'>
              Login here!
            </a>
          </p>


        </div>
      </div> {/* left div end */}


      {/**************************************Right part/////////////////////////// */}
      <div className='flex justify-center items-center w-1/2 fixed right-0'>
        <img src={signupImage} alt='Side Login panel' className='' />
      </div>
    </div >

  )
}

export default Signup