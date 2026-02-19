import { useContext, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import HomePage from './pages/home'
import UserLoginPage from './pages/userlogin'
import UserSignUpPage from './pages/usersignup'
import CaptionSignUpPage from './pages/captionsignup'
import CaptionLoginPage from "./pages/captionlogin"
import CaptionHomePage from './pages/captionHomePage';
import EnterPage from './pages/enterpage'
import './App.css'
import { useEffect } from 'react'
import { checkAuth } from '../authSlice'

function App() {


  const { isAuthentication, user } = useSelector((state) => state.auth)
  const { isAuthenticationCaption } = useSelector((state) => state.authCaption);
  const dispatch = useDispatch();

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/userlogin" element={<UserLoginPage />} />
        <Route path="/usersignup" element={isAuthentication ? <EnterPage></EnterPage> : <UserSignUpPage />} />
        <Route path="/captionsignup" element={isAuthenticationCaption ? <EnterPage /> : <CaptionSignUpPage />}></Route>
        <Route path="/captionlogin" element={isAuthenticationCaption ? <EnterPage /> : <CaptionLoginPage />}></Route>
        <Route path="/captionhomepage" element={<CaptionHomePage />}></Route>
        <Route path="/enterpage" element={<EnterPage></EnterPage>}></Route>
      </Routes>
    </>
  )
}

export default App
