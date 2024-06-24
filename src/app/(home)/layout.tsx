import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { FC } from 'react'

interface layoutProps {
  children: React.ReactNode
}

const layout: FC<layoutProps> = ({ children }) => {
    const cookieStore = cookies()
    const walletAddress = cookieStore.get("walletAddress")

    if(!walletAddress){
        return children
    }
  
    return redirect("/dashboard")
}

export default layout