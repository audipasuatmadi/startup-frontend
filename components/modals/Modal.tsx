import React from 'react'
import FocusTrap from 'focus-trap-react'

interface Props {
  children: any
  isLabelOnly?: boolean
}

const Modal = ({children, isLabelOnly}: Props) => {

  
  return (
    <FocusTrap>
      <div className="fixed m-0 left-0 right-0 z-50 w-screen h-screen bg-black opacity-50 flex items-center justify-center" tabIndex={0}>
        {children}
        {isLabelOnly && <div tabIndex={0} /> }
      </div>
    </FocusTrap>
  )
}

export default Modal
