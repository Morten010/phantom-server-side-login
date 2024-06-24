"use client"

import { logout } from '@/server/Logout'
import { FC } from 'react'

interface LogoutButtonProps {
  
}

const LogoutButton: FC<LogoutButtonProps> = ({}) => {
  const handleClick = async () => {
    console.log("handleClick");
    
    await logout()
  }
  return (
    <button
    className='bg-red-500 rounded px-4 py-2 text-white hover:bg-red-700 transition-colors duration-150'
    onClick={() => handleClick()}
    >
        Logout
    </button>
  )
}

export default LogoutButton