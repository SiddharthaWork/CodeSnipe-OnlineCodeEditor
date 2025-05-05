"use client"

import { Icon } from "@iconify/react/dist/iconify.js"
import { useDebugValue, useEffect, useState } from "react"
import Modal from "../components/Modal"
import CreateModel from "../components/CreateModel"
import { API_BASE_URL } from "../../helper"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function GridCard() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
const [showModal, setShowModal] = useState(false);

  const toggleFavorite = (id) => {
    setProjects(projects.map((project) => (project.id === id ? { ...project, favorite: !project.favorite } : project)))
  }

  const deleteProjcct = async(id) => {
    try{
      const res = await fetch(`${API_BASE_URL}deleteProject/${id}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if(data.success){
        getProjects();
        toast.success(data.message);
      }else{
        setError(data.message);
      }
    }
    catch(error){
      setError("Server Error Occured", error);
    }
    }
  

  const getProjects = async () => {
    try {
      const response = await fetch(API_BASE_URL + "getProjects", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: localStorage.getItem("userId") }),
      });
      const data = await response.json();
      if (data.success) {
        // Map the projects data immediately after receiving it
        const mappedData = data.projects.map((project) => ({
          id: project._id,
          title: project.title,
          description: project.description || "Personal portfolio with HTML, CSS and JavaScript",
          lastEdited: project.updated_at || "2 hours ago",
          language: project.language || "html",
          favorite: project.favorite || false,
        }));
        console.log("here is the mapped data", mappedData);
        setProjects(mappedData);
      } else {
        setError(data.message);
      }
  }
  catch (error) {
    console.error("Error fetching user data:", error);
    setError("Server Error Occured");
  }
  }

  useEffect(() => {
    getProjects();
  }, []);


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      { showModal &&
      <Modal setShow={setShowModal} >
        <CreateModel/>
        </Modal>}
      {/* New Project Card */}
      <div onClick={() => !setShowModal(true)} className="bg-sky-950/5 backdrop-blur-sm border border-sky-900/30 rounded-xl p-6 flex flex-col items-center justify-center h-full cursor-pointer hover:border-sky-600 hover:shadow-lg hover:shadow-sky-600/10 transition-all duration-300 group">
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
          onClick={() => navigate(`/editor/${project.id}`)}
          key={project.id}
          className="group bg-[#050a1f] backdrop-blur-sm border border-sky-900/30 rounded-xl overflow-hidden hover:border-sky-600 hover:shadow-lg hover:shadow-sky-600/10 transition-all duration-300"
        >
          {/* Card Header with gradient based on language */}
          <div
            className={`p-4 border-b border-sky-900/30 flex justify-between items-center bg-gradient-to-r from-slate-900/50 to-transparent`}
          >
            <div className="flex items-center gap-2">
              <LanguageIcon language={project.language || "html,css,javascript"} />
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
                {new Date(project.lastEdited).toLocaleString()}
              </span>
              <div className="flex gap-2">
                <button className="p-1.5 rounded-md hover:bg-sky-600/10 hover:text-sky-400 transition-all duration-200 transform hover:-translate-y-0.5">
                  <Icon icon="mingcute:edit-line" width="16" height="16" />
                </button>
                <button onClick={(e) =>{
                  e.stopPropagation()
                  deleteProjcct(project.id)}} className="p-1.5 rounded-md hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 transform hover:-translate-y-0.5">
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

