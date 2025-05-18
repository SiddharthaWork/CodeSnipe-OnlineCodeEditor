import React from 'react'
import { useEffect } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import { API_BASE_URL } from '../../../helper'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const Search = () => {
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = React.useState("")
    const [data, setData] = React.useState([])
    const [filteredData, setFilteredData] = React.useState([])

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

    const filtersearch = async() => {
        try {
            const response = await fetch(API_BASE_URL + "getProjects", {
              method: "POST",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ userId: localStorage.getItem("userId") }),
            });
            const data = await response.json();
            if (data.success) {
              const mappedData = data.projects.map((project) => ({
                id: project._id,
                title: project.title,
                description: project.description || "Personal portfolio with HTML, CSS and JavaScript",
                lastEdited: project.updated_at || "2 hours ago",
                language: project.language || "html",
                favorite: project.favorite || false,
              }));
              setData(mappedData);
              setFilteredData(mappedData);
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
    }

    useEffect(() => {
        filtersearch();
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredData(data);
        } else {
            const filtered = data.filter((item) => 
                item.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredData(filtered);
        }
    }, [searchQuery, data]);


    const showSearchData = searchQuery === "" ? null : filteredData 

    const handleProjectClick = (projectId) => {
        navigate(`/editor/${projectId}`)
    }

    return (
        <div className='flex flex-col justify-center items-center gap-6 relative'>
            <h1 className='font-kanit text-4xl md:text-5xl font-bold text-white text-center'>✨{randomTitle} <span className='text-sky-400'>{randomWord}</span></h1>

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

            {/* Display filtered results */}
            { showSearchData &&
            <div className="w-full max-w-2xl mt-4 absolute top-[100%] z-50">
                {filteredData.map((item) => (
                    <div 
                        key={item.id} 
                        className="bg-[#050a1f] border border-gray-700 rounded-xl p-4 mb-2 cursor-pointer hover:border-sky-500 transition-colors"
                        onClick={() => handleProjectClick(item.id)}
                    >
                        <h3 className="text-sky-400 font-semibold">{item.title}</h3>
                        <p className="text-white text-sm">{item.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-gray-500 text-xs">{item.language}</span>
                            <span className="text-gray-500 text-xs">•</span>
                            <span className="text-gray-500 text-xs">{new Date(item.lastEdited).toLocaleString()}</span>
                        </div>
                    </div>
                ))}
            </div>
            }
        </div>
    )
}

export default Search