import { React, useState } from 'react'
import Input from './Inputfield.jsx'
import Login_right from './Assets/Login_right.jpg'
import Button from './Button.jsx'
import validateForm from '../custom_fn/Validation.js'
import callLogin from '../custom_fn/callLogin.js'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login as authlogin } from '../store/authSlice.js'

function LoginComp() {

  const [values, setvalues] = useState({ email: "", password: "" });
  const [FormErrors, setFormErrors] = useState({})
  const [Info, setInfo] = useState("")
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChanges = (e) => {

    const { value, name } = e.target

    setvalues((prev) => ({

      ...prev,
      [name]: value

    }))

  }

  const ValidateAndSetErrors = () => {

    const validateForm_result = validateForm(values);
    setFormErrors(validateForm_result);
    return validateForm_result;

  }


  const handleSubmit = async (e) => {

    e.preventDefault();
    setFormErrors({})
    const formErrorsResult = ValidateAndSetErrors()

    if (Object.keys(formErrorsResult)?.length !== 0) {
      return;
    }

    try {

      const callLogin_response = await callLogin(values);
      const callLogin_result = await callLogin_response?.json()

      const { token, data_obj } = callLogin_result;

      // const token = callLogin_result?.user?.token
      const data = data_obj;

      console.log(token)

      if (!callLogin_response.ok) {

        setFormErrors({ login: `Login : ${callLogin_result?.Error}` })
        return;
      }

      setInfo("Successfully Logged In!. Redirecting...")

      dispatch(authlogin({ token, data }))

      // Setting token to the local storage for future use
      let prevToken = localStorage.getItem("token");
      if (prevToken) {
        localStorage.removeItem("token")
      };

      localStorage.setItem("token", token);
      ////////////////

      setTimeout(() => {
        navigate("/");
      }, 1700)




    } catch (error) {

      setFormErrors({ login: `Internal Server Error, Check your Internet` })
      console.log("Error", error)

    }
  };




  return (
    <div className='w-full h-full flex'>

      {/**************************************left part/////////////////////////// */}
      <div className='flex flex-col  w-1/2 bg-cyan h-full justify-center items-center '>

        {/**Info and Headline */}
        <div className='flex flex-col gap-1.5 mb-4 items-center text-white'>

          <h1 className='fira-sans-bold text-5xl mb-4 '>Code Room</h1>
          <h5 className=' text-2xl '>This is where Coding happens</h5>
          <p className=''>Let's take this journey even further </p>

        </div>

        <form onSubmit={handleSubmit}>
          {/**Input filed */}

          <div className='flex flex-col'>

            {/*Email field*/}
            <Input

              type={'text'}
              custom_placeholder={'Email'}
              name={'email'}
              value={values.email}
              handleChanges={handleChanges}
            />
            {FormErrors.email && <p className='error text-sm/[15px]'>{FormErrors?.email}</p>}



            {/*password field*/}
            <Input
              type={'password'}
              custom_placeholder={'Password'}
              name={'password'}
              value={values.password}
              handleChanges={handleChanges}

            />
            {(FormErrors?.password) && <p className='error text-sm/[15px]'>{FormErrors?.password}</p>}
            {(FormErrors?.login) && <p className='error text-sm/[15px]'>{FormErrors?.login}</p>}

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

        <img src={Login_right} alt='Side Login panel' className='w-[80%]' />


        {
          Info &&
          <div className='absolute -bottom-10 border-2 text-green p-2 m-0 font-bold shadow-md'>
            <p>{Info}
            </p>
          </div>
        }

      </div>

    </div >


  )
}

export default LoginComp