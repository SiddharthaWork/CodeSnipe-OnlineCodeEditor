import React from 'react'
import { Avatar } from '@mui/material';

const ListCard = () => {
  let a = 10;
  return (
    <div className='relative w-[26rem] h-[16rem] z-0 group'>
    <div className='w-[24rem] h-[15rem] rounded-lg z-40 shadow-sm  flex flex-col gap-2'>
     
      <div className='w-full h-[80%]'>
        <img src="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg" alt="" className='w-full h-full object-cover' />
      </div>
      <div className='w-full h-[20%] py-2 flex gap-2 items-center'>
        <Avatar alt="Remy Sharp" sx={{ borderRadius: "0%" }}  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi6rSH-A48Rg-kaRwlL7p8kFcQn6SxsxBcog&s" />

        <h1 className='font-kanit flex flex-col'>
          <span className='text-white text-lg'>Line Art Mixed</span>
          <span className='text-white text-sm'>Crazy Code</span>
        </h1>

      </div>

    </div>
    <div className='absolute 
    w-[24rem] h-[14.5rem] group-hover:w-[26rem] group-hover:h-[18rem] group-hover:-top-3 group-hover:-left-4
    group-hover:shadow-md group-hover:shadow-sky-400 
    top-6 left-4 bg-[#050a1f] -z-10 rounded-lg transition-all duration-300 ease-in-out '>
    </div>
    </div>
  )
}

export default ListCard