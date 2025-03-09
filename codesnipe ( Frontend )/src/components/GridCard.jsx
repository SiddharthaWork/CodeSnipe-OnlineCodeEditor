import React from 'react'
import { Icon } from '@iconify/react';

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
];

const GridCard = () => {
  return (
    <div className='grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 w-full h-full gap-16 justify-center place-items-center'>
      {list.map((item, index) => (
        <div className='relative w-[26rem] h-[16rem] z-0 group'>
          <div className='w-[24rem] h-[15rem] rounded-lg z-40 shadow-sm  flex flex-col gap-2'>

            <div className='w-full h-[80%]'>
              <img src={item.img} alt="" className='w-full h-full object-cover' />
            </div>
            <div className='w-full h-[20%] py-2 flex gap-2 items-center justify-between'>
              <div className='flex gap-2 items-center'>
                <div className='w-10 h-10 overflow-hidden cursor-pointer' onClick={() => showProfile(!profile)}>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi6rSH-A48Rg-kaRwlL7p8kFcQn6SxsxBcog&s" alt="" className='w-full h-full object-cover' />
                </div>
                <h1 className='font-kanit flex flex-col'>
                  <span className='text-white text-lg'>{item.title}</span>
                  <span className='text-white text-sm'>{item.des}</span>
                </h1>
              </div>

              <div className='w-12 h-12 rounded-full flex justify-center items-center'>
                <Icon icon="pepicons:code" width="24" height="24" color='white' />
              </div>


            </div>

          </div>
          <div className='absolute 
         w-[24rem] h-[14.5rem] group-hover:w-[26rem] group-hover:h-[18rem] group-hover:-top-3 group-hover:-left-4
         group-hover:shadow-md group-hover:shadow-sky-400 
         top-6 left-4 bg-[#050a1f]/80 -z-10 rounded-lg transition-all duration-300 ease-in-out '>
          </div>
        </div>
      ))}

    </div>
  )
}

export default GridCard