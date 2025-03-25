import { verifySession } from "@/src/auth/dal"
import { getTokenCookies } from "@/src/auth/token"

//API ROUTE DE NEXT
//Siempre se requiere el parametro req 

export async function GET(req:Request, {params}:{params:{budgetsId:string,expenseId:string}}){

    console.log(params)
    await verifySession() //Proteger la ruta donde no tengamos la cookie con el token 
    
    const token = getTokenCookies()
    const url = `${process.env.API_URL}/budgets/${params.budgetsId}/expenses/${params.expenseId}`
    
    const request = await fetch(url,{
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer: ${token}`
        },
    })
    
    const json = await request.json()
    if(!request.ok){
        return Response.json(json.error,{ status: 403 })
    }

    return Response.json(json)
}