import { cookies } from "next/headers"



export const getTokenCookies = ()=>{
      
    const token = cookies().get("user_token")?.value
    return token
}