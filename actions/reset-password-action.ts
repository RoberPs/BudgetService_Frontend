"use server"

import { ResetPasswordSchema,StatusErrorSchema, SuccessSchema } from "@/src/schemas"

type ActionStateType ={
    errors:string[]
    success:string
    
}

export const resetPassword = async(token:string, prevstate:ActionStateType ,formData:FormData)=>{
    
   
    const newPassword = {
        password:formData.get('password'),
        password_confirmation:formData.get('password_confirmation')
    }
    
    const resetPassword = ResetPasswordSchema.safeParse(newPassword)

    if(!resetPassword.success){
        
        return{
            errors:resetPassword.error.issues.map(issue=>issue.message),
            success:''
        }
    }
    
    //Realizar peticion al backend con el token y el nuevo password 

    const url = `${process.env.API_URL}/auth/reset-password/${token}`
    
    const req = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            password:resetPassword.data.password
        })
    })
    
    const res = await req.json()
    if(!req.ok){
        const {error} = StatusErrorSchema.parse(res)
        return{
            errors:[error],
            success:''  
        }
    } 

     const success = SuccessSchema.parse(res) 

    return{
        errors:[],
        success
    }
}
