import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import { useState } from 'react';
import GridCard from '../components/GridCard';
import ListCard  from '../components/ListCard';
import GridBox from './GridBox';
import { ShinyButton } from '../components/Button';
const Home = () => {
  const [layout, setLayout] = useState("gridview");
  const [searchQuery, setSearchQuery] = useState("")
    
  return (
    <div className='w-full h-full'>
      <div className='flex flex-col justify-center items-center gap-6'>
        <h1 className='font-kanit text-4xl md:text-5xl font-bold text-white'>✨Innovation Starts <span className='text-sky-400'> Here</span></h1>

          <div className="relative w-full max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Icon icon="mingcute:search-3-line" className="text-gray-500" width="20" height="20" />
            </div>
            <input
              type="text"
              className="w-full bg-[#050a1f] border border-gray-700 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-sky-600/60 transition-all"
              placeholder="Search your code files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="absolute inset-y-0 right-0 pr-4 flex items-center" onClick={() => setSearchQuery("")}>
                <Icon icon="mingcute:close-fill" className="text-gray-500 hover:text-white" width="18" height="18" />
              </button>
            )}
        </div>
       

      </div>
{/* here are some changes that need to be made */}
        
      <div className="container mx-auto px-4 py-8 mt-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-semibold text-white">Your Projects</h2>

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

      <div className='w-full h-full flex flex-col gap-6 p-12 mx-auto'>
            <h1 className='text-2xl font-bold ml-10'>Picked By <span className='text-sky-600'>CodeSnipe</span></h1>
              <GridCard />
      </div>

  


    </div>
  )
}

export default Home
