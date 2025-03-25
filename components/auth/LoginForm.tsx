"use client"

import { authenticate } from "@/actions/authenticate-actions"
import { useEffect } from "react"
import { useFormState } from "react-dom"
import {toast} from 'react-toastify'

const LoginForm = () => {


   const[state, dispatch]= useFormState(authenticate,{
        errors:[] 
   })


   useEffect(()=>{
       
    if(state.errors){
        
        state.errors.forEach(error=>{
            toast.error(error)
        })
    }
    
   },[state])

   return (
    <>
        <form 
        action={dispatch}
        className="mt-14 space-y-5" 
        noValidate
        >
            <div className="flex flex-col gap-2">
                <label
                    className="font-bold text-2xl text-[#16253d]"
                >Email</label>

                <input
                    id="email"
                    type="email"
                    placeholder="Email de Registro"
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    name="email"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    className="font-bold text-2xl text-[#16253d]"
                >Password</label>

                <input
                    type="password"
                    placeholder="Password de Registro"
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    name="password"
                />
            </div>

            <input
                type="submit"
                value='Iniciar Sesión'
                className=" bg-[#336b87] hover:bg-[#24546c] w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
            />
        </form>
    </>
)

}

export default LoginForm