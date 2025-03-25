"use client"
import { DialogTitle } from "@headlessui/react";
import { ExpenseForm } from "./ExpenseForm";
import { createNewExpense } from "@/actions/new-expense-actions";
import { useFormState } from "react-dom";
import { useParams } from "next/navigation";
import ErrorMessage from "../ui/ErrorMessage";
import { useEffect } from "react";
import { toast } from "react-toastify";


export const  AddExpenseForm = ({closeModal}:{closeModal:() => void}) =>{
   
  const {id} = useParams()

  const createNewExpenseWithId = createNewExpense.bind(null,+id) 
  const[state, dispatch] = useFormState(createNewExpenseWithId,{
         
       errors:[],
       success:''
  })

  useEffect(()=>{
      
      if(state.success){
        toast.success(state.success)
        closeModal()
      }
      

  },[state,closeModal])


  return (
    <>
      <DialogTitle
        as="h3"
        className="font-black text-4xl text-[#16253d] my-5"
      >
        Agregar Gasto
      </DialogTitle>

      <p className="text-xl font-bold">Llena el formulario y crea un {''}
        <span className="text-[#336b87]">gasto</span>
      </p>
      <form
        action={dispatch}
        className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border"
        noValidate
      >

        {state.errors.map(error=> <ErrorMessage key={error}>{error}</ErrorMessage>)}
        <ExpenseForm />
         
        <input
          type="submit"
          className="bg-[#efb509] w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value='Registrar Gasto'
        />
      </form>
    </>
  )
}