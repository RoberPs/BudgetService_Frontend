import LoginForm from '@/components/auth/LoginForm'
import Link from 'next/link'


const LoginPage = () => {
  return (
    <div>
         
         <h1 className='font-black text-4xl text-[#16253d]'>Inicia Sesión</h1>

         <LoginForm />

         <nav className='flex flex-col items-center mt-10 gap-2'>
          
          <Link href={'/auth/register'} className='hover:underline text-[#336b87]'>
            ¿No tienes cuenta? Crear una
          </Link>

          <Link href={'/auth/forgot-password'} className='hover:underline text-[#336b87]'>Recuperar cuenta</Link>  
        
        </nav>
    </div>
  )
}
export default LoginPage