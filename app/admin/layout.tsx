import Logo from "@/components/ui/Logo";
import Link from "next/link";
import ToastNotifications from "@/components/ui/ToastNotifications";
import { verifySession } from "@/src/auth/dal";
import AdminMenu from '../../components/admin/AdminMenu';
// ! SOLO SE PUEDE ACCEDER CON AUTHENTICACIÓN Y ROLE DE ADMINISTRADOR

export default async function AdminLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    
    //SOLO PARA VERIFICAR QUE EL USUARIO ESTA AUTENTICADO 
    //NUNCAR PARA PASAR LOS DATOS ENTRE LOS COMPONENTES 
    //YA QUE ESTE LAYOUT SOLO SE EJECUTA UNA VEZ NO HACE RERENDER
   const {user} = await verifySession() 
   
   
  
    return (
      <>
        <header className='bg-[#336b87] py-5'>
          <div className='max-w-5xl mx-auto flex flex-col lg:flex-row justify-between items-center'>
            <div className='flex justify-center items-center'>
              <Link href={'/'}>
                  <Logo />
              </Link>
            </div>
             
             <AdminMenu user={user} />

          </div>
        </header>
        <section className='max-w-5xl mx-auto mt-20 p-3 py-10'>
          {children}
        </section>
        <ToastNotifications />
  
        <footer className='py-5'>
          <p className='text-center'>
            Todos los Derechos Reservados {new Date().getFullYear()}
          </p>
        </footer>
      </>
    );
  }