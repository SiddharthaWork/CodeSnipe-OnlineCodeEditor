import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import NoPage from './pages/Nopage'
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Editor from './pages/Editor';
import Code from './pages/Code';
import Navbar from './pages/Navbar';
function App() {


  return (
    <div>
      <BrowserRouter>
        <header className='fixed w-full h-fit z-50' >
          <Navbar/>
         
        </header>
        <main className='w-full h-full overflow-hidden mt-20'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/code' element={<Code />} />
            <Route path='/editor/:projectid' element={<Editor />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </main>

      </BrowserRouter>
    </div>
    
  )
}

export default App
