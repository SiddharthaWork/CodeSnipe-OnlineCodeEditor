import React, { useState, useEffect, useCallback } from 'react'
import { createContext } from 'react'
import { API_BASE_URL } from '../../helper'


export const ProjectContext = createContext()
export const ProjectProvider  = ({children}) => {

    const [projects, setProjects] = useState([]);

    const getProjects = async(id) => {
        try{
            const res = await fetch(API_BASE_URL + "getProjects", {
                mode: "cors",
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({ userId: id})
            })
            const data = await res.json();
            if(data.success){
                const projectMap = data.projects.map((projects) => ({
                    id: projects._id,
                    name: projects.title,
                    created: projects.created_at,
                    update: projects.updated_at,
                }))
                setProjects(projectMap);
            }
        }
        catch(error){
            console.log("here is some" ,error)
        }
    }

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if(userId){
        getProjects(userId);
    }
    },[])

    const refreshProject = () => {
        const userId = localStorage.getItem("userId");
        if(userId){ 
            getProjects(userId);
        }
    }


  return (
    <ProjectContext.Provider value={{projects, refreshProject}}>
         {children}
    </ProjectContext.Provider>
  )
}


