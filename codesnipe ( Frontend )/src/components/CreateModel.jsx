import React from 'react'
import { ShinyButton } from './Button'
import { Icon } from '@iconify/react/dist/iconify.js'

const CreateModel = () => {
  return (
    <form className='w-[25rem] h-fit border-gray-800 border-2 bg-[#0d1631] rounded-lg p-6 flex flex-col gap-4 justify-start'>
        <h1 className='text-xl flex gap-x-2 items-center'>
            Project Title
          <Icon icon="tdesign:code" className="w-6 h-6" />
        </h1>
    <input type="text" className='w-full bg-white border-[#0f1a4d] text-black rounded-md p-2 outline-1 transition-all' />

    <div className='text-center'>
    <ShinyButton className='w-fit min-w-[20rem] h-fit mt-2 '>
        Create
    </ShinyButton>
    </div>


    </form>
  )
}

export default CreateModel