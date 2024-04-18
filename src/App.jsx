import React, { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from "./components/Header/Header"

function App() {

  return (

    <div>

      <Header />

      <main>

        <Outlet />
      </main>

    </div>


  )
}

export default App
