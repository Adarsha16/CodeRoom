import React, { useState } from 'react'
import Input from './Inputfield.jsx'
import signupImage from './Assets/signUpImage.jpg'
import Button from './Button.jsx'
import validateForm from '../custom_fn/Validation.js'
import callGithub from '../custom_fn/callGithub.js'
import callRegister from '../custom_fn/callRegister.js'
import { useNavigate, Link } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice.js'


function Signup() {


  const [values, setvalues] = useState({ name: "", email: "", password: "", github: "" });
  const [FormErrors, setFormErrors] = useState({})
  const [GitErrors, setGitErrors] = useState({})
  const [Info, setInfo] = useState("");
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const handleChanges = (e) => {

    const { value, name } = e.target

    setvalues((prev) => ({

      ...prev,
      [name]: value

    }))
  }



  const ValidateAndSetErrors = () => {

    const validateForm_result = validateForm(values);
    setFormErrors(validateForm_result)
    return validateForm_result;
  };





  const handleSubmit = async (e) => {

    e.preventDefault();
    setFormErrors({})
    const formErrorsResult = ValidateAndSetErrors()

    ///Checking if error length is 0
    if (Object.keys(formErrorsResult).length !== 0) {

      return;
    };



    //////////////Call Github////////////////////////////////
    const callGithub_res = (await callGithub(values.github)).GithubData

    /////IF Github error
    if (callGithub_res.status == 404 || callGithub_res.status == 400) {

      setGitErrors(() => ({
        github: `Github : ${callGithub_res.status_info}`
      }))
      return;
    };

    ////reseting github error
    setGitErrors({})

    /////////////////////////Calling Register//////////////////

    try {

      const callRegister_response = await callRegister(values);
      const callRegister_result = await callRegister_response.json();

      if (!callRegister_response.ok) {

        setFormErrors({ register: `${callRegister_result.Error}` })
        return;
      }


      setFormErrors({})
      setInfo("Registeration Success!, Redirecting....")

      // dispatch(login({ name: values.name, email: values.email, github: values.github }))

      setTimeout(() => {
        navigate("/login");

      }, 1700)

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
          <h1 className='fira-sans-bold text-5xl '>Code Room</h1>
          <h5 className=' text-2xl pt-3'>This is where Cooding happens</h5>
          <h5 className=' text-md '>Create an account to continue</h5>
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
              <Input

                type={'password'}
                custom_placeholder={'Password'}
                name={'password'}
                value={values.password}
                handleChanges={handleChanges}

              />
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
            {/* <a className='ml-4 text-blue-500 underline font-semibold' href='/login'>
              Login here!
            </a> */}
            <Link className='ml-4 text-blue-500 underline font-semibold' to='/login'>
              Login Here!
            </Link>
          </p>


        </div>
      </div> {/* left div end */}





      {/**************************************Right part/////////////////////////// */}
      <div className='flex justify-center items-center w-1/2 fixed right-0'>
        <img src={signupImage} alt='Side Login panel' className='' />


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

export default Signup