import React from 'react'
import useOutsideClick from '../hooks/useOutsideClick'

// This Model is Used for Creating a Model that can be used to create a new project
const Modal = ({children, setShow}) => {
const modal = useOutsideClick(() => {
  setShow(false)
})

  return (
    <div className='fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
      <div ref={modal} className='w-fit h-fit '>
        {children}
      </div>

    </div>
  )
}

export default Modal