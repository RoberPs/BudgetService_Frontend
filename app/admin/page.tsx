import Link from 'next/link'
import { Metadata } from 'next';
import { BudgetsApiResponseSchema } from '@/src/schemas';
import { getTokenCookies } from '@/src/auth/token';
import { formatCurrency, formatDate } from '../../src/utils/index';
import BudgetMenu from '@/components/budgets/BudgetMenu';
import DeleteBudgetModal from '@/components/budgets/DeleteBudgetModal';

//En versiones anteriores no se podia añadir funcionalidad asincrona a los componenentes de react 

export const metadata: Metadata = {
  title: "Panel de Administración",
  description:"Crea y administra tus presupuestos",
};


const getUserBudgets = async()=>{
    
    const token = getTokenCookies()
    const url = `${process.env.API_URL}/budgets`

    const req = await fetch(url,{
      headers:{
         'Authorization': `Bearer ${token}`
      },
      next:{
        tags:['all-budgets']
      }
    })



    const json = await req.json()
    const data = BudgetsApiResponseSchema.parse(json)
    return data

}

const AdminPage = async () => {

  const budgets = await getUserBudgets()
  
  return (
    <>
      <div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
        <div className='w-full md:w-auto'>
          <h1 className="font-black text-4xl text-[#16253d] my-5">Mis Presupuestos</h1>
          <p className="text-xl font-bold text-[#16253d]">Maneja y administra tus {''}
            <span className="text-[#336b87] ">presupuestos</span>
          </p>
        </div>
        <Link
          href={'/admin/budget/new'}
          className='bg-[#efb509] p-2 rounded-lg text-white font-bold w-full md:w-auto text-center'
        >
          Crear Presupuesto
        </Link>
      </div>

        {budgets.length ? 
        
        (
          <>
              <ul role="list" className="divide-y divide-gray-300 border shadow-lg mt-10 ">
              {budgets.map( budget=> (
                  <li key={budget.id} className="flex justify-between gap-x-6 p-5 ">
                    <div className="flex min-w-0 gap-x-4">
                          <div className="min-w-0 flex-auto space-y-2">
                                <p className="capitalize text-sm font-semibold leading-6 text-gray-900">
                                    <Link
                                      href={`admin/budget/${budget.id}`}
                                      className='cursor-pointer hover:underline text-2xl text-[#16253d] font-bold'
                                    >
                                      {budget.name}
                                    </Link>
                                    
                                </p>
                                <p className="text-xl font-bold text-[#336b87]">
                                    {formatCurrency(+budget.amount)}
                                </p>
                                <p className='text-gray-500  text-sm'>
                                      Ultima Actualización: {''}
                                    {formatDate(budget.updatedAt)}
                                </p>
                          </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-x-6">
                          <BudgetMenu budgetId={budget.id} />
                    </div>
                  </li>
              ))}
            </ul> 
              
              <DeleteBudgetModal />

          </> 
        ) 
        : 
        ( 
            <p className='font-bold text-2xl text-center mt-10'>Todavia no hay presupuestos</p>
        )}
       

    </>
  )
}

export default AdminPage