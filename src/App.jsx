import React, { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from "./components/Header/Header"
import Explore from './components/Home/Explore'
import Input from './components/Home/Input'
import Output from './components/Home/Output'

function App() {

  return (

    <div className='h-screen no-scrollbar overflow-hidden scrollbar-gutter-stable'>
      <Header />

      <main>
        <div className="flex flex-row">
          <Explore />
          <Input />
          <Output />
          <Outlet />
        </div>
      </main>

    </div>


  )
}

export default App
