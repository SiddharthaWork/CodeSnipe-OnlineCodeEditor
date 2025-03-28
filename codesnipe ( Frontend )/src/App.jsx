import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home'
import NoPage from './pages/Nopage'
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Editor from './pages/Editor';
import Code from './pages/Code';
import MainNavbar from './components/MainNavbar';
import TopNavbar from './pages/TopNavbar';
import { useState } from 'react';

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  // user authentication
  return (
    <div>
      <BrowserRouter>
        <header className='w-full h-fit z-50' >
          <MainNavbar/>
          <TopNavbar/>
        </header>
        <main className='w-full h-full overflow-hidden mt-4'>
          <Routes> 
            <Route path='/' element={<Home />} />            
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/code' element={isLoggedIn ? <Code /> : <Navigate to="/login" />} />
            <Route path='/editor/:projectid' element={<Editor />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </main>

      </BrowserRouter>
    </div>
    
  )
}

export default App
