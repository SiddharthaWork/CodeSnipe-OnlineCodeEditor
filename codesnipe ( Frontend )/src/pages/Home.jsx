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
    <div className='w-full min-h-screen bg-[#070d1f]'>
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        <div className="py-6 sm:py-8 mt-4 sm:mt-8">
          <Search/>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">Your Projects</h2>

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
          <div className="w-full">
            {layout === "gridview" && <GridBox/>}
            {layout === "listview" && <ListCard />}
          </div>
        </div>

        <div className='w-full flex flex-col gap-4 sm:gap-6 px-4 sm:px-8 2xl:px-12 pb-12'>
          <h1 className='text-xl sm:text-2xl font-bold'>Picked By <span className='text-sky-600'>CodeSnipe</span></h1>
          <div className='w-full'>
            <GridCard />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
