import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import NoPage from './pages/Nopage'
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Editor from './pages/Editor';
import Code from './pages/Code';
import { FloatingDock } from './components/Navbar';
import { IconHome, IconUser, IconSettings } from "@tabler/icons-react"; // or any other icons
import { FloatingNav } from './components/Topbar';
function App() {
  const navigationItems = [
    {
      title: "Home",
      href: "/",
      icon: <IconHome className="w-full h-full" />,
    },
    {
      title: "Profile",
      href: "/profile",
      icon: <IconUser className="w-full h-full" />,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <IconSettings className="w-full h-full" />,
    },
  ];

  return (
    <div>
      <BrowserRouter>
        <header className='fixed right-0 top-0 w-full h-fit z-50' >
          {/* <Navbar /> */}
          {/* <FloatingDock
            items={navigationItems}
            desktopClassName="fixed bottom-4 left-1/2 -translate-x-1/2" // Center at bottom
            mobileClassName="fixed bottom-4 right-4" // Bottom right corner
          /> */}
          <FloatingNav navItems={navigationItems} />
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
      {/* Here are some change to be made */}
    </div>
    
  )
}

export default App
