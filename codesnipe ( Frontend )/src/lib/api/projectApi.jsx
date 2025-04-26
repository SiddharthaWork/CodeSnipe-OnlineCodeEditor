import { API_BASE_URL } from "../../../helper"
import { useEffect, useState } from "react";


export const useProject = () => {

    const [project, setProject] = useState([]);
    const getProject = async (id) => {
        try {
            const response = await fetch(API_BASE_URL + "getProjects", {
                mode: "cors",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: id}),
            }
            )
            const data = await response.json();
            if (data.success) {
                const mappingdata = data.projects.map((project) => ({
                    id: project.id,
                    name: project.title,
                }));
                setProject(mappingdata);
            }
        }
        catch (error) {
            console.log("here is some error", error);
        }
    
    }
    useEffect(() => {
        getProject();
    }, []);



    return project;
}

