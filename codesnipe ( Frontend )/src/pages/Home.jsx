import React from 'react'

const Home = () => {
  return (
    <div className='w-full h-full'>
      <div className='flex flex-col justify-center items-center gap-6'>
        <h1 className='font-kanit text-white text-4xl'>Welcome <span className='text-sky-400'> Siddhartha</span></h1>
        <div className='w-[20rem] h-[5rem] bg-white rounded-full p-6 flex flex-col justify-center items-start gap-2'>
          <h1 className='font-body text-sm text-black'>Search Your Code File</h1>
          <input type="text" className="w-full h-full outline-none border-none text-black" placeholder='Enter Your Code File Name'/>

        </div>

      </div>
      
    </div>
  )
}

export default Home