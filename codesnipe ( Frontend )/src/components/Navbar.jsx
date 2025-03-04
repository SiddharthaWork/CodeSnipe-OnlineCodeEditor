import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import useOutsideClick from '../hooks/useOutsideClick';

const Navbar = () => {
  const[profile,showProfile] = useState(false);

  const ref = useOutsideClick(() => showProfile(false));
  return (
    <div className='fixed w-full h-fit mt-2 z-50' ref={ref}>
      <div className='w-full h-16 bg-sky-300/0 flex justify-between items-center px-8 py-2'>
        <div className='flex w-[10rem] h-16 '>
          <img src="/codesnipe.gif" alt="Logo" className='w-full h-full object-cover' />
        </div>
        <div className='link w-fit h-full text-xl font-bold flex justify-center items-center space-x-8'>
          <Link to='/' className='font-kanit'>Home</Link>
          <Link to='/' className='font-kanit tracking-wide'>About</Link>
          <Link to='/' className='font-kanit tracking-wide'>Contact</Link>
          <Link to='/' className='font-kanit tracking-wide'>Services</Link>  
          <Link to='/login' className='font-kanit tracking-wide'>Sign In</Link>  
          <Avatar alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi6rSH-A48Rg-kaRwlL7p8kFcQn6SxsxBcog&s"
          onClick={() => showProfile(!profile)}
          />
          {profile && (
            <div className="absolute top-16 right-4 bg-white shadow-lg rounded-md p-2">
              <ul className='text-[16px] -space-y-2'>
                <li className="py-2 px-4 text-black hover:bg-gray-100 cursor-pointer">Profile</li>
                <li className="py-2 px-4 text-black hover:bg-gray-100 cursor-pointer">Settings</li>
                <li className="py-2 px-4 text-black hover:bg-gray-100 cursor-pointer">Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar