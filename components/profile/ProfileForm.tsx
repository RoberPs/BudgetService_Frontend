"use client"
import {updateProfile} from '@/actions/update-profile-actions'
import { useFormState } from 'react-dom'
import ErrorMessage from '../ui/ErrorMessage'
import { useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import { UserAuth } from '@/src/schemas'

type UserProps ={
  user:UserAuth
}

export const ProfileForm = ({user}:UserProps) => {
  
  //Obtener el usuario de la sesion

  const ref = useRef<HTMLFormElement>(null)
  const [state, dispatch] = useFormState(updateProfile,{
      errors:[],
      success:''
  })

  useEffect(()=>{
      
      if(state.success){
          toast.success(state.success)
          ref.current?.reset()
      }

  },[state])

  return (
    <>
      <form
        action={dispatch}
        className=" mt-14 space-y-5"
        noValidate
      >
        {state.errors.map(error=><ErrorMessage key={error}>{error}</ErrorMessage>)}
        <div className="flex flex-col gap-5">
          <label
            className="font-bold text-2xl"
          >Nombre</label>
          <input
            defaultValue={user.name}
            type="name"
            placeholder="Tu Nombre"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="name"
          />
        </div>
        <div className="flex flex-col gap-5">
          <label
            className="font-bold text-2xl"
          >Email</label>

          <input
            defaultValue={user.email}
            id="email"
            type="email"
            placeholder="Tu Email"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="email"
          />
        </div>

        <input
          type="submit"
          value='Guardar Cambios'
          className="text-[#16253d] hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
        />
      </form>
    </>
  )
}

