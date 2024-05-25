import React, { useEffect, useState, useRef } from 'react'
import Inputfield from '../components/Inputfield.jsx'
import signupImage from '../components/Assets/signUpImage.jpg'
import Button from '../components/Button.jsx'
import { useNavigate } from 'react-router-dom';

function SignUp() {


  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [github, setGithub] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const errorRef = useRef("");



  function getUserData(data) {

    const { id, value } = data;
    console.log(value)

    id == "input_name" ? setUsername(value)
      :
      (id == "input_email" ? setEmail(value)
        :
        (id == "input_github" ? setGithub(value)
          :
          (id == "input_password" ? setPassword(value)
            :
            "")));
  }


  useEffect(() => {

    console.log(errorRef.current)
    if (errorRef.current) {
      errorRef.current.classList.add('hidden')
    }
  }, [])


  function showError(message) {

    if (errorRef.current) {
      const error_elm = errorRef.current;
      error_elm.classList.remove('hidden');
      error_elm.textContent = message || 'Something went wrong.';
    }

  }


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
      return response.json();

    } catch (error) {

      showError(error.message)
      console.log(error);
    }
  };


  async function callRegister() {

    const register = await fetch("http://localhost:5001/api/auth/register", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ username, github, email, password })
    })

    const reg = await register.json();
    console.log("register", reg);///

    ////IF user is already registered!
    if (register.status == 400 && reg.statusText == "login") {
      showError(reg.Error)
      console.log(register.status, reg.Error)///
    }

    ////If user successfully registered
    if (register.status == 200) {
      navigate("/login");
    }
  }


  async function handleSubmit(event) {


    //Calling github api
    event.preventDefault();
    const response = (await callGithub()).GithubData;

    console.log(response);

    //Handling github response , incase user not found, ui interaction
    if (response.status == 404) {
      const element = document.getElementById("input_github").style.border = "2px solid red";
      showError('Github : User Not Found')
      return;
    };


    //calling to register
    callRegister()

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


        <div className='flex flex-col'>




          {/*name field*/}
          <Inputfield

            input_type={'text'}
            customcss={' '}
            custom_placeholder={'Name'}
            inputId={'input_name'}
            inputName={'name'}
            getUserData={getUserData}

          />



          {/*Email field*/}
          <Inputfield

            input_type={'text'}
            customcss={' '}
            custom_placeholder={'Email'}
            inputId={'input_email'}
            inputName={'email'}

            getUserData={getUserData}


          />


          {/*github field*/}
          <Inputfield

            input_type={'text'}
            customcss={' '}
            custom_placeholder={'Github'}
            inputId={'input_github'}
            inputName={'github'}
            getUserData={getUserData}


          />


          {/*password field*/}
          <Inputfield

            input_type={'password'}
            customcss={' '}
            custom_placeholder={'Password'}
            inputId={'input_password'}
            inputName={'password'}
            getUserData={getUserData}

          />

          <p id="error_elm" ref={errorRef} className='error text-sm/[15px]'>Field should not be empty</p>

          <Button
            buttonLabel={"Sign up"}
            custom_class='py-3 w-80 rounded-sm bg-signupBTN text-white item-center mt-4 font-semibold hover:bg-blue_hover  rounded-sm'
            type="submit"
            handleSubmit={handleSubmit}
          />




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

export default SignUp