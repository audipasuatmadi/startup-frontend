import React from 'react'
import { useUserData, useUserStorage } from '../hooks/userHooks'
import Link from 'next/link'

interface Props {
  
}



const Navbar = (props: Props) => {
  

  return (
    <nav className="py-2 fixed flex items-center gap-4 w-screen shadow z-50">
      <Link href="/">
        <a className="ml-8">Elites Bible</a>
      </Link>
      

    </nav>
  )
}

export default Navbar
