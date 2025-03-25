"use client"

import {register} from '@/actions/create-account-action'
import { useFormState } from 'react-dom'
import {ErrorMessage} from '@/components/ui/ErrorMessage'
import SuccessMessage from '../ui/SuccessMessage'
import { useEffect, useRef } from 'react'

//! FORMAS DE OBTENER LOS DATOS DEL FORMULARIO 
// * USESTATE REACT HOOKS en cada campo del formulario
// * REACT HOOK FORM 
// * FORMDATA con serverActions de NEXTJS(react 19  ya los incluye)

const RegisterForm = () => {
     
    //conectar el state con los errores de zod
    const[ state, dispatch] = useFormState(register,{
        errors:[], // se inicializa el estado con los errores
        success:'' // se inicializa el estado con el mensaje de exito
    }) // useActionState sera el nuevo nombre


    // !UNICA FORMA EN NEXT DE RESETEAR UN FORMULARIO 
    const ref = useRef<HTMLFormElement>(null) //añadir el tipo htlmformelement
    

    useEffect(()=>{
        
        //Cada vez que el state cambie

        if(state.success){

            ref.current?.reset() //resetea el formulario
        }

    },[state])
    
    return (

    <form ref={ref} action={dispatch} className="mt-14 space-y-5" noValidate >
        
        {state.errors.map(error=> <ErrorMessage key={error}>{error}</ErrorMessage>)}

        {state.success && <SuccessMessage>{state.success}</SuccessMessage>}

        <div className="flex flex-col gap-2">
            <label
                className="font-bold text-2xl text-[#16253d]"
                htmlFor="email"
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
            >Nombre</label>
            <input
                type="name"
                placeholder="Nombre de Registro"
                className="w-full border border-gray-300 p-3 rounded-lg"
                name="name"
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

        <div className="flex flex-col gap-2">
            <label
                className="font-bold text-2xl text-[#16253d]"
            >Repetir Password</label>
            <input
                id="password_confirmation"
                type="password"
                placeholder="Repite Password de Registro"
                className="w-full border border-gray-300 p-3 rounded-lg"
                name="password_confirmation"
            />
        </div>

        <input
            type="submit"
            value='Registrarme'
            className=" bg-[#336b87] hover:bg-[#24546c] w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer block"
        />
    </form>
  )
}

export default RegisterForm