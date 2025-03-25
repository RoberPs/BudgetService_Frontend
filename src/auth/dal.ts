
//DATA ACCESS LAYER 
//capa donde se comprueba si un usuario esta authenticado 
// y  tiene permisos
import "server-only"
import {cache} from 'react'
import { redirect } from 'next/navigation'

import { UserAuthSchema } from '../schemas'
import { getTokenCookies } from "./token"


//Cache almacena la consulta si los datos no han cambiado
//mejor performance 
export const verifySession = cache(async()=>{

   //Recuperar el token de las cookies creado al logearse
   const token = getTokenCookies()
   
   if(!token){
      redirect('/auth/login')
   } 
     
   //Verificar que el jwt es correcto,no ha expirado,no ha sido modificado etc...   
   const url = `${process.env.API_URL}/auth/user`
   const req = await fetch(url,{
        method:'GET',
        headers:{
            'Authorization':`Bearer ${token}`
        },
   })

   //Obtener la respusta y validar la entrada de los datos con zod
   const session  = await req.json()
   //console.log(session)
   const result = UserAuthSchema.safeParse(session)
   //console.log(result)
    
   if(!result.success){
        redirect('/auth/login')
   }
   
   return {
      user:result.data,
      isAuth:true
   }   
 })

