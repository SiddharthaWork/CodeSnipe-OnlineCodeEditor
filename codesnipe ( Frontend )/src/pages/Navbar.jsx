import React from 'react'
import logo from '../assets/codes.gif'


const Navbar = () => {
  return (
    <div className='fixed w-full h-fit'>
    <div className='w-full h-16 bg-sky-300/0 flex justify-between items-center px-8 py-2'>
        <div className='flex w-[10rem] h-full '>
            <img src={logo} alt="Logo" className='w-full h-full object-cover' />
        </div>

        <div className='w-fit h-full text-xl font-bold flex justify-center items-center space-x-8 "'>
            <a href="/">Code</a>
            <a href="/">Multiplayer Code</a>

        </div>
        </div>
    </div>
  )
}

export default Navbar