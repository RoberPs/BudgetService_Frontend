"use server"

import { getTokenCookies } from "@/src/auth/token"
import { ProfileFormSchema, StatusErrorSchema, SuccessSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

type StateFormProps={
    errors:string[],
    success:string
}

export const updateProfile = async(prevstate:StateFormProps,formdata:FormData)=>{

    
    const profile = ProfileFormSchema.safeParse({
        name:formdata.get('name'),
        email:formdata.get('email')

    })

    if(!profile.success){
        
        return{

            errors: profile.error.issues.map(error=>error.message),
            success:''
        }
    }

    const token = getTokenCookies()
    const url = `${process.env.API_URL}/auth/user`
    const req = await fetch(url,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer: ${token}`
        },
        body:JSON.stringify({
            name:profile.data.name,
            email:profile.data.email
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
    revalidatePath('/admin/profile/settings')

    return{
        errors:[],
        success
    }
}
