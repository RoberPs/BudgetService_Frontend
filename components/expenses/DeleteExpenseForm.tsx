
import { deleteExpenseId } from "@/actions/delete-expense-actions";
import { DialogTitle } from "@headlessui/react"
import { useParams, useSearchParams } from "next/navigation"
import { useEffect} from "react";
import { useFormState } from "react-dom";
import ErrorMessage from "../ui/ErrorMessage";
import { toast } from "react-toastify";


export const DeleteExpenseForm = ({closeModal}:{closeModal: ()=> void}) => {
  
  const { id: budgetId } = useParams()
  const searchParams = useSearchParams()
  const expenseId = searchParams.get('deleteExpenseId')!
  
  const deleteExpense = deleteExpenseId.bind(null,{
      budgetId:+budgetId,
      expenseId:+expenseId,
  })
  const[state, dispatch] = useFormState(deleteExpense,{
      errors:[],
      success:''
  })
  
  //LA VALIDACIÓN TAMBIEN SE REALIZA EN EL FRONT 
  useEffect(()=>{
      
     if(!Number.isInteger(+budgetId) || !Number.isInteger(+expenseId)){
        closeModal()
     } 

  },[state,closeModal])

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
        Eliminar Gasto
      </DialogTitle>
      <p className="text-xl font-bold">Confirma para eliminar, {''}
        <span className="text-[#336b87]">el gasto</span>
      </p>
      <p className='text-gray-600 text-sm'>(Un gasto eliminado no se puede recuperar)</p>
      {state.errors.map(issue=><ErrorMessage key={issue}>{issue}</ErrorMessage>)} 
      <div className="grid grid-cols-2 gap-5 mt-10">
        <button
          className="bg-[#efb509] w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          onClick={closeModal}
        >Cancelar</button>
        <button
          onClick={()=>dispatch()}
          type='button'
          className="bg-red-500 w-full p-3 text-white uppercase font-bold hover:bg-red-600 cursor-pointer transition-colors"
        >Eliminar</button>
      </div>
    </>
  )
}