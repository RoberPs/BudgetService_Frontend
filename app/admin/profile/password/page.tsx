import React from 'react'
import ChangePasswordForm from '@/components/profile/ChangePasswordForm'

const PasswordProfilePage = () => {
  return (
    <>
      <h1 className="font-black text-4xltext-[#16253d] my-5">Cambiar Password</h1>
      <p className="text-xl font-bold">Aquí puedes cambiar tu {''}
        <span className="text-[#336b87]">password</span>
      </p>
       
      <ChangePasswordForm />

    </>
  )
}

export default PasswordProfilePage