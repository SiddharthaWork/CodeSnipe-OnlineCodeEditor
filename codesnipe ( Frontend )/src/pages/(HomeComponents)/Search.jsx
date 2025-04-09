import React from 'react'
import { useEffect } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'


const Search = () => {
    const [searchQuery, setSearchQuery] = React.useState("")
    const [randomTitle, setRandomTitle] = React.useState("")
    const [randomWord, setRandomWord] = React.useState("")

    const words = ["Here", "Now", "Today", "With You", "Together", "With Us"]
    const title = [
        "Innovation Starts",
        "Code Comes Alive",
        "Creativity Flows",
        "Ideas Take Shape",
        "Magic Happens",
        "Genius Unfolds",
        "Brilliance Shines",
        "Future Takes Form",
        "Dreams Become Code",
        "Imagination Works"
    ]

    useEffect(() => {
        const randomWordIndex = Math.floor(Math.random() * words.length)
        setRandomWord(words[randomWordIndex])

        const randomWordTitle = Math.floor(Math.random() * title.length)
        setRandomTitle(title[randomWordTitle])
    }, [])

  return (

<div className='flex flex-col justify-center items-center gap-6'>
        <h1 className='font-kanit text-4xl md:text-5xl font-bold text-white'>✨{randomTitle} <span className='text-sky-400'>{randomWord}</span></h1>

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