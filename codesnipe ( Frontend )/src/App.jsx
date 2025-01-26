import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import NoPage from './pages/Nopage'
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Navbar from './components/Navbar';

function App() {

  return (
    <div>
      <Navbar />
       <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login/>} />
          <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
