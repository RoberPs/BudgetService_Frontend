"use client"
import { DialogTitle } from "@headlessui/react";
import { ExpenseForm } from "./ExpenseForm";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { EditExpense } from "@/src/schemas";
import { useFormState } from "react-dom";
import { editExpense } from "@/actions/edit-expense-actions";
import ErrorMessage from "../ui/ErrorMessage";
import { toast } from "react-toastify";

export const EditExpenseForm = ({ closeModal }: { closeModal: () => void }) => {
    
   //Es necesario el JWT solo accesible desde las cookies que se obtinen desde el servidor
   //En este punto este componenete es un client component dentro de otro(ModelContainer)  con lo que no 
   //NO es posible obtener datos de servers-actions  (solo funcinan en server-components)
   

   //Se necesita crear un  API ROUTE DE NEXT 
   //Esta se conecta con el backend/Express y desde aqui con api/route
  ///api/budgets/budgetId/expenses/expenseId
  
   const {id} = useParams()

   const expenseId = useSearchParams()
   const editExpenseId = expenseId.get('editExpenseId')!
   console.log(editExpenseId)
   
   const editExpenseBudgetId = editExpense.bind(null,{
        budgetId:+id,
        expenseId:+editExpenseId
   })
   const[state, dispatch] = useFormState(editExpenseBudgetId,{
       
      errors:[],
      success:''

   })
   const[expenseData , setExpenseData] = useState<EditExpense>()
  
  //LA INFORMACIÓN LLEGA DESDE API ROUTE NO DESDE EXPRESS
   useEffect(()=>{
        const url = `${process.env.NEXT_PUBLIC_URL}/admin/api/budgets/${id}/expenses/${editExpenseId}`
        fetch(url)
          .then(res =>res.json())
          .then(data => setExpenseData(data))
   },[editExpenseId,id])
   
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
        Editar Gasto
      </DialogTitle>
      <p className="text-xl font-bold">Edita los detalles de un {''}
        <span className="text-[#336b87]">Gasto</span>
      </p>
      
      {state.errors.map(error=><ErrorMessage key={error}>{error}</ErrorMessage>)}

      <form
        action={dispatch}
        className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border"
        noValidate
      >
         
          {expenseData && (

           <ExpenseForm  
             expenseData={expenseData!}
           />
          )}
         

        <input
          type="submit"
          className="bg-[#efb509] w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value='Guardar Cambios'
        />
      </form>
    </>
  )
}