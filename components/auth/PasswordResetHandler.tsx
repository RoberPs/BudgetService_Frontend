"use client"
import {useState} from 'react'
import ResetPasswordForm from './ResetPasswordForm'
import ValidateTokenForm from './ValidateTokenForm'

const PasswordResetHandler = () => {

  const[token, setToken] = useState('') // state en el componente padre para poder pasar el token hacia los 2 componentes que interactuan juntos
  const[isValidToken, setIsValidToken] = useState(false)
  
  //Para poder cambiar al form del nuevo password hay pasar en la función del state al success del ValidTokenForm
  return (
    <>
        {!isValidToken ? 
        (<ValidateTokenForm
          setIsValidToken={setIsValidToken}
          token={token}
          setToken={setToken}
        /> )
        :
        ( 
        <ResetPasswordForm 
          token={token}
          
        /> 
        )}
    </>
    
  )
}

export default PasswordResetHandler