import { useState } from "react"
import { Icon } from "@iconify/react"

const list = [
  {
    id: 1,
    img: "https://images.pexels.com/photos/11035373/pexels-photo-11035373.jpeg",
    userprofile: "https://randomuser.me/api/portraits/men/32.jpg",
    title: "AI-Powered Code",
    des: "Machine Learning in Action",
  },
  {
    id: 2,
    img: "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg",
    userprofile: "https://randomuser.me/api/portraits/women/45.jpg",
    title: "Creative Coding",
    des: "Art meets Programming",
  },
  {
    id: 3,
    img: "https://images.pexels.com/photos/7375/startup-photos.jpg",
    userprofile: "https://randomuser.me/api/portraits/men/50.jpg",
    title: "Debugging Nightmares",
    des: "Fixing bugs like a pro!",
  },
  {
    id: 4,
    img: "https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg",
    userprofile: "https://randomuser.me/api/portraits/women/60.jpg",
    title: "The Beauty of Code",
    des: "Writing clean and efficient code",
  },
  {
    id: 5,
    img: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg",
    userprofile: "https://randomuser.me/api/portraits/men/75.jpg",
    title: "Future of Web Dev",
    des: "Exploring Next.js & React",
  },
  {
    id: 6,
    img: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg",
    userprofile: "https://randomuser.me/api/portraits/women/20.jpg",
    title: "Hackathon Winner",
    des: "Turning ideas into reality!",
  },
]

const GridCard = () => {
  // State to track which card is being hovered (for additional effects)
  const [hoveredCard, setHoveredCard] = useState(null)

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 w-full gap-8 md:gap-10 xl:gap-12 px-[2.5%]">
      {/* New Project Card */}
      
      {/* Project Cards */}
      {list.map((item, index) => (
        <div
          key={item.id}
          className="relative w-[30rem] aspect-video group cursor-pointer"
          onMouseEnter={() => setHoveredCard(item.id)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Main Card */}
          <div
            className="absolute inset-0 bg-slate-800 rounded-xl overflow-hidden shadow-lg z-10 transition-all duration-300 ease-out
            group-hover:translate-x-2 group-hover:-translate-y-2"
          >
            {/* Card Image */}
            <div className="w-full h-[70%] relative">
              <img 
                src={item.img || "/placeholder.svg"} 
                alt={item.title} 
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-50"></div>

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
                    src={item.userprofile || "/placeholder.svg"}
                    alt="User profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-white font-medium leading-tight">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.des}</p>
                </div>
              </div>

              <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center hover:bg-sky-600 transition-colors">
                <Icon icon="mingcute:code-line" width="18" height="18" className="text-white" />
              </div>
            </div>
          </div>

          {/* Background Card - creates the offset shadow effect */}
          <div
            className={`absolute inset-0 bg-sky-600/20 rounded-xl -z-0 transition-all duration-500 ease-out
            ${hoveredCard === item.id ? "shadow-lg shadow-sky-600/20" : ""}`}
          ></div>
        </div>
      ))}
    </div>
  )
}

export default GridCard

