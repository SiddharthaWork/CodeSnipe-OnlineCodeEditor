import React from 'react'
import { Icon } from '@iconify/react/dist/iconify.js';
import { FloatingNav } from '../components/Topbar';
const TopNavbar = () => {
    const navItems = [
        { name: "Home", link: "/", icon: <Icon icon="mdi:home" width="20" /> },
        { name: "Profile", link: "/profile", icon: <Icon icon="mdi:account" width="20" /> },
        { name: "Settings", link: "/settings", icon: <Icon icon="mdi:cog" width="20" /> },
      ];
    
  return (
    <div>
         <FloatingNav navItems={navItems}  />
    </div>
  )
}

export default TopNavbar