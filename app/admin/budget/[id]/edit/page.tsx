import Link from "next/link"
import { Metadata } from 'next';
import { EditBudgetForm } from '@/components/budgets/EditBudgetForm';
import {getBudget} from '@/src/services/budget'


//FUNCION EXCLUSIVA DE NEXT 
//la reconoce y la manda llamar automaticamente
export const generateMetadata = async ({params}:{params:{id:string}}):Promise<Metadata> => {
  
    const budget = await getBudget(params.id) //pasar la función que obtiene el budget por id y se tienen disponibles los datos
    return{
        title:`${budget.name}`,
        description: `${budget.name}` 
    }
} 

const EditBudgetPage = async ({params}:{params:{id:string}}) => {

   const {id} = params //Obtener el id de los params 
   

   const budget = await getBudget(id)
   

  return (
    <>
        <div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
        <div className='w-full md:w-auto'>
            <h1 className='font-black text-4xl text-[#16253d] my-5'>
            Editar Presupuesto: 
            </h1>
            <p className="text-xl font-bold">Llena el formulario y crea un nuevo {''}
            <span className="text-[#336b87]">presupuesto</span>
            </p>
        </div>
        <Link
            href={'/admin'}
            className='bg-[#efb509] p-2 rounded-lg text-white font-bold w-full md:w-auto text-center'
        >
            Volver
        </Link>
        </div>
        <div className='p-10 mt-10  shadow-lg border '>
               <EditBudgetForm 
                 budget={budget}
               /> 
        </div>
  </>
  )
}
export default EditBudgetPage