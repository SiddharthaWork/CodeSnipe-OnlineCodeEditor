import React from 'react'
import { ShinyButton } from './Button'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useNavigate } from 'react-router-dom'
const MainNavbar = () => {
    const nav = useNavigate();
  return (
    <div className='w-full h-[5rem] flex justify-between items-center px-2 relative overflow-hidden'>
        <div className=' absolute -top-10 cursor-pointer' onClick={() => nav("/")}>
        <img src="/codesnipe.gif" alt="CodeSnipe Logo" className='w-[10rem] h-full object-contain'/>
        </div>
        <div  className='w-full h-[4rem] flex px-4 justify-end items-center'>
        <div className='flex h-fit w-fit justify-center items-center'>
        <ShinyButton onClick={() => nav("/editor/100")} >
                    <div className="flex items-center gap-2">
                        <Icon icon="tdesign:code" className="w-5 h-5" />
                        <span>Editor</span>
                    </div>
                </ShinyButton>
        </div>
        </div>
    </div>
  )
}

export default MainNavbar