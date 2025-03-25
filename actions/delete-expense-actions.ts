"use server"

import { getTokenCookies } from "@/src/auth/token";
import { BudgetExpenseIds } from "./edit-expense-actions"
import { redirect } from 'next/navigation';
import { StatusErrorSchema, SuccessSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";


type ActionStateProps ={
    errors:string[],
    success:string
}

export const deleteExpenseId = async({budgetId, expenseId}:BudgetExpenseIds,prevstate:ActionStateProps)=>{
  const token = getTokenCookies()
  const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`
  
  const req = await fetch(url,{
    method:'DELETE',
    headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`     
    },
  })

  const json = await req.json()
  if(!req.ok){
    const {error} = StatusErrorSchema.parse(json)
    return{
        errors:[error],
        success:''
    }
  }

  const success = SuccessSchema.parse(json)
  revalidatePath(`/admin/budget/${budgetId}`)
  
  return{
    errors:[],
    success
  }
}

