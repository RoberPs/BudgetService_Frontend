"use client"
import { changePasword } from "@/actions/change-password-action"
import { useFormState } from "react-dom"
import ErrorMessage from "../ui/ErrorMessage"
import { useEffect, useRef } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"




export default function ResetPasswordForm() {
     
    const router = useRouter()
    const ref = useRef<HTMLFormElement>(null) //añadir el tipo htlmformelement
    const[state, dispatch] = useFormState(changePasword,{
        errors:[],
        success:''
    })
         


    useEffect(()=>{
        
       if(state.success){
           toast.success(state.success)
           router.push('/admin')
           ref.current?.reset()
       }

    },[state,router])

    return (

      <form
        action={dispatch}    
        className=" mt-14 space-y-5"
        noValidate
      >
        
        {state.errors.map(error=><ErrorMessage key={error}>{error}</ErrorMessage>)}    
     
        <div className="flex flex-col gap-5">
          <label
            className="font-bold text-2xl"
          >Password Actual</label>
  
          <input
            id="current_password"
            type="password"
            placeholder="Introduce el password actual"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="current_password"
          />
        </div>
        <div className="flex flex-col gap-5">
          <label
            className="font-bold text-2xl"
          >Nuevo Password</label>
  
          <input
            id="new_password"
            type="password"
            placeholder="Indica el nuevo password"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="new_password"
          />
        </div>
  
        <div className="flex flex-col gap-5">
          <label
            className="font-bold text-2xl"
          >Repetir Password</label>
  
          <input
            id="password_confirmation"
            type="password"
            placeholder="Repite en nuevo password"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="password_confirmation"
          />
  
        </div>
  
        <input
          type="submit"
          value='Cambiar Password'
          className="text-[#16253d] hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer block"
        />
      </form>
    )
  }