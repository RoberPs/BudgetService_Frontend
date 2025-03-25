"use server"

import { getTokenCookies } from "@/src/auth/token"
import { DraftBudgetSchema,SuccessSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"


type StateActionsForm ={
    errors:string[]
    success:string
}

export const newBudget = async (prevstate:StateActionsForm, formdata:FormData)=>{
    

    const dataBudget = {
        "name":formdata.get('name'),
        "amount":formdata.get('amount')
    }

    const budget = DraftBudgetSchema.safeParse(dataBudget)

    if(!budget.success){
        return{
            errors:budget.error.issues.map(issues=>issues.message),
            success:''
        }
        
    }

    //Para crear y guardar un presupuesto se requiere el jwt token del usuario
    
    const token = getTokenCookies()
   
    // Enviar datos y token en el bearer
     
    const url = `${process.env.API_URL}/budgets`
    const req = await fetch(url,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify({
           name:budget.data.name,
           amount:budget.data.amount,
           visibility:true
        })
        
     })
      
     const json = await req.json()

    /*  if(!req.ok){
         const {error} = StatusErrorSchema.parse(req)
         return{
            errors:[error]
         }   
     } */

     revalidatePath('/admin')
     const success = SuccessSchema.parse(json)

     
    return{
        errors:[],
        success
    }
}
