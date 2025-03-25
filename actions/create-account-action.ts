"use server"
import {RegisterSchema, SuccessSchema, StatusErrorSchema} from '@/src/schemas'

//? REALIZAR PETICIONES HACIA EL SERVIDOR DE EXPRESS con server Actions


//RECUPERAR DATOS DEL FORMULARIO
// * tipado FormData de js para objeto formdata 

type ActionStateType ={
    errors:string[]
    success:string
}

export const register = async( prevState: ActionStateType, formdata:FormData)=>{
    
    const formdataRegister = {
        email:formdata.get('email'),
        name:formdata.get('name'),
        password:formdata.get('password'),
        password_confirmation:formdata.get('password_confirmation')
    }

    //VALIDACION DE DATOS CON ZOD

    const registerData = RegisterSchema.safeParse(formdataRegister)
    
    //Errors
    if(!registerData.success){
        
        const errors = registerData.error.errors.map((error)=>error.message)
        return {
            errors,
            success:prevState.success
        }
    }
    //data
    console.log(registerData.data)
    
    //La confirmación de password no se envia 
   /*  const{ password_confirmation,...rest } = registerData.data
 */
    //ENVIAR PETICION AL REST API EXPRESS 

    const url = `${process.env.API_URL}/auth/create-account`
    
    //SE UTILIZA FETCH YA QUE ES NATIVO DE NODE Y NEXT
    const request = await fetch(url, {
         method:'POST',
         headers:{
                'Content-Type':'application/json'
         },
         body:JSON.stringify({
            name:registerData.data.name,
            email:registerData.data.email,
            password:registerData.data.password

         }) // siempre como JSON string no como un objeto
    })
    
    //RESPUESTA DEL SERVIDOR
    const json = await request.json()
    
    //TRAER EL ERROR DEL BACKEND CUANDO EL USUARIO YA EXISTE 
    if(request.status === 409){  
        const error = StatusErrorSchema.parse(json)
        return{
            errors:[error.error],
            success:''
        }
    }
    
    //TODO OK VALIDACION DE RESPUESTA CON ZOD Y RETORNAR 
    const success = SuccessSchema.parse(json) // se usa parse para obtener solo la respuesta ya que en este punto no falla la respuesta    
    console.log(success)
    
    return{
        errors:[], //toma el valor incial del arreglo
        success// deberia ser un string 
    }
}

