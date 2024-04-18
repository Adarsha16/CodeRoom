import React, { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from "./components/Header/Header"
import Input from './components/Home/Input'
import Output from './components/Home/Output'
import Chat from './components/Home/Chat'
import Explore from './components/Home/Explore'


function App() {

  return (

    <div>

      <Header />
      <Explore />
      <Chat />
      <Input />
      <Output />
      <main>

        <Outlet />
      </main>

    </div>


  )
}

export default App
