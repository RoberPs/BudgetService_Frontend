"use client"
import { useRouter } from "next/navigation"

export const AddExpensesButton = () => {

    const router = useRouter()

  return (
    <button 
     type='button'
     className='bg-[#efb509] text-white py-2 px-5 font-bold rounded-lg cursor-pointer'
     onClick={()=>{router.push(location.pathname +'?addExpense=true&showModal=true')}}
     >
           Agregar Gasto
    </button>
  )
}

