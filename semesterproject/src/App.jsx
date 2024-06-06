import React, { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from "./components/Header/Header"


function App() {



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
