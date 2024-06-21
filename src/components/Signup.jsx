import React, { useState } from 'react'
import Input from './Inputfield.jsx'
import signupImage from './Assets/signUpImage.jpg'
import Button from './Button.jsx'
import validateForm from '../custom_fn/Validation.js'
import callGithub from '../custom_fn/callGithub.js'
import callRegister from '../custom_fn/callRegister.js'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login, setSignup } from '../store/authSlice.js'
import GitHubUser from './Header/Github.jsx'

function Signup() {


  const [values, setvalues] = useState({ name: "", email: "", password: "", github: "" });
  const [FormErrors, setFormErrors] = useState({});
  const [GitErrors, setGitErrors] = useState({});
  const [Info, setInfo] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginStatus, setLoginStatus] = useState(false);
  const [githubData, setGithubData] = useState(null);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChanges = (e) => {

    const { value, name } = e.target

    setvalues((prev) => ({

      ...prev,
      [name]: value

    }))

    if (name === 'password' && !value) {
      setIsPasswordVisible(false);
    }
  }

  ///For password hiding////

  const changePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };


  const ValidateAndSetErrors = () => {

    const validateForm_result = validateForm(values);
    setFormErrors(validateForm_result)
    return validateForm_result;
  };


  //console.log("password visibility: ", isPasswordVisible);


  const handleSubmit = async (e) => {

    e.preventDefault();
    setFormErrors({})
    const formErrorsResult = ValidateAndSetErrors()

    ///Checking if error length is 0
    if (Object.keys(formErrorsResult).length !== 0) {

      return;
    };


    //////////////Call Github////////////////////////////////
    const callGithub_res = (await callGithub(values.github))?.GithubData

    /////IF Github error
    if (callGithub_res.status == 404 || callGithub_res.status == 400) {

      setGitErrors(() => ({
        github: `Github : ${callGithub_res.status_info}`
      }))
      return;
    };

    ////reseting github error
    setGitErrors({})
    setGithubData(callGithub_res.GithubData);

    /////////////////////////Calling Register//////////////////

    try {

      const callRegister_response = await callRegister(values);
      const callRegister_result = await callRegister_response.json();

      if (!callRegister_response.ok) {

        setFormErrors({ register: `${callRegister_result.Error}` })
        return;
      }


      setFormErrors({})
      // setInfo("Registeration Success!, Redirecting....")
      setInfo("Sending OTP...")
      setLoginStatus(true); // User is logged in
      // dispatch(login({ name: values.name, email: values.email, github: values.github }))

      dispatch(setSignup(true))

      setTimeout(() => {
        navigate("/otp", {

          state: { values }

        });

      }, 1000)

    } catch (error) {

      console.log("Trycatch", error)

    }

  }

  return (
    <div className='w-full h-full flex'>

      {/**************************************left part/////////////////////////// */}
      <div className='flex flex-col  w-1/2 bg-signup h-full justify-center items-center '>

        {/**Info and Headline */}
        <div className='flex flex-col gap-1 mb-0.5 items-center text-white'>
          <h1 className='fira-sans-bold text-5xl mb-2 '>Code Room</h1><br />
          <h5 className=' text-2xl pt-3'>Welcome to Code Room!</h5><br />
          <h5 className=' text-md mb-5 '>Create an account to continue</h5>
        </div>

        {/**Input filed */}
        <div >

          <form onSubmit={handleSubmit}>

            <div className='flex flex-col justify-center' >
              {/*name field*/}
              <Input

                type={'text'}
                custom_placeholder={'Name'}
                name={'name'}
                value={values.name}
                handleChanges={handleChanges}
              />

              {FormErrors?.name && <p className='error text-sm/[15px]'>{FormErrors.name}</p>}



              {/*Email field*/}
              <Input

                type={'text'}
                custom_placeholder={'Email'}
                name={'email'}
                value={values.email}
                handleChanges={handleChanges}
              />
              {FormErrors.email && <p className='error text-sm/[15px]'>{FormErrors.email}</p>}

              {/*github field*/}
              <Input

                type={'text'}
                custom_placeholder={'Github'}
                name={'github'}
                value={values.github}
                handleChanges={handleChanges}
              />
              {(FormErrors.github || GitErrors.github) && <p className='error text-sm/[15px]'>{FormErrors.github || GitErrors.github}</p>}

              {/*password field*/}
              <div style={{ position: 'relative', display: 'inline-block' }}>

                <Input
                  type={isPasswordVisible ? 'text' : 'password'}
                  custom_placeholder={'Password'}
                  name={'password'}
                  value={values.password}
                  handleChanges={handleChanges}
                />

                {values.password && (
                  <span
                    onClick={changePasswordVisibility}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      userSelect: 'none',
                      color: 'black',
                    }}
                  >
                    {isPasswordVisible ? <svg xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      viewBox="0 0 32 32">
                      <path fill="currentColor" d="M28.034 17.29c.13.43.53.71.96.71v-.01a.993.993 0 0 0 .96-1.28C29.923 16.61 26.613 6 15.995 6S2.07 16.61 2.04 16.72c-.16.53.14 1.08.67 1.24s1.09-.14 1.25-.67C4.069 16.91 6.889 8 15.996 8c9.105 0 11.915 8.903 12.038 9.29M10 18a6 6 0 1 1 12 0a6 6 0 0 1-12 0" />
                    </svg> :
                      <svg xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        viewBox="0 0 32 32">
                        <path fill="currentColor" d="M28.034 17.29c.13.43.53.71.96.71v-.01a.993.993 0 0 0 .96-1.28C29.923 16.61 26.613 6 15.995 6S2.07 16.61 2.04 16.72c-.16.53.14 1.08.67 1.24s1.09-.14 1.25-.67C4.069 16.91 6.889 8 15.996 8c9.105 0 11.915 8.903 12.038 9.29M12 18a4 4 0 1 1 8 0a4 4 0 0 1-8 0m4-6a6 6 0 1 0 0 12a6 6 0 0 0 0-12" />
                      </svg>}
                  </span>
                )}

              </div>
              {(FormErrors?.password) && <p className='error text-sm/[15px]'>{FormErrors?.password}</p>}
              {(FormErrors?.register) && <p className='error text-sm/[15px]'>{FormErrors?.register}</p>}


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


        {Info && (
          <div className='absolute -bottom-10 border-2 text-green p-2 m-0 font-bold shadow-md'>
            <p>{Info}</p>
          </div>
        )}


      </div>
      {loginStatus && githubData && (
        <div className='absolute top-10 right-10'>
          <GitHubUser username={githubData.login} />
        </div>
      )}
    </div >

  )
}

export default Signup