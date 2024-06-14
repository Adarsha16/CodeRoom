import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from "./pages/Home.jsx"
import Login from './pages/Login.jsx'
// import Room from './pages/Room.jsx'
import SignUp from './pages/SignUp.jsx'
import ErrorPage from "./error-page.jsx"

import { Provider } from 'react-redux'
import store from "./store/store.js"
import Mode from './pages/Mode.jsx'
import OTPpage from './pages/OTPpage.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AuthLayout from './components/AuthLayout.jsx'
import OTPLayout from './components/OTPLayout.jsx'


const myrouter = createBrowserRouter([

  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [

      {
        path: "/",
        element: <Home />
      },

      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },

      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        ),

      },
      {
        path: "/otp",
        element: (

          <OTPLayout>
            <OTPpage />
          </OTPLayout>
        )
      },

      // {
      //   path: "/room/:slug",
      //   element: <Room />
      // }
      {
        path: "/mode_vertical",
        element: <Mode />
      }
    ]
  }



])

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <RouterProvider router={myrouter} />

  </Provider>



)
