import LogoutButton from '@/components/LogoutButton'
import { FC } from 'react'

interface pageProps {
  
}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
        <h1
        className='text-2xl font-semibold text-center py-10 pb-4'
        >
            Welcome to the dashboard
        </h1>
        <div
        className='flex justify-center'
        >
            <LogoutButton />
        </div>
    </div>
  )
}

export default page