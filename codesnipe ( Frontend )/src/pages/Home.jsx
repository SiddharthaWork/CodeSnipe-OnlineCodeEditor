import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import { useState } from 'react';
import GridCard from '../components/GridCard';
import ListCard  from '../components/ListCard';
import { use } from 'react';
const Home = () => {
  const [layout, setLayout] = useState("gridview");
    
  return (
    <div className='w-full h-full'>
      <div className='flex flex-col justify-center items-center gap-6'>
        <h1 className='font-kanit text-white text-4xl'>Welcome <span className='text-sky-400'> Siddhartha</span></h1>
        <div className='md:w-[20rem] h-[2rem] bg-white rounded-full p-6 flex justify-center items-center '>
          {/* <h1 className='font-body text-sm text-black'>Search Your Code File</h1> */}

          <div className='w-full flex gap-2 items-center justify-center'>
            {/* Added Icon */}
            <Icon icon="mingcute:search-3-line" width="24" height="24" color='black' />
            <input type="text" className="w-full h-full outline-none border-none text-black " placeholder='Enter Your Code File Name' />
          </div>

        </div>

      </div>

      <div className='w-[6rem] h-full flex justify-center gap-2 items-center  bg-[#050a1f] mx-20 mt-6 p-2 rounded-full hover:ring-2 hover:ring-sky-600/50 cursor-pointer'>
      <Icon icon="material-symbols:view-list-rounded" width="30" height="30" color='white' onClick={() => setLayout("listview")} />
      <Icon icon="si:grid-view-fill" width="30" height="30" color='white' onClick={() => setLayout("gridview")} />

      </div>
      <div className='w-full h-full p-16'>
        {
          layout === "gridview" &&
              <GridCard />
        }
        {
          layout === "listview" &&
              <ListCard />
        }
      </div>

    </div>
  )
}

export default Home
