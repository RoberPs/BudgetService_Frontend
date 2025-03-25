
import { ProfileForm } from '@/components/profile/ProfileForm'
import { verifySession } from '@/src/auth/dal'
import React from 'react'

const SettingsPage = async () => {

  const {user} = await verifySession()
  return (
    <>
        <h1 className="font-black text-4xltext-[#16253d] my-5">Actualizar Perfil</h1>
        <p className="text-xl font-bold">Aquí puedes cambiar los datos de tu {''}
            <span className="text-[#336b87]">perfil</span>
        </p>

        <ProfileForm user={user}/>
    </>
  )
}

export default SettingsPage

