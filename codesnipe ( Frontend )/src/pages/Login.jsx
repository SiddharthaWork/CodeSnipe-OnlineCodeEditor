import React from 'react'
import cartoon from '../assets/chillguy.png'
import logo from '../assets/codes.gif'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import { useState } from 'react'

const Login = () => {
    const  [email, setEmail] = useState('');
    const  [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password);
        e.target.reset();
    }

    return (
        <div className='w-full h-screen bg-black '>
            <Navbar/>
            <div className='w-full h-full flex md:flex-row flex-col justify-center items-center '>
                <form onSubmit={handleSubmit} className='w-full h-full flex flex-col justify-center items-center md:gap-8 gap-4 mb-[10rem] '>
               
                    <div className='md:w-[20rem] md:h-[16rem] w-[10rem] h-[10rem] overflow-hidden'>
                        <img src={logo} alt="" />
                    </div>
                    
                    <div className='md:w-[30rem] w-full flex flex-col items-center h-fit space-y-5 relative md:px-0 px-10'>
                        <input required onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Email' className='w-full h-14 bg-[#141414] rounded-lg p-4 placeholder:font-semibold placeholder:text-white/50 outline-none' />
                        <input  required onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Password' className='w-full h-14 bg-[#141414] rounded-lg p-4 placeholder:font-semibold placeholder:text-white/50 outline-none' />
                        <div className='flex items-center gap-2'>
                            <h1 className='text-white/60 text-sm'>Create an account</h1>
                            <Link to='/signup' className='text-sky-400 cursor-pointer z-40'>SignUp</Link>
                        </div>
                        <div className='relative '>
                        <div className='flex md:w-[30rem] w-full h-fit items-center justify-center '>
                            <div className='w-full h-14 bg-sky-400 rounded-lg text-white'></div>
                            <button type='submit' className='absolute md:w-[23rem] w-[10rem] h-14 bg-sky-400 rounded-lg text-white z-40'>Sign Up</button>
                        </div>
                    </div>
                    <div className='md:block hidden w-[40rem] h-[30rem] absolute overflow-hidden left-[11rem] z-20 -top-[13.9rem]'>
                        <img src={cartoon} alt="" className='w-full h-full object-contain  ' />

                    </div>
                    </div>


                    <div className='md:hidden w-[16rem] h-[16rem] overflow-hidden '>
                        <img src={cartoon} alt="" className='w-full h-full object-contain  ' />

                    </div>

                </form>




            </div>


        </div>
    )
}

export default Login