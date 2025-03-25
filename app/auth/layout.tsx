import React, { ReactNode } from 'react'
import type {Metadata} from 'next'
import Logo from '@/components/ui/Logo'
import ToastNotifications from '../../components/ui/ToastNotifications';
import Link from 'next/link';
export const metadata: Metadata = {
  title: "Administar cuenta",
  description:"Administra tu cuenta",
};


const AuthLayout = ({children}:{children:ReactNode}) => {

  return (
   
    <>
    <div className='grid grid-cols-1 md:grid-cols-2 h-screen gap-5'>
        
        <div className='bg-[#336b87] md:bg-auth bg-no-repeat bg-left-bottom bg-30'>

          <div className='flex justify-center mt-10'>
          <Link href={'/'}>
              <Logo />
          </Link>
          </div>
        </div>
        
        <div className='p-10 lg:py-20'>

          {children}
          
        </div>
         
    </div>

    <ToastNotifications />
    </>
  )
}

export default AuthLayout