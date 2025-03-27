import React from 'react'
import useOutsideClick from '../hooks/useOutsideClick'

const Modal = ({children, setShow}) => {
const modal = useOutsideClick(() => {
  setShow(false)
})

  return (
    <div className='w-full h-full min-h-screen bg-sky-900 flex justify-center items-center'>
      <div ref={modal} className='w-full h-full text-black bg-black'>
        {children}
      </div>

    </div>
  )
}

export default Modal