import React from 'react'
import { ShinyButton } from './Button'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../../helper'
import toast from 'react-hot-toast'

const CreateModel = () => {
  const [title, setTitle] = React.useState("")
  const nav = useNavigate();
  const userID = localStorage.getItem("userId");

  const createProject = async (e) => {
    e.preventDefault()
        if (!title || title.trim() === "") {
      toast.error("Please enter a project title");
      return;
    }

    try {
      const response = await fetch(API_BASE_URL + "createProject", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title.trim(), userId: userID }), 
      });
      const data = await response.json();
      if (data.success) {
        toast('Project Created', {
          icon: '👏',
        });
        nav("/editor/" + data.projectId)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error Creating Project");
    }
  }
    
  return (
    <form onSubmit={createProject} className='w-[25rem] h-fit border-gray-800 border-2 bg-[#0d1631] rounded-lg p-6 flex flex-col gap-4 justify-start'>
        <h1 className='text-xl flex gap-x-2 items-center'>
            Project Title
          <Icon icon="tdesign:code" className="w-6 h-6" />
        </h1>
        <input 
          onChange={(e) => setTitle(e.target.value)} 
          value={title}
          type="text" 
          className='w-full bg-white border-[#0f1a4d] text-black rounded-md p-2 outline-1 transition-all' 
          placeholder="Enter project title"
        />

        <div className='text-center'>
          <ShinyButton className='w-fit min-w-[20rem] h-fit mt-2 '>
              Create
          </ShinyButton>
        </div>
    </form>
  )
}

export default CreateModel