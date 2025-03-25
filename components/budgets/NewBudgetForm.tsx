"use client"
import { newBudget } from "@/actions/create-budget-actions"
import { useEffect } from "react"
import { useFormState } from "react-dom"
import { toast } from "react-toastify"
import ErrorMessage from "../ui/ErrorMessage"
import { useRouter } from "next/navigation"
import { BudgetForm } from "./BudgetForm"

  //El componenete BUDGETFORM contiene los campos del formulario 
  //Este se va ha reutilizar tanto para crear un ppto como para editarlo
  //Cada uno tiene actions diferentes asi que se mantiene la estructura del form / input
  //pero los campos se trabajan a parte para crear y editar ya que son peticiones y acciones diferentes (post/get) 

export default function NewBudgetForm() {

  const router = useRouter()

  const[ state, dispatch] = useFormState(newBudget,{
        
    errors:[],
    success:''
  })  

   useEffect(()=>{

     if(state.success){
        
        toast.success(state.success,{
          //onClose:(()=>{
          //    router.push('/admin')
          //}),
          //onClick:(()=>{
          //    router.push('/admin')
          //})
        })
        router.push('/admin')
      
     }

  },[state,router]) 



  return (
    <form
      action={dispatch}
      className="mt-10 space-y-3"
      noValidate
    >
      {state.errors.map(error=> <ErrorMessage key={error}>{error}</ErrorMessage>)}
          <BudgetForm />
      <input
        type="submit"
        className="bg-[#efb509] w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
        value='Crear Presupuesto'
      />
    </form>
  )
}
