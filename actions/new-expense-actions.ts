"use server"
import { getTokenCookies } from '@/src/auth/token';
import { Budget, DraftExpenseSchema, StatusErrorSchema, SuccessSchema } from '../src/schemas/index';
import { revalidatePath } from 'next/cache';


type StateActionForm = {
    errors:string[],
    success:string
}

export const createNewExpense = async(id:Budget['id'], prevState:StateActionForm, formData:FormData)=>{
    

    const  expenseData = {

        name:formData.get('name'),
        amount:formData.get('amount')
    }

    const expenses = DraftExpenseSchema.safeParse(expenseData)

    if(expenses.error){

        return{
            errors:expenses.error.issues.map(error=>error.message),
            success:''
        }
    }
    const token = getTokenCookies()
    const newExpenseUrl = `${process.env.API_URL}/budgets/${id}/expenses`
    const expenseRequest = await fetch(newExpenseUrl,{
         
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`     
        },
        body:JSON.stringify({
            name:expenses.data.name,
            amount:expenses.data.amount
        })
    })


    const json = await expenseRequest.json()

    if(!expenseRequest.ok){

        const {error} = StatusErrorSchema.parse(json)
        return{
            errors:[error],
            success:''
        }
    }

    const success = SuccessSchema.parse(json)
    revalidatePath(`/admin/budget/${id}`)

    return{
        errors:[],
        success
    }
}