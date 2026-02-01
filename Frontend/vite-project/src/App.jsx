import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/home'
import UserLoginPage from './pages/userlogin'
import UserSignUpPage from './pages/usersignup'
import CaptionSignUpPage from './pages/captionsignup'
import CaptionLoginPage from './pages/captionlogin'
import './App.css'

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/userlogin" element={<UserLoginPage></UserLoginPage>}></Route>
        <Route path="/usersignup" element={<UserSignUpPage></UserSignUpPage>}></Route>
        <Route path="/captionsignup" element={<CaptionSignUpPage></CaptionSignUpPage>}></Route>
        <Route path="/captionlogin" element={<CaptionLoginPage></CaptionLoginPage>}></Route>

      </Routes>
    </>
  )
}

export default App
