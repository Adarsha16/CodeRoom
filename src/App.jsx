import React, { useEffect } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from "./components/Header/Header"
import { login } from './store/authSlice.js'
import callGetUser from "./custom_fn/callGetUser.js"
import { useDispatch } from 'react-redux'



function App() {


  const dispatch = useDispatch();
  useEffect(() => {

    const ifLoggedInToken = localStorage.getItem("token");

    if (ifLoggedInToken) {

      async function GetUser() {

        // Getting Data of that user
        const response = await callGetUser(ifLoggedInToken);
        console.log("home res", response)
        let data = response;
        if (!response) {
          console.log("Error", response)
          return;
        }


        dispatch(
          login({
            token: ifLoggedInToken, data
          })
        )

      };


      GetUser();

    }

  }, []);



  return (

    <div className='w-full h-screen box-border'>

      <div >
        <Header />
      </div>

      <main className='h-[calc(100vh-6rem)]'>
        <Outlet />
      </main>

    </div>


  )

}

export default App
