import React from 'react'
import { Icon } from '@iconify/react/dist/iconify.js';
import { FloatingNav } from '../components/Topbar';
const TopNavbar = () => {
    const navItems = [
        { name: "Explore", link: "/", icon: <Icon icon="mdi:home" width="20" /> },
        { name: "Projects", link: "/code", icon: <Icon icon="mdi:cog" width="20" /> },
      ];
    
  return (
    <div>
         <FloatingNav navItems={navItems}  />
    </div>
  )
}

export default TopNavbar