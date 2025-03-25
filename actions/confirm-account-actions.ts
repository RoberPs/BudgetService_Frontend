"use server"
import { TokenSchema,StatusErrorSchema, SuccessSchema } from "@/src/schemas"
import { error } from 'console';

type ActionStateType ={
    errors: string[],
    
}

export  const confirmAccount = async ( token:string, prevState: ActionStateType) =>{

    
    //Validar token schema
    const tokenConfirm = await TokenSchema.safeParse(token)

    if(!tokenConfirm.success){
         
        return{
            errors: tokenConfirm.error.errors.map(error=>error.message),
            success:""
        }

    }
    
    //Todo ok peticion a backend para comprobar el token

     const tokenData = tokenConfirm.data

    //ENVIAR PETICION AL REST API EXPRESS 
         
        const url = `${process.env.API_URL}/auth/confirm-account`
        
        //SE UTILIZA FETCH YA QUE ES NATIVO DE NODE Y NEXT
        const request = await fetch(url, {
             method:'POST',
             headers:{
                    'Content-Type':'application/json'
             },
             body:JSON.stringify({
                token:tokenData,
             }) // siempre como JSON string no como un objeto
        })
        
        //RESPUESTA DEL SERVIDOR
        
        const json = await request.json()
        
        if(!request.ok){

            const {error} = StatusErrorSchema.parse(json)

            return{
                errors: [error]
            }
        }
     
        const success = SuccessSchema.parse(json)

     return{
        errors:[],
        success

     }

}