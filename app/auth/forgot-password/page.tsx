import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm"
import Link from "next/link"

const ForgotPasswordPage = () => {
  
  return (
    <div>
        <h1 className='font-black text-4xl text-[#16253d]'>¿Olvidaste tu contraseña?</h1>
        <p className='text-[#16253d]'>Aqui puedes  <span className="text-[#24546c]">restablecerla</span></p>
        <ForgotPasswordForm />
         
        <nav className='flex flex-col items-center mt-10 gap-2'>
           <Link href={'/auth/login'} className='hover:underline text-[#336b87]'>
             ¿Ya tienes cuenta? Inicia Sesión
           </Link>
           <Link href={'/auth/register'} className='hover:underline text-[#336b87]'>
             ¿Todavia no tienes cuenta? Crear cuenta
           </Link>
          
        </nav>  

    </div>
  )
}

export default ForgotPasswordPage