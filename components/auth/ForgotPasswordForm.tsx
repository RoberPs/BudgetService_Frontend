"use client"
import { forgotPassword } from "@/actions/forgot-password-actions"
import { useEffect } from "react"
import { useFormState } from "react-dom"
import {toast} from 'react-toastify'


const ForgotPasswordForm =() => {

  const [state, dispatch] = useFormState(forgotPassword,{
    errors:[],
    success:''
  })
  
  useEffect(()=>{
      
    if(state.errors){
        
        state.errors.forEach(error=>{
            toast.error(error)
        })
    }

    if(state.success){
        toast.success(state.success)
    }

  },[state])

  return (
    <div>
        
        <form 
         action={dispatch}
         
         className='mt-4'
         >
            <div className='mb-4'>
            <label className='block text-[#16253d] text-sm font-bold mb-2'>Correo Electrónico</label>
            <input name="email" type='email' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
            </div>
            <button className='bg-[#336b87] hover:bg-[#24546c] w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>Enviar</button>
        </form>
    </div>
  )
}

export default ForgotPasswordForm
