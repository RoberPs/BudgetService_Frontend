
"use server"
import { getTokenCookies } from "@/src/auth/token"
import { Budget, StatusErrorSchema, SuccessSchema } from "@/src/schemas"
import { DraftBudgetSchema } from "@/src/schemas"
import { revalidatePath, revalidateTag } from "next/cache"


type StateActionsForm = {
    errors:string[],
    success:string
}

export const EditBudget = async( budgetId:Budget['id'], prevstate:StateActionsForm, formData:FormData)=>{
    
        
      const dataBudget = {
            name:formData.get('name'),
            amount:formData.get('amount')
      }    

      const editFormBudget = DraftBudgetSchema.safeParse(dataBudget)
      //VALIDAR ENTRADAS FORM 
      if(editFormBudget.error){
           
            return{
                errors: editFormBudget.error.issues.map(error=>error.message),
                success:''
            }
      }
       
      //Revalidar y Actualizar los datos 
      revalidatePath('/admin') //Limpia cache y actualiza toda la url (cuando se tiene actualizar mucha info )
      //revalidateTag('/all-budgets') //Solo actualiza el cambio generado en la petición fetch 

      //OBTENER TOKEN
      const token = getTokenCookies()
      
      //ENVIAR DATOS
      const url = `${process.env.API_URL}/budgets/${budgetId}`
      const req = await fetch(url,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer: ${token}`
        },
        body:JSON.stringify({
            name:editFormBudget.data.name,
            amount:editFormBudget.data.amount,
            visibility:true
        })
      }) 

      const json = await req.json()
      console.log(json)
      if(!req.ok){
        const {error} = StatusErrorSchema.parse(json)
        return{
            errors:[error],
            success:''
        }
      }

      const success = SuccessSchema.parse(json)


     
       
      //VALIDAR DATA ENTRADA 
    
    return{
        errors:[],
        success
    }

}