import React from 'react'
import { FloatingDock } from '../components/Navbar';
import { IconHome, IconUser, IconSettings } from "@tabler/icons-react"; // or any other icons


const navigationItems = [
    {
      title: "Home",
      href: "/",
      icon: <IconHome className="w-full h-full" />,
    },
    {
      title: "Profile",
      href: "/code",
      icon: <IconUser className="w-full h-full" />,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <IconSettings className="w-full h-full" />,
    },
  ];
  // here are some changes in the navbar
  
const Navbar = () => {
  return (
    <div>
         <FloatingDock
            items={navigationItems}
            desktopClassName="fixed bottom-4 left-1/2 -translate-x-1/2" // Center at bottom
            mobileClassName="fixed bottom-4 right-4" // Bottom right corner
          />
    </div>
  )
}

export default Navbar