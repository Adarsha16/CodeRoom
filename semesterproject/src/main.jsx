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
import Mode_h from './pages/Mode_horizontal.jsx'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'

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
        element: <Login />
      },

      {
        path: "/signup",
        element: <SignUp />
      },

      // {
      //   path: "/room/:slug",
      //   element: <Room />
      // }
      {
        path:"/Mode_horizontal",
        element:<Mode_h />
      }


    ]
  }



])

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <RouterProvider router={myrouter} />

  </Provider>


  ,
)
