import React from 'react'
import cartoon  from '../assets/chillguy.png'
import logo from '../assets/codes.gif'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const SignUp = () => {

    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, name, email, password);
        e.target.reset();
    }

  return (
    <div className='w-full h-screen bg-black'>
        <div className='w-full h-full flex justify-center items-center'>
            <form action=""  onSubmit={handleSubmit} className='w-full h-full flex flex-col justify-center items-center gap-8 mx-44 mb-[10rem]'>
                <div className='w-[20rem] h-[16rem] overflow-hidden'>
                    <img src={logo} alt="" />   
                </div>

                <div className='w-[30rem] h-fit space-y-3 relative'>
                    <input required type="text" onChange={(e) => setUsername(e.target.value)} value={username} placeholder='Username' className='w-full h-14 bg-[#141414] text-white rounded-lg p-4 placeholder:font-semibold placeholder:text-white/50 outline-none' />
                    <input required type="text" placeholder='Name' onChange={(e) => setName(e.target.value)} value={name} className='w-full h-14 bg-[#141414] rounded-lg p-4 placeholder:font-semibold placeholder:text-white/50 outline-none' />
                    <input required type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} className='w-full h-14 bg-[#141414] rounded-lg p-4 placeholder:font-semibold placeholder:text-white/50 outline-none' />
                    <input required type="text" placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} className='w-full h-14 bg-[#141414] rounded-lg p-4 placeholder:font-semibold placeholder:text-white/50 outline-none' />
                    <div className='flex items-center gap-2 justify-center'>
                    <h1 className='text-white/60 text-sm text-center'>Already have an account</h1>
                    <Link to='/login' className='text-sky-400'>Sign in</Link>
                    </div>
                </div>

                <div className='flex w-[30rem] h-fit items-center justify-center'>
                    <button type="submit" className='w-full h-14 bg-sky-400 rounded-lg text-white'>Sign Up</button>
                </div>

            </form>


            <div className='w-[40rem] h-[30rem] transform -translate-x-[20rem] overflow-hidden'>
            <img src={cartoon} alt="" className='w-full h-full object-cover  ' />

            </div>

        </div>


    </div>
  )
}

export default SignUp