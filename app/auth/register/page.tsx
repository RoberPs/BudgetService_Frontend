import FormRegister from '@/components/auth/RegisterForm'
import type { Metadata} from 'next';
import Link from 'next/link';


export const metadata:Metadata = {
    
  title:'Admin - Crear Cuenta',
  description:'Crear una cuenta para administrar tus gastos',
  keywords:'nextjs, react, tailwindcss, typescript'

}

const RegisterPage = () => {
  
  return (
    
    <div className='p-5'>
        <h1 className='font-black text-4xl text-[#16253d]'>Crear una cuenta</h1>
         
        <FormRegister />
         
        <nav className='flex flex-col items-center mt-10 gap-2'>
           <Link href={'/auth/login'} className='hover:underline text-[#336b87]'>
             ¿Ya tienes cuenta? Inicia Sesión
           </Link>
           <Link href={'/auth/forgot-password'} className='hover:underline text-[#336b87]'>Recuperar cuenta</Link>  
        </nav>  
    
    </div>
  )
}

export default RegisterPage