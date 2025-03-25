"use client"
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { useRouter } from 'next/navigation'
import {toast} from 'react-toastify'
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { confirmAccount } from '@/actions/confirm-account-actions'
// import ErrorMessage from '../ui/ErrorMessage' 
// import SuccessMessage from '../ui/SuccessMessage'
const ConfirmToken = () => {

  const router = useRouter()  //Redirecciona programadamente al usuario una vez confirma su cuenta

  const [token, setToken] = useState("") //
  const [iscomplete, setIscomplete] = useState(false)  //hook para detectar si el token ha finalizado en su sexto digito
 
  //Para poder pasar el token al server-action se crea como una copia de la funcion del server y con bind se pueden pasar valores
  const confirmAccountWithToken = confirmAccount.bind(null, token)
  const [state, dispatch] = useFormState(confirmAccountWithToken,{
     
       errors:[],  //estado inicial 
       success:''

  }) //useActionState

  
  //Revisa que se ha completado el 6 digito del token
  useEffect(()=>{
    if(iscomplete){
       dispatch()
    }
 },[iscomplete,dispatch])

  //Hook para revisar y mostrar mensajes de error o exito del state
  useEffect(()=>{
        {/* {state.errors.map(error=><ErrorMessage>{error}</ErrorMessage>)} */} 
        if(state.errors){
          state.errors.forEach(error=>{
            toast.error(error)
            
          })
        }
        {/* {state.success && <SuccessMessage>{state.success}</SuccessMessage>} */}
        if(state.success){
          toast.success(state.success,{
            onClose :()=>{
               router.push('/auth/login')
            }
          })
        }

  },[state,router])

  //Obtiene los valores de la cadena del token
  const handleChange = ( token:string)=>{
      setToken(token) 
      setIscomplete(false) 
  }
  
  //Detecta el fin de la cadena de digitos
  const handleComplete = ()=>{
      setIscomplete(true)   
  }

  return (
    <>     
        <div className='flex justify-center gap-5 mt-10'>
              <PinInput
                value={token}
                onChange={handleChange}
                onComplete={handleComplete}
              >
                <PinInputField className='h-10 w-10 border border-gra-300 placeholder-white shadow rounded-lg text-center'/>
                <PinInputField className='h-10 w-10 border border-gra-300 placeholder-white shadow rounded-lg text-center'/>
                <PinInputField className='h-10 w-10 border border-gra-300 placeholder-white shadow rounded-lg text-center'/>
                <PinInputField className='h-10 w-10 border border-gra-300 placeholder-white shadow rounded-lg text-center'/>
                <PinInputField className='h-10 w-10 border border-gra-300 placeholder-white shadow rounded-lg text-center'/>
                <PinInputField className='h-10 w-10 border border-gra-300 placeholder-white shadow rounded-lg text-center'/>
              </PinInput>
        </div>
      
    
    </>
  )
}

export default ConfirmToken