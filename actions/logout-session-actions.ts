"use server"
import { cookies } from "next/headers"
import {redirect} from 'next/navigation'


export const logoutSession = async ()=>{
   
    cookies().delete('user_token')
    redirect('/auth/login')
}
    
