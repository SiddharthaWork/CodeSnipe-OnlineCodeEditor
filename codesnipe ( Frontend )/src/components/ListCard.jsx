"use client"

import { Icon } from "@iconify/react/dist/iconify.js"
import { useState } from "react"

export default function ListCard() {
  // Sample project data - in a real app, this would come from your database
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Portfolio Website",
      description: "Personal portfolio with HTML, CSS and JavaScript",
      lastEdited: "2 hours ago",
      language: "html",
      favorite: true,
    },
    {
      id: 2,
      title: "Todo App",
      description: "Simple todo application with local storage",
      lastEdited: "Yesterday",
      language: "javascript",
      favorite: false,
    },
    {
      id: 3,
      title: "Responsive Dashboard",
      description: "Admin dashboard with responsive design",
      lastEdited: "3 days ago",
      language: "css",
      favorite: true,
    },
    {
      id: 4,
      title: "Landing Page",
      description: "Product landing page with animations",
      lastEdited: "1 week ago",
      language: "html",
      favorite: false,
    },
    {
      id: 5,
      title: "Image Gallery",
      description: "Dynamic image gallery with filtering",
      lastEdited: "2 weeks ago",
      language: "javascript",
      favorite: false,
    },
    {
      id: 6,
      title: "API Integration",
      description: "Example of fetching and displaying API data",
      lastEdited: "1 month ago",
      language: "javascript",
      favorite: false,
    },
  ])

  const toggleFavorite = (id) => {
    setProjects(projects.map((project) => (project.id === id ? { ...project, favorite: !project.favorite } : project)))
  }

  return (
    <div className="bg-[#050a1f] backdrop-blur-sm border border-sky-900/30 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-sky-600/10 transition-all duration-300">
      {/* Create New Project Row */}
      <div className="border-b border-sky-900/30 hover:bg-slate-700/50 transition-colors duration-300 cursor-pointer group">
        <div className="p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-sky-600/10 flex items-center justify-center group-hover:bg-sky-600/20 transition-colors duration-300">
            <Icon
              icon="mingcute:add-fill"
              className="text-sky-400 group-hover:text-sky-300 group-hover:scale-110 transition-all duration-300"
              width="20"
              height="20"
            />
          </div>
          <div>
            <h3 className="font-medium text-white">Create New Project</h3>
            <p className="text-gray-400 text-sm">Start coding with HTML, CSS, and JavaScript</p>
          </div>
        </div>
      </div>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-sky-900/30 text-gray-400 text-sm font-medium bg-slate-900/30">
        <div className="col-span-5">PROJECT</div>
        <div className="col-span-3">DESCRIPTION</div>
        <div className="col-span-2">LAST EDITED</div>
        <div className="col-span-2 text-right">ACTIONS</div>
      </div>

      {/* Project Rows */}
      {projects.map((project, index) => (
        <div
          key={project.id}
          className={`border-b border-sky-900/30 last:border-b-0 hover:bg-slate-700/30 transition-colors duration-300 group ${index % 2 === 0 ? "bg-slate-800/20" : "bg-slate-800/10"}`}
        >
          {/* Mobile View */}
          <div className="md:hidden p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-1 h-8 rounded-full ${getLanguageColor(project.language)}`}></div>
                <LanguageIcon language={project.language} />
                <h3 className="font-medium text-white">{project.title}</h3>
              </div>
              <button
                className={`text-gray-400 hover:text-sky-400 transition-colors ${project.favorite ? "text-sky-400" : ""}`}
                onClick={() => toggleFavorite(project.id)}
              >
                <Icon
                  icon={project.favorite ? "mingcute:star-fill" : "mingcute:star-line"}
                  width="20"
                  height="20"
                  className={project.favorite ? "text-sky-400" : ""}
                />
              </button>
            </div>
            <p className="text-gray-400 text-sm mb-3 pl-7">{project.description}</p>
            <div className="flex justify-between items-center pl-7">
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Icon icon="mingcute:time-line" width="14" height="14" />
                {project.lastEdited}
              </span>
              <div className="flex gap-2">
                <button className="p-1.5 rounded-md hover:bg-sky-600/10 hover:text-sky-400 transition-all duration-200 transform hover:-translate-y-0.5">
                  <Icon icon="mingcute:edit-line" width="16" height="16" />
                </button>
                <button className="p-1.5 rounded-md hover:bg-sky-600/10 hover:text-sky-400 transition-all duration-200 transform hover:-translate-y-0.5">
                  <Icon icon="mingcute:copy-fill" width="16" height="16" />
                </button>
                <button className="p-1.5 rounded-md hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 transform hover:-translate-y-0.5">
                  <Icon icon="mingcute:delete-fill" width="16" height="16" />
                </button>
              </div>
            </div>
          </div>

          {/* Desktop View */}
          <div className="hidden md:grid grid-cols-12 gap-4 p-4 items-center group">
            <div className="col-span-5">
              <div className="flex items-center gap-3">
                <div className={`w-1 h-8 rounded-full ${getLanguageColor(project.language)}`}></div>
                <button
                  className={`text-gray-400 hover:text-sky-400 transition-colors ${project.favorite ? "text-sky-400" : ""}`}
                  onClick={() => toggleFavorite(project.id)}
                >
                  <Icon
                    icon={project.favorite ? "mingcute:star-fill" : "mingcute:star-line"}
                    width="20"
                    height="20"
                    className={`${project.favorite ? "text-sky-400" : ""} transition-transform duration-300 group-hover:scale-110`}
                  />
                </button>
                <LanguageIcon language={project.language} />
                <h3 className="font-medium text-white">{project.title}</h3>
              </div>
            </div>
            <div className="col-span-3 text-gray-400 text-sm truncate">{project.description}</div>
            <div className="col-span-2 text-gray-500 text-sm flex items-center gap-1">
              <Icon icon="mingcute:time-line" className="opacity-70" width="14" height="14" />
              {project.lastEdited}
            </div>
            <div className="col-span-2 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="p-1.5 rounded-md bg-sky-600 hover:bg-sky-500 text-white transition-all duration-200">
                <Icon icon="mingcute:edit-line" width="18" height="18" />
              </button>
              <button className="p-1.5 rounded-md bg-slate-700 hover:bg-slate-600 text-white transition-all duration-200">
                <Icon icon="mingcute:eye-line" width="18" height="18" />
              </button>
              <button className="p-1.5 rounded-md bg-red-900/50 hover:bg-red-900 text-white transition-all duration-200">
                <Icon icon="mingcute:delete-fill" width="18" height="18" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function LanguageIcon({ language }) {
  switch (language) {
    case "html":
      return <Icon icon="mingcute:html5-fill" className="text-orange-500" width="20" height="20" />
    case "css":
      return <Icon icon="mingcute:css3-fill" className="text-blue-500" width="20" height="20" />
    case "javascript":
      return <Icon icon="mingcute:javascript-fill" className="text-yellow-500" width="20" height="20" />
    default:
      return <Icon icon="mingcute:code-fill" className="text-gray-400" width="20" height="20" />
  }
}

function getLanguageColor(language) {
  switch (language) {
    case "html":
      return "bg-orange-500"
    case "css":
      return "bg-blue-500"
    case "javascript":
      return "bg-yellow-500"
    default:
      return "bg-gray-500"
  }
}

