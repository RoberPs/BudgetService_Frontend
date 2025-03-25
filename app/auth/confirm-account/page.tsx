import ConfirmToken from '@/components/auth/ConfirmToken'
import React from 'react'

const ConfirmAccountPage = () => {
  return (
    <>
      <h1 className='font-black text-4xl text-[#16253d]'>Confirma tu cuenta</h1>
      <p className='font-bold text-xl'>Ingresa el codigo que recibiste en <span className='text-orange-600'>por email</span></p>
    
       <ConfirmToken/>
    </>
  )
}

export default ConfirmAccountPage