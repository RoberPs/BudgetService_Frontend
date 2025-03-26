import PasswordResetHandler from '@/components/auth/PasswordResetHandler'
import React from 'react'


//En esta pagina se monta un componente el cual va a evaluar si esta confirmado el token o no
//1-Si no hay token confirmado carga el componente de CONFIRMAR TOKEN enviado a email de usuario
//2-Si el token ha sido introducido carga el componente de NUEVO PASSWORD

const NewPasswordPage = () => {
  return (
      <>
        <h1 className="font-black text-4xl text-[#16253d]">Reestablecer Password</h1>
        <p className="text-xl font-bold">Ingresa el código que recibiste
           <span className="text-[#336b87]"> por email</span>
        </p>
          
        <PasswordResetHandler/>

      </>
  )
}

export default NewPasswordPage
