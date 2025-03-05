import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import NoPage from './pages/Nopage'
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Editor from './pages/Editor';
function App() {

  return (
    <div>
      <BrowserRouter>
      <header className='fixed right-0 top-0 w-full h-fit z-50 mb-10' >
        <Navbar />
        </header>
        <main className='w-full h-full overflow-hidden mt-28'>          
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/editor' element={<Editor />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
        </main>

      </BrowserRouter>
    </div>
  )
}

export default App
