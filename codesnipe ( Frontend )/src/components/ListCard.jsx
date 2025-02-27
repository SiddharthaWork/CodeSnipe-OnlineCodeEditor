import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const list = [
  {
    img: 'https://randomuser.me/api/portraits/women/20.jpg',
    title: 'My First Project',
    des: 'This is a Clean Ui',
    userprofile: 'https://randomuser.me/api/portraits/women/20.jpg'
  },
  {
    img: 'https://randomuser.me/api/portraits/women/20.jpg',
    title: 'My First Project',
    des: 'This is a Clean Ui',
    userprofile: 'https://randomuser.me/api/portraits/women/20.jpg'
  }
]

const ListCard = () => {
  return (
    <div className='w-full flex justify-center'>
      <div className='w-full grid-cols-1 space-y-10 place-items-center h-full'>
        {list.map((item,index) => (
           <div className='w-[46rem] h-[8rem] flex justify-between bg-black rounded-xl p-10 border-sky-600 border-l-4 border-r-4 border-t-2 shadow-md shadow-white'>
           <div className='flex gap-4 items-center'>
             <img src={item.userprofile} alt="" className='w-16 h-16 rounded-full object-cover' />
             <div className='flex flex-col gap-2'>
             <h1 className='text-white font-kanit text-xl'>
               {item.title}
             </h1>
             <p>{item.des}</p>
             </div>
           </div>
     
           <div className='flex h-full items-center'>
             <Icon icon="ep:delete-filled" width="24" height="24" color='red' />
           </div>
     
     
         </div>
        ))}
   
    </div>
    </div>
  )
}

export default ListCard