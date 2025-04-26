import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"));


    const login = (token, userId) => {
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("isLoggedIn", true);
        setIsLoggedIn(true);
    };
    // Here is some authentiocation

    // const getProducts = async () => {
    //     try {
    //         const response = await fetch(API_BASE_URL + "getProjects", {
    //             mode: "cors",
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ userId: localStorage.getItem("userId") }),
    //         });
    //         const data = await response.json();
    //         if (data.success) {
    //             // Map the projects data immediately after receiving it
    //             const mappedData = data.projects.map((project) => ({
    //                 id: project._id,
    //                 title: project.title,
    //                 description: project.description || "Personal portfolio with HTML, CSS and JavaScript",
    //                 lastEdited: project.updated_at || "2 hours ago",
    //                 language: project.language || "html",
    //                 favorite: project.favorite || false,
    //             }));
    //             setProjects(mappedData);
    //         } else {
    //             setError(data.message);
    //         }
    //     }
    //     catch (error) { 
    //         console.error("Error fetching user data:", error);  
    //         setError("Server Error Occured");
    //     }
    // }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    };

    

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout}}>{children}</AuthContext.Provider>
    );
};

export default AuthContext;