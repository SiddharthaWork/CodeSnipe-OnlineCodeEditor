import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='fixed w-full h-fit mt-2 z-50'>
      <div className='w-full h-16 bg-sky-300/0 flex justify-between items-center px-8 py-2'>
        <div className='flex w-[10rem] h-16 '>
          <img src="/codesnipe.gif" alt="Logo" className='w-full h-full object-cover' />
        </div>

        <div className='w-fit h-full text-xl font-bold flex justify-center items-center space-x-8'>
          <Link to='/' className='font-kanit'>Home</Link>
          <Link to='/' className='font-body'>About</Link>
          <Link to='/' className='font-body'>Contact</Link>
          <Link to='/' className='font-body'>Services</Link>  
          <Link to='/login' className='font-body'>Sign In</Link>  
        </div>
      </div>
    </div>
  )
}

export default Navbar