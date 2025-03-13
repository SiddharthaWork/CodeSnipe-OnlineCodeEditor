"use client"

import { useState } from "react"
import { Icon } from "@iconify/react/dist/iconify.js"

export default function CreateProject() {
  const [searchQuery, setSearchQuery] = useState("")

  const templates = [
    {
      id: 1,
      name: "React App",
      icon: <Icon icon="logos:react" width="24" height="24" />,
      description: "Create a new React application",
      stars: 4.8,
    },
    {
      id: 2,
      name: "Next.js Project",
      icon: <Icon icon="logos:nextjs-icon" width="24" height="24" />,
      description: "Start with a Next.js template",
      stars: 4.9,
    },
    {
      id: 3,
      name: "Node.js API",
      icon: <Icon icon="logos:nodejs-icon" width="24" height="24" />,
      description: "Build a Node.js backend API",
      stars: 4.7,
    },
    {
      id: 4,
      name: "Git Repository",
      icon: <Icon icon="mdi:git" width="24" height="24" color="#F05032" />,
      description: "Clone from an existing repository",
      stars: 4.5,
    },
  ]

  const recentProjects = [
    { id: 1, name: "personal-website", lastEdited: "2 hours ago" },
    { id: 2, name: "todo-app", lastEdited: "Yesterday" },
    { id: 3, name: "portfolio", lastEdited: "3 days ago" },
  ]

  return (
    <div className="w-full min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Create New Project</h1>
          <p className="text-gray-400">Start coding with a new project or from a template</p>
        </div>

        {/* Search and Create Button Row */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Icon icon="mingcute:search-3-line" width="20" height="20" color="#94a3b8" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-sky-600 transition-all"
              placeholder="Search templates or type a project name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button className="w-full md:w-[20rem] flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors">
            <Icon icon="ic:baseline-plus" width="20" height="20" />
            <span>Create New Project</span>
          </button>
        </div>

        {/* Templates Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className="p-4 bg-gray-900 rounded-xl border border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-800 rounded-lg">{template.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-medium">{template.name}</h3>
                    <p className="text-sm text-gray-400">{template.description}</p>
                    <div className="flex items-center mt-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            icon={i < Math.floor(template.stars) ? "ic:round-star" : "ic:round-star-outline"}
                            width="16"
                            height="16"
                            color={i < Math.floor(template.stars) ? "#FBBF24" : "#4B5563"}
                          />
                        ))}
                      </div>
                      <span className="ml-1 text-xs text-gray-400">{template.stars}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Projects Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Projects</h2>
          <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
            {recentProjects.map((project, index) => (
              <div
                key={project.id}
                className={`flex items-center justify-between p-4 hover:bg-gray-800 cursor-pointer ${
                  index !== recentProjects.length - 1 ? "border-b border-gray-700" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon icon="mdi:file-code-outline" width="20" height="20" color="#94a3b8" />
                  <span className="font-medium">{project.name}</span>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Icon icon="mdi:clock-outline" width="16" height="16" color="#94a3b8" className="mr-1" />
                  <span>{project.lastEdited}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

