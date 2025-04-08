import React from 'react'
import { Icon } from '@iconify/react/dist/iconify.js';
import { FloatingNav } from '../components/Topbar';
import { EditorNav } from '../components/EditorBar';
const EditorNavbar = () => {
    const navItems = [
        { name: "Explore", link: "/", icon: <Icon icon="mdi:home" width="20" /> },
        { name: "Share", link: "/editor/100", icon: <Icon icon="material-symbols:share-outline" width="20" /> },
      ];
    
  return (
    <div>
         <EditorNav navItems={navItems}  />
    </div>
  )
}

export default EditorNavbar