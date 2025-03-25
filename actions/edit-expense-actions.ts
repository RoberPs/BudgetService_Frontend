"use server"

import { getTokenCookies } from "@/src/auth/token"
import { DraftExpenseSchema, StatusErrorSchema, SuccessSchema } from "@/src/schemas"
import {Budget, Expense} from '@/src/schemas'
import { revalidatePath } from "next/cache"

export type BudgetExpenseIds={
    budgetId:Budget['id'],
    expenseId:Expense['id']
}

type EditStateProps={
    errors:string[],
    success:string
}

export const editExpense = async(
    {budgetId , expenseId}:BudgetExpenseIds, 
    prevstate:EditStateProps,
    formData:FormData
)=>{

    const editFormData = {
        name:formData.get('name'),
        amount:formData.get('amount')
    }

    const expense = DraftExpenseSchema.safeParse(editFormData)
    
    if(!expense.success){
           
        return{
            errors:expense.error.errors.map(issue=>issue.message),
            success:''
        }

    }

    //Actualizar el gasto
     
    const token = getTokenCookies()
    const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`

    const req = await fetch(url,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`     
        },
        body: JSON.stringify({
            name:expense.data.name,
            amount:expense.data.amount
        })
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