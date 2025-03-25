"use server"

import { getTokenCookies } from "@/src/auth/token"
import { Budget, PasswordSchema, StatusErrorSchema, SuccessSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

type StateFormActions ={
    errors:string[],
    success:string
   
}

export const deleteBudget= async(budgetId: Budget['id'], prevState:StateFormActions, formData:FormData)=>{
     
    const data = formData.get('password')

    const password = PasswordSchema.safeParse(data)

    if(!password.success){

       return{
          errors:password.error.errors.map(issue=>issue.message),
          success:''
       }
    }

    //COMPROBAR PASSWORD CORRECTO

    const token = getTokenCookies()
    console.log(token)
    const url = `${process.env.API_URL}/auth/check-password`

    const req = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify({password:password.data})
    })

    const json = await req.json()
    console.log(json)

    if(!req.ok){

        const {error} = StatusErrorSchema.parse(json)
        return{
            errors:[error],
            success:''
        }
    }


    //ELIMINAR EL PPTO 

    const deleteBudgetUrl = `${process.env.API_URL}/budgets/${budgetId}`
    const deleteBudgetRequest = await fetch(deleteBudgetUrl,{
         
        method:'DELETE',
        headers:{
            'Authorization':`Bearer ${token}`,
            'Content-Type':'application/json'
        }

    })

    const deleteBudget = await deleteBudgetRequest.json()
    
    if(!deleteBudgetRequest.ok){

        const {error} = StatusErrorSchema.parse(deleteBudget)

        return{
            errors:[error],
            success:''
        }
    }

    revalidatePath('/admin')
    const success = SuccessSchema.parse(deleteBudget)

    return{
        errors:[],
        success
        
    }
}