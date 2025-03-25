import {cache} from 'react'
import { getTokenCookies } from '../auth/token'
import { notFound } from 'next/navigation'
import { BudgetAPIResponseSchema } from '../schemas'


//Función para obtener el ppto de la base de datos segun id
export const getBudget = cache(async (budgetId:string) =>{
    
    //En el backend ya tenemos una validación que comprueba que el valor indicado el la url es un id de un ppto valido
    
    const token = getTokenCookies()
    const url = `${process.env.API_URL}/budgets/${budgetId}`

    const req = await fetch(url,{
        headers:{
           'Content-Type':'application/json',
           'Authorization': `Bearer ${token}`
        }
    })
   
    const json = await req.json()
   
    if(!req.ok){
         notFound()  
    }
    const budgetData = BudgetAPIResponseSchema.parse(json)
    return budgetData
     
})