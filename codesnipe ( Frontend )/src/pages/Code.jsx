"use client"

import { useState, useEffect } from "react"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useContext } from "react"
import { ProjectContext } from "../context/ProjectContext"
import CreateModel from "../components/CreateModel"
import Modal from "../components/Modal"
import ListCard from "../components/ListCard"
import GridBox from './GridBox';
import { useNavigate } from "react-router-dom"
import { API_BASE_URL } from "../../helper"

export default function CreateProject() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const { projects } = useContext(ProjectContext)
  const [show, setShow] = useState(false)
  const [layout, setLayout] = useState("listview");
  const [filter, setFilter] = useState([]);


  const [image, setImage] = useState([]);
  const [filterImages, setfilterImage] = useState([])
  const [loading, setloading] = useState(false)
  

  const filteredProjects = projects.filter((project) => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setFilter(filteredProjects);
  }, [searchQuery, projects]);

  const handleProjectClick = (projectId) => {
    navigate(`/editor/${projectId}`);
  }

  // const templates = [
  //   {
  //     id: 1,
  //     name: "Html, CSS, JavaScript",
  //     icon: <Icon icon="logos:react" width="24" height="24" />,
  //     description: "Create a new Html, CSS, JavaScript App",
  //     stars: 4.8,
  //   },
  //   {
  //     id: 2,
  //     name: "JavaScript",
  //     icon: <Icon icon="logos:nextjs-icon" width="24" height="24" />,
  //     description: "Start with a JavaScript template",
  //     stars: 4.9,
  //   },
  //   {
  //     id: 3,
  //     name: "Java",
  //     icon: <Icon icon="logos:nodejs-icon" width="24" height="24" />,
  //     description: "Start with Java",
  //     stars: 4.7,
  //   },
  //   {
  //     id: 4,
  //     name: "Python",
  //     icon: <Icon icon="mdi:git" width="24" height="24" color="#F05032" />,
  //     description: "Create a app with Python",
  //     stars: 4.5,
  //   },
  // ]

  const getImage = async () => {
    setloading(true);
    try {
      const response = await fetch(API_BASE_URL + "image");
      const data = await response.json();
      if (data.success) {
        setImage(data.images);
        console.log("here is the imags",data);
      }
    } catch (error) {
      console.error(error);
    }
    finally {
      setloading(false);
    }
  }


  useEffect(() => {
    getImage();
  }, []);

  const userId = localStorage.getItem("userId");
  // Displaying images which match the project id
  useEffect(() => {

    const filterImage = image.filter((item) => 
      item.userId.includes(userId)
    );
    console.log("filterImage",filterImage);

    setfilterImage(filterImage);
  }, [image, userId]);

  return (
    <div className="w-full min-h-screen bg-black text-white md:mt-0 mt-10 ">
      {show && (
        <Modal setShow={setShow}>
          <CreateModel />
        </Modal>
      )}
      
      <div className="max-w-8xl md:mx-[6rem] p-6 space-y-10">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Create New Project</h1>
          <p className="text-gray-400">Start coding with a new project or from a template</p>
        </div>

        {/* Search and Create Button Row */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div onClick={(e) => e.stopPropagation()} className="relative w-full">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Icon icon="mingcute:search-3-line" width="20" height="20" color="#94a3b8" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-white/20 text-white bg-[#050a1f] focus:outline-none focus:ring-2 focus:ring-sky-600 transition-all"
              placeholder="Search templates or type a project name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && filter.length > 0 && (
              <div className="absolute w-full mt-2 bg-[#050a1f] border border-gray-700 rounded-xl p-2 max-h-96 overflow-y-auto z-50">
                {filter.map((project) => (
                  <div 
                    key={project.id} 
                    className="p-4 mb-2 cursor-pointer hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={() => handleProjectClick(project.id)}
                  >
                    <h3 className="text-sky-400 font-semibold">{project.name}</h3>
                    <p className="text-white text-sm">{project.description || "Personal portfolio with HTML, CSS and JavaScript"}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-gray-500 text-xs">{project.language || "Html"}</span>
                      <span className="text-gray-500 text-xs">•</span>
                      <span className="text-gray-500 text-xs">
                        {new Date(project.update).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <button 
            onClick={() => setShow(true)}
            className="w-full md:w-[20rem] flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
          >
            <Icon icon="ic:baseline-plus" width="20" height="20" />
            <span>Create New Project</span>
          </button>
        </div>

        {/* Templates Section */}
        {/* <div className="space-y-4">
          <h2 className="text-xl font-semibold">Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className="p-4 bg-[#050a1f]  rounded-xl border border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
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
        </div> */}

        {/* Recent Projects Section */}
        {/* <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Projects</h2>
          <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`flex items-center justify-between p-4 hover:bg-gray-800 cursor-pointer ${index !== projects.length - 1 ? "border-b border-gray-700" : ""
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Icon icon="mdi:file-code-outline" width="20" height="20" color="#94a3b8" />
                  <span className="font-medium">{project.name}</span>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Icon icon="mdi:clock-outline" width="16" height="16" color="#94a3b8" className="mr-1" />
                  <span>{project.update && new Date(project.update).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div> */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pt-6">
          <div>
            <h1 className="text-2xl font-semibold text-white">Your Projects</h1>
          </div>


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

        <div className="w-full">
              {layout === "gridview" && <GridBox/>}
              {layout === "listview" && <ListCard />}
            </div>

        <ImageCard images={filterImages} loading={loading} />
        

      </div>
    </div>
  ) 
}



export const ImageCard = ({ images, loading }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();
  return (
    <>
     {
      loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 place-items-center lg:grid-cols-2 2xl:grid-cols-3 w-full gap-4 sm:gap-8 md:gap-10 xl:gap-28 px-2 sm:px-[2.5%]">
        {Array(3).fill(0).map((_, index) => (
          <div key={index} className="relative w-full max-w-[95vw] sm:w-[28rem] aspect-video animate-pulse">
            <div className="absolute inset-0 bg-gray-800 rounded-xl"></div>
          </div>
        ))
}            </div>
      ) : (

        <div className="grid place-items-center grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 w-full gap-8 sm:gap-8 md:gap-14 xl:gap-20 xl:space-x-20 mx-auto px-2 sm:px-[2.5%]">
          {/* Project Cards */}
          {images.map((item, index) => (
            <div
              key={item._id}
              className="relative w-full  sm:w-[30rem] aspect-video group cursor-pointer"
              onMouseEnter={() => setHoveredCard(item._id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => navigate(`/editor/${item.projectId}`)}
            >
              {/* Main Card */}
              <div
                className="absolute inset-0 bg-[#050a1f] w-full md:w-[28rem] rounded-xl overflow-hidden shadow-lg z-10 transition-all duration-300 ease-out
          group-hover:translate-x-2 group-hover:-translate-y-2"
              >
                {/* Card Image */}
                <div className="w-full h-full sm:h-[70%] relative max-h-[20%] md:max-h-[70%] min-h-[120px]">
                  <img
                    // src={item.image || "/placeholder.svg"} 
                    src={`${API_BASE_URL}image/${item._id}`}
                    alt={item.name}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050a1f] to-transparent opacity-50"></div>

                  {/* Floating action buttons that appear on hover */}
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="w-8 h-8 rounded-full bg-slate-900/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-sky-600 transition-colors">
                      <Icon icon="mingcute:heart-line" width="16" height="16" />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-slate-900/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-sky-600 transition-colors">
                      <Icon icon="mingcute:share-forward-line" width="16" height="16" />
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="w-full h-[30%] p-2 sm:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                  <div className="flex gap-2 sm:gap-3 items-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-slate-700 flex-shrink-0">
                      <img
                        src={item.userprofile || "https://i.pinimg.com/474x/59/77/92/597792dff8c2fe8729218359fa15b16c.jpg"}
                        alt="User profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-white text-base sm:text-lg font-medium leading-tight">{item.title || "Untitled Project"}</h3>
                      <p className="text-gray-400 text-xs sm:text-sm">{item.des || "UI Practice"}</p>
                    </div>
                  </div>

                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-700 flex items-center justify-center hover:bg-sky-600 transition-colors mt-2 sm:mt-0">
                    <Icon icon="mingcute:code-line" width="18" height="18" className="text-white" />
                  </div>
                </div>
              </div>

              {/* Background Card - creates the offset shadow effect */}
              <div
                className={`absolute inset-0 bg-sky-600 rounded-xl -z-0 transition-all duration-500 ease-out w-full md:w-[28rem]
          ${hoveredCard === item.id ? "shadow-lg shadow-sky-600/20" : ""}`}
              ></div>
            </div>
          ))}
        </div>
      )
    }
  </>
  )
}
