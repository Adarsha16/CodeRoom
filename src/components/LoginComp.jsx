import { React, useState } from 'react'
import Input from './Inputfield.jsx'
import Login_right from './Assets/Login_right.jpg'
import Button from './Button.jsx'

function LoginComp() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", empty: "" });

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  const handleEmail = (e) => {
    setEmail(e.target.value);
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorCount = 0;
    let newErrors = { email: "", password: "", empty: "" };

    if (email === "" && password === "") {
      errorCount++;
      newErrors.empty = "The fields cannot be left empty!";
    }
    if (password.length < 8) {
      errorCount++;
      newErrors.password = "Password length cannot be less than 8";
    }
    if (!emailRegex.test(email)) {
      errorCount++;
      newErrors.email = "Invalid email";
    }

    setErrors(newErrors);

    if (errorCount === 0)
      return;

  }

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

        <form onSubmit={handleSubmit}>
          {/**Input filed */}

          <div className='flex flex-col'>

            {/*Email field*/}
            <Input

              type={'text'}
              custom_placeholder={'Email'}
              inputId={'input_email'}
              handleChanges={handleEmail}
            />
            {errors.email && <p className='text-red'>{errors.email}</p>}

            {/*password field*/}
            < Input

              type={'password'}
              custom_placeholder={'Password'}
              inputId={'input_password'}
              handleChanges={handlePassword}


            />
            {errors.password && <p className='text-red'>{errors.password}</p>}
            {errors.empty && <p className='text-red'>The fields cannot be left empty!</p>}

            <Button
              type={"submit"}
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
        </form>
      </div>  {/* left div end */}

      {/**************************************Right part/////////////////////////// */}
      <div className='flex justify-center items-center w-1/2 fixed right-0'>

        <img src={Login_right} alt='Side Login panel' className='' />

      </div>

    </div >


  )
}

export default LoginComp