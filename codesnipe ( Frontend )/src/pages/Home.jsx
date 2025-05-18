import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import { useState } from 'react';
import GridCard from '../components/GridCard';
import ListCard  from '../components/ListCard';
import GridBox from './GridBox';
import Search from './(HomeComponents)/Search';

const Home = () => {
  const [layout, setLayout] = useState("listview");
  const [show,setShow] = useState(true)
    
  return (
    <div className='w-full h-full'>
{/* here are some changes that need to be made */}
        
        <div className="container mx-auto px-4 py-8 mt-8 space-y-8 lg:space-y-4">
          <Search/>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 md:mx-0 mx-4">
              <h2 className="text-2xl font-semibold text-white ">Your Projects</h2>

              {/* View Toggle */}
              <div className="flex items-center bg-[#0d1631] rounded-lg p-1 border border-sky-900/30">
                <button
                  className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${layout === "listview" ? "bg-sky-600 text-white" : "text-gray-400 hover:text-white"}`}
                  onClick={() => setLayout("listview")}
                >
                  <Icon icon="mingcute:list-check-fill" width="20" height="20" />
                  <span className="hidden sm:inline">List</span>
                </button>
                <button
                  className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${layout === "gridview" ? "bg-sky-600 text-white" : "text-gray-400 hover:text-white"}`}
                  onClick={() => setLayout("gridview")}
                >
                  <Icon icon="mingcute:grid-fill" width="20" height="20" />
                  <span className="hidden sm:inline">Grid</span>
                </button>
              </div>
            </div>

            {/* Project Cards */}
            <div className="w-full md:px-0 px-4">
              {layout === "gridview" && <GridBox/>}
              {layout === "listview" && <ListCard />}
            </div>
        </div>

      <div className='w-full h-full flex flex-col gap-6 md:p-12 p-6 mx-auto'>
            <h1 className='text-2xl font-bold ml-10 xl:text-left text-center'>Picked By <span className='text-sky-600'>CodeSnipe</span></h1>
              <GridCard />
      </div>
    </div>
  )
}

export default Home
