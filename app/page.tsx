import Logo from "@/components/ui/Logo"
import Link from "next/link"

const Home = ()=>{
    return(
        <>
          <header className='bg-[#336b87] py-5'>
              <div className="max-w-2xl mx-auto">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                     <Link href={'/'} className="flex items-center gap-2">
                        <Logo />
                     </Link>
                  <div className="flex gap-5 items-center">
                      <Link
                        className="uppercase text-white text-sm font-bold" 
                        href={'/auth/login'}
                      >Inciar Sesión</Link>
                      <Link
                      className="uppercase text-white text-sm font-bold" 
                        href={'/auth/register'}
                      >Registrarme</Link>
                  </div>

                  </div>
              </div>
          </header>
           <main className="max-w-2xl mx-auto p-5 mt-20 space-y-5">
           
                 <h1 className="text-4xl md:text-5xl font-bold text-[#16253d]">Administrador de gastos</h1>
                 <p className="font-bold text-2xl text-[#16253d]">Controla tus <span className="text-[#336b87]">finanzas</span></p>
                 <p className="text-lg ">Domina tus finanzas con nuestro Administrador de Gastos. Simplifica la gestión de tus ingresos y egresos en un solo lugar, de manera intuitiva y eficiente. Toma el control total de tus finanzas personales o empresariales con nuestra plataforma fácil de usar</p>
                
                 <h2 className="text-3xl md:text-4xl font-bold text-[#16253d]">Ventajas de Administrador</h2>
                  <ul className="space-y-5">
                     <li className="p-5 shadow-lg"> 
                         <p className="text-[#16253d] font-black text-xl">Organización sin esfuerzos:{' '}
                            <span className="text-black font-normal text-lg">Clasifica y visualiza de forma clara y ordenada, sin complicaciones con nuestro panel amigable y fácil de usar</span>
                         </p>
                     </li>
                     <li className="p-5 shadow-lg"> 
                         <p className="text-[#16253d] font-black text-xl">Presupuestos inteligentes:{' '}
                            <span className="text-black font-normal text-lg">Establece objetivos financieros realistas y sigue tu progreso con nuestras herramientas más avanzadas</span>
                         </p>
                     </li>
                     <li className="p-5 shadow-lg"> 
                         <p className="text-[#16253d] font-black text-xl">Acceso en cualquier lugar:{' '}
                            <span className="text-black font-normal text-lg">Nuestra plataforma esta disponible para que puedas gestionar tus finanzas desde dondes te encuentres</span>
                         </p>
                     </li>
                     <li className="p-5 shadow-lg"> 
                         <p className="text-[#16253d] font-black text-xl">Seguridad garantizada:{' '}
                            <span className="text-black font-normal text-lg">Protegemos tus datos con los más altos estándares de seguridad, para que puedas utilizar nuestra plataforma con total tranquilidad</span>
                         </p>
                     </li>
                  </ul>
           </main>

           <footer className="max-w-2xl mx-auto p-5 space-y-5">
               <div className=" flex flex-col gap-3 md:flex-row items-center justify-between">

                <Link 
                  className="text-[#336b87] uppercase text-xs"
                  href={'/auth/register'}>
                        ¿No tienes cuenta? Crear una 
                </Link>
                <Link 
                  className="text-[#336b87] uppercase text-xs"
                  href={'/auth/login'}>
                        ¿Ya tienes cuenta? Inicia sesión 
                </Link>

               </div>
           </footer>

        </>
    )
}

export default Home