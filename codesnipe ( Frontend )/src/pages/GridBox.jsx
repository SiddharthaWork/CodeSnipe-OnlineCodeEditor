"use client"

import { Icon } from "@iconify/react/dist/iconify.js"
import { useState } from "react"

export default function GridCard() {
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

  ])

  const toggleFavorite = (id) => {
    setProjects(projects.map((project) => (project.id === id ? { ...project, favorite: !project.favorite } : project)))
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* New Project Card */}
      <div className="bg-sky-950/5 backdrop-blur-sm border border-sky-900/30 rounded-xl p-6 flex flex-col items-center justify-center h-full cursor-pointer hover:border-sky-600 hover:shadow-lg hover:shadow-sky-600/10 transition-all duration-300 group">
        <div className="w-16 h-16 rounded-full bg-sky-600/10 flex items-center justify-center mb-4 group-hover:bg-sky-600/20 transition-colors duration-300">
          <Icon
            icon="mingcute:add-fill"
            className="text-sky-400 group-hover:text-sky-300 group-hover:scale-110 transition-all duration-300"
            width="32"
            height="32"
          />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Create New Project</h3>
        <p className="text-gray-400 text-center">Start coding with HTML, CSS, and JavaScript</p>
      </div>

      {/* Project Cards */}
      {projects.map((project) => (
        <div
          key={project.id}
          className="group bg-[#050a1f] backdrop-blur-sm border border-sky-900/30 rounded-xl overflow-hidden hover:border-sky-600 hover:shadow-lg hover:shadow-sky-600/10 transition-all duration-300"
        >
          {/* Card Header with gradient based on language */}
          <div
            className={`p-4 border-b border-sky-900/30 flex justify-between items-center bg-gradient-to-r from-slate-900/50 to-transparent`}
          >
            <div className="flex items-center gap-2">
              <LanguageIcon language={project.language} />
              <h3 className="font-medium text-white">{project.title}</h3>
            </div>
            <div className="flex items-center gap-2">
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
              <button className="text-gray-400 hover:text-white transition-colors">
                <Icon icon="mingcute:more-2-fill" width="20" height="20" />
              </button>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-4">
            <p className="text-gray-400 text-sm mb-4">{project.description}</p>
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span className="flex items-center gap-1">
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

          {/* Card Footer with action buttons */}
          <div className="px-4 py-3 border-t border-sky-900/30 bg-slate-900/30 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <button className="flex-1 flex items-center justify-center gap-1 bg-sky-600 hover:bg-sky-500 text-white py-1.5 rounded-md transition-colors">
              <Icon icon="mingcute:code-line" width="16" height="16" />
              <span className="text-sm">Edit</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-1 bg-slate-700 hover:bg-slate-600 text-white py-1.5 rounded-md transition-colors">
              <Icon icon="mingcute:eye-line" width="16" height="16" />
              <span className="text-sm">Preview</span>
            </button>
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

function getLanguageGradient(language) {
  switch (language) {
    case "html":
      return "bg-gradient-to-r from-orange-950/30 to-transparent"
    case "css":
      return "bg-gradient-to-r from-blue-950/30 to-transparent"
    case "javascript":
      return "bg-gradient-to-r from-yellow-950/30 to-transparent"
    default:
      return "bg-gradient-to-r from-slate-900/50 to-transparent"
  }
}

