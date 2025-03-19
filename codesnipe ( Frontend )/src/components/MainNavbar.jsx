import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { ShinyButton } from './Button'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useNavigate } from 'react-router-dom'
import { API_BASE_URL, userLoggedIn } from '../../helper'
import useOutsideClick from '../hooks/useOutsideClick'

const MainNavbar = () => {
  const nav = useNavigate();
  const [userdata, setUserData] = useState();
  const [userDetails, setUserDetails] = useState(false);
  const model = useOutsideClick(() => setUserDetails(false));

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(API_BASE_URL + "userDetails", {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: localStorage.getItem("userId") }),
        });
        
        const data = await response.json();
        if (data.success) {
          setUserData(data.user);
          console.log(data);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to fetch user data");
      }
    };
    if(userLoggedIn()) {
      fetchUserData();
    }
  }, []);

  const lastLogin = () => {
    const date = new Date(userdata.lastOnline);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${day}/${month}/${year} ${hours}:${minutes}`
  }

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    nav("/login");
  }
  return (
    <div className='w-full h-[5rem] flex justify-between items-center px-2 z-0'>
      <div className='w-full h-full overflow-hidden relative'>
      <div className='absolute -top-10 cursor-pointer' onClick={() => nav("/")}>
        <img src="/codesnipe.gif" alt="CodeSnipe Logo" className='w-[10rem] h-full object-contain' />
      </div>
      </div>
      
      <div className='w-full h-[4rem] flex px-12 justify-end items-center'>
        <div className='flex h-fit w-fit justify-center items-center'>
  
          {userLoggedIn() ? (
            <>
              <div className="relative flex items-center gap-2 bg-white w-[2.8rem] h-[2.8rem] rounded-full border cursor-pointer"
                onClick={() => setUserDetails(!userDetails)}
              >
                <img src="https://i.pinimg.com/474x/59/77/92/597792dff8c2fe8729218359fa15b16c.jpg"
                  alt="" className='w-full h-full object-cover rounded-full' />
                
                {/* Profile Dropdown - Fixed Outside Overflow Hidden */}
                {userDetails && (
                  <div className='absolute top-[54px] -right-8 w-[12rem] h-fit rounded-lg flex flex-col items-center bg-[#050a1f] border border-gray-700 text-white p-3 space-y-2 z-50 shadow-lg' ref={model}>
                    <h1 className='uppercase font-bold text-lg text-sky-600 break-all'>{userdata?.username}</h1>
                    <h1 className='text-sm inline-block truncate w-full text-center'>{userdata?.email}</h1>
                    <h1 className='text-sm inline-block truncate w-full text-center'>Last Login</h1>
                    <div className='bg-white w-full h-fit rounded-lg text-sky-600 font-bold'>
                      <h1 className='text-center'>{userdata?.lastOnline && lastLogin()}</h1>
                    </div>
                    <ShinyButton onClick={() => logout()}>
                      Logout
                    </ShinyButton>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <ShinyButton onClick={() => nav("/login")} >
                <div className="flex items-center gap-2">
                  <Icon icon="tdesign:code" className="w-5 h-5" />
                  <span>Login</span>
                </div>
              </ShinyButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainNavbar