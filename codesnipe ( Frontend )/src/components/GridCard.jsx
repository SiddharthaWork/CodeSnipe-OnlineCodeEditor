import { useState, useEffect } from "react"
import { Icon } from "@iconify/react"
import { API_BASE_URL } from "../../helper"
import { useNavigate } from "react-router-dom"

const GridCard = () => {
  // State to track which card is being hovered (for additional effects)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const Image = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_BASE_URL + "image");
      const data = await response.json();
      if (data.success) {
        setImages(data.images);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    Image();
  }, []);
  console.log("ss ", images);


  return (
    <>
      {
        loading ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 w-full gap-8 md:gap-10 xl:gap-12 px-[2.5%]">
          {Array(3).fill(0).map((_, index) => (
            <div key={index} className="relative w-[30rem] aspect-video animate-pulse">
              <div className="absolute inset-0 bg-gray-800 rounded-xl"></div>
            </div>
          ))
}            </div>
        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 w-full gap-8 md:gap-10 xl:gap-12 px-[2.5%]">
            {/* Project Cards */}
            {images.map((item, index) => (
              <div
                key={item._id}
                className="relative w-[30rem] aspect-video group cursor-pointer"
                onMouseEnter={() => setHoveredCard(item._id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => navigate(`/editor/${item.projectId}`)}
              >
                {/* Main Card */}
                <div
                  className="absolute inset-0 bg-[#050a1f] rounded-xl overflow-hidden shadow-lg z-10 transition-all duration-300 ease-out
            group-hover:translate-x-2 group-hover:-translate-y-2"
                >
                  {/* Card Image */}
                  <div className="w-full h-[70%] relative">
                    <img
                      // src={item.image || "/placeholder.svg"} 
                      src={`${API_BASE_URL}image/${item.image}`}
                      alt={item.name}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050a1f] to-transparent opacity-50"></div>

                    {/* Floating action buttons that appear on hover */}
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="w-8 h-8 rounded-full bg-slate-900/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-sky-600 transition-colors">
                        <Icon icon="mingcute:heart-line" width="16" height="16" />
                      </button>
                      <button className="w-8 h-8 rounded-full bg-slate-900/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-sky-600 transition-colors">
                        <Icon icon="mingcute:share-forward-line" width="16" height="16" />
                      </button>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="w-full h-[30%] p-4 flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-700 flex-shrink-0">
                        <img
                          src={item.userprofile || "https://i.pinimg.com/474x/59/77/92/597792dff8c2fe8729218359fa15b16c.jpg"}
                          alt="User profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-white font-medium leading-tight">{item.title || "Untitled Project"}</h3>
                        <p className="text-gray-400 text-sm">{item.des || "UI Practice"}</p>
                      </div>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center hover:bg-sky-600 transition-colors">
                      <Icon icon="mingcute:code-line" width="18" height="18" className="text-white" />
                    </div>
                  </div>
                </div>

                {/* Background Card - creates the offset shadow effect */}
                <div
                  className={`absolute inset-0 bg-sky-600 rounded-xl -z-0 transition-all duration-500 ease-out
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

export default GridCard

