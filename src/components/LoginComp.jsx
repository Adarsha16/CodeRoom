import React from 'react'
import Input from './Inputfield.jsx'
import Login_right from './Assets/Login_right.jpg'
import Button from './Button.jsx'
import { useState } from 'react'


function LoginComp() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let empty = false;

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
  }
  if (email === "" && password === "")
    empty = true;
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;




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
          <Input

            type={'text'}
            custom_placeholder={'Email'}
            inputId={'input_email'}
            handleEvent={handleEmail}
            value={email}
          />
          {email === "" ? null : (emailRegex.test(email) ? null : <p className='text-red'>Invalid email</p>)}

          {/*password field*/}
          < Input

            type={'password'}
            custom_placeholder={'Password'}
            inputId={'input_password'}
            handleEvent={handlePassword}
            value={password}

          />
          {password === "" ? null : (password.length < 6 ? <p className='text-red'>Password length cannot be less than 6</p> : null)}
          {empty && <p className='text-red'>The fields cannot be left empty!</p>}
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
      </div>  {/* left div end */}




      {/**************************************Right part/////////////////////////// */}
      <div className='flex justify-center items-center w-1/2 fixed right-0'>

        <img src={Login_right} alt='Side Login panel' className='' />

      </div>

    </div >

  )
}

export default LoginComp