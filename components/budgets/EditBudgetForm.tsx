"use client"
import React, { useEffect } from 'react'
import { BudgetForm } from './BudgetForm'
import { Budget } from '@/src/schemas'
import { useFormState } from 'react-dom'
import { EditBudget } from '@/actions/edit-budget-action'
import ErrorMessage from '../ui/ErrorMessage';
import { toast } from 'react-toastify'
import  { useRouter } from 'next/navigation'

//El componenete BUDGETFORM contiene los campos del formulario 
//Este se va ha reutilizar tanto para crear un ppto como para editarlo
//Cada uno tiene actions diferentes asi que se mantiene la estructura del form / input
//pero los campos se trabajan a parte para crear y editar ya que son peticiones y acciones diferentes (post/get) 

export const EditBudgetForm = ({budget}:{budget:Budget}) => {


    //1 OBTENER LOS DATOS PARA LLENAR EL FORMULARIO (se pasan desde el EditPage / tambien se podria crear un estado global con zustand)
    //2 MUTAR LOS DATOS 
    const router = useRouter()
    const EditBudgetById = EditBudget.bind(null,budget.id)
    const[state, dispatch] = useFormState(EditBudgetById ,{
        
        errors:[],
        success:''
    })

    useEffect(()=>{ 
        if(state.success){
           toast.success(state.success)
           router.push('/admin')
        }
    },[state,router]) 

    return (
        <>
            <form
                action={dispatch}
                className="mt-10 space-y-3"
                noValidate
            >
                {state.errors.map(issue=> <ErrorMessage key={issue}>{issue}</ErrorMessage>)}           
                <BudgetForm budget={budget}/>
            <input
                type="submit"
                className="bg-[#efb509] w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
                value='Guardar Cambios'
                />
            </form>
       </>
  )
}
