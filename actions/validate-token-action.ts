
"use server"
import{TokenSchema, SuccessSchema, StatusErrorSchema} from '@/src/schemas/index'

type ActionStateType = {
    errors:string[],
    success:string
}


export const validateToken = async (token:string, prevstate:ActionStateType)=>{
   
   /*  console.log(token)
    console.log('desde validate token') */


    const validToken = TokenSchema.safeParse(token)

    if(!validToken.success){
        return{
            errors:validToken.error.errors.map(error=>error.message),
            success:''
        }
    }

    const url = `${process.env.API_URL}/auth/validate-token`

    const req = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({token:validToken.data})
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

    return{
        errors:[],
        success
    }
}
