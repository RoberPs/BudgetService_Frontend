"use server"
import{ForgotPasswordSchema, StatusErrorSchema, SuccessSchema} from '@/src/schemas/index'

type ActionStateType ={
    errors:string[],
    success:string
}

export const forgotPassword = async( prevstate:ActionStateType,formdata:FormData)=>{
    
    
    //Obtener el email del formulario
    const forgotPassword = {
        email:formdata.get('email')
    }

    const email = ForgotPasswordSchema.safeParse(forgotPassword)
    
    //Validación del campo email 
    if(!email.success){
        
        return{
            errors:email.error.errors.map(issue=>issue.message),
            success:''
        }
    }

    const url = `${process.env.API_URL}/auth/forgot-password`
    const req = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(email.data)
    })

    const res = await req.json()
    console.log(req)

    if(!req.ok){

      const results = StatusErrorSchema.parse(res)
      return{
        errors:[results.error],
        success:''
      }
    }

    const success = SuccessSchema.parse(res)
    
    return{
        errors:[],
        success:success
    }

}

