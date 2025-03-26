import React from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'


const Search = () => {
    const [searchQuery, setSearchQuery] = React.useState("")
  return (

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
  )
}

export default Search