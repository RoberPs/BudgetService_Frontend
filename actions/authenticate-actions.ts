"use server"
import { LoginSchema,StatusErrorSchema } from "@/src/schemas"
import { cookies }from 'next/headers'
import {redirect} from 'next/navigation'

type StateActionsProps={
    errors:string[]
}

export const  authenticate = async (prevstate:StateActionsProps, formdata:FormData)=>{
    
    //Obtener datos del formulario
    const loginCredentials = {
        email:formdata.get('email'),
        password:formdata.get('password')

    }
    //Validar datas con zod y retornar errores
    const credentials = LoginSchema.safeParse(loginCredentials)
    
    if(!credentials.success){
        return{
            errors: credentials.error.errors.map((error)=>error.message)
        }
    }

    //Todo ok realizar data fetch

    const url = `${process.env.API_URL}/auth/login`

    const req = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            password:credentials.data.password,
            email:credentials.data.email,
            
        })
    })

    const json = await req.json()
    console.log(req.ok) //success 
    console.log({token:json}) // jwt usuario

    //Validar errores 
    if(!req.ok){
        const {error} = StatusErrorSchema.parse(json)
        return{
           errors:[error]
        }
    } 
     
    //Setear cookies 
    
    cookies().set({
        name:'user_token',
        value:json,
        httpOnly:true, //Solo puede acceder servidor de next 
        /* secure:false, */ //Solo con certificado SSL
        path:'/', //Disponible en todas las rutas 
    })

    //Redireccionar al usuario 
    
    redirect('/admin') //Al redireccional al usuario no es necesario retornar los errores 
    
    /*  return{
        errors:[]
       
    } */

}