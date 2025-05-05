import React from 'react'
import { Icon } from '@iconify/react/dist/iconify.js';
import { FloatingNav } from '../components/Topbar';
import { EditorNav } from '../components/EditorBar';
import { Share } from './Editor';
import { useParams } from 'react-router-dom';

const EditorNavbar = () => {
    const { projectid } = useParams();
    const shareFunction = Share(projectid);
    
    const navItems = [
        { name: "Explore", link: "/", icon: <Icon icon="mdi:home" width="20" /> },
        { name: "Share", link: "#", icon: <Icon icon="material-symbols:share-outline" width="20" /> },
      ];
    
  return (
    <div>
         <EditorNav navItems={navItems} shareFunction={shareFunction} />
    </div>
  )
}

export default EditorNavbar