import React, { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from "./components/Header/Header"
import Explore from './components/Home/Explore'
import Input from './components/Home/Input'
import Output from './components/Home/Output'

function App() {

  return (
    <>
      <div className='w-full fixed no-scrollbar scrollbar-gutter-stable'>
        <Header />


        <Outlet />
      </div>

    </>
  )
}

export default App
