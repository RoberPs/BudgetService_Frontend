"use server"

import { getTokenCookies } from "@/src/auth/token"
import { StatusErrorSchema, SuccessSchema, UpdatePasswordSchema } from "@/src/schemas"


type StateActionsForm ={
    errors:string[],
    success:string
}

export const changePasword = async(prevState:StateActionsForm, formData:FormData)=>{
   
    const passwordsForm = {
        current_password: formData.get('current_password'),
        new_password:formData.get('new_password'),
        password_confirmation:formData.get('password_confirmation'),
    }

    const dataPasswords = UpdatePasswordSchema.safeParse(passwordsForm)
    if(!dataPasswords.success){
      
        return {
            errors: dataPasswords.error.issues.map(error=>error.message),
            success:''
       }
    }

    

    const token = getTokenCookies()
    const url = `${process.env.API_URL}/auth/update-password`
    const req = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify({
            current_password:dataPasswords.data.current_password,
            new_password:dataPasswords.data.new_password,
        }) 
    })

    const json = await req.json();
    
    if(!req.ok){
        const error = StatusErrorSchema.parse(json)
        console.log(error)
        return{
            errors:[error.error],
            success:''
        }

    }

    const success = SuccessSchema.parse(json)
   
   return{
    errors:[],
    success
   }
}




