import React from 'react'
import { Icon } from '@iconify/react/dist/iconify.js';
import { EditorNav } from '../components/EditorBar';

const EditorNavbar = () => {
    
    const navItems = [
        { name: "Explore", link: "/", icon: <Icon icon="mdi:home" width="20" /> },
      ];
    
  return (
    <div>
         <EditorNav navItems={navItems} />
    </div>
  )
}
export default EditorNavbar