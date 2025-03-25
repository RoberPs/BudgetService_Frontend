"use server"
import { Metadata } from 'next'
import{getBudget} from '@/src/services/budget'
import { AddExpensesButton } from '@/components/expenses/AddExpensesButton'
import ModalContainer from '@/components/ui/ModalContainer'
import { formatCurrency } from '@/src/utils'
import { formatDate } from '../../../../src/utils/index';
import { ExpenseMenu } from '@/components/expenses/ExpenseMenu'
import {Amount} from '../../../../components/ui/Amount';
import { ProgressBar } from '../../../../components/ui/ProgressBar';


export const generateMetadata = async({params}:{params:{id:string}}):Promise<Metadata>  =>{
               
  const budget = await getBudget(params.id)
  
  return{
    title:`${budget.name}`,
    description: `${budget.name}` 
  }

}

const BudgetView =  async({params}:{params:{id:string}}) => {
  
  const budget = await getBudget(params.id)

  //operaciones  con las cantidades para el grafico

  const expensesAmount = budget.expenses.reduce((total,expense)=> +expense.amount + total ,0)
  const availableAmount = +budget.amount - expensesAmount 
  const percentage = Math.round(((expensesAmount / +budget.amount) * 100))
  console.log(percentage)
  
  return (
    <>  
        <div className='flex flex-col-reverse gap-2 md:flex-row justify-between md:items-center'>
          <div>
            <h1 className="font-black text-4xl text-[#16253d] mb-1">{budget.name}</h1>
            <p className="text-xl font-bold">Administra tus {''} <span className="text-[#336b87]">gastos</span></p>
          </div>
          
          <AddExpensesButton/>

        </div>

        {budget.expenses.length ? (

        <>

          <div className='grid grid-cols-1 md:grid-cols-2 mt-10'>
              <div>
                  <ProgressBar percentage={percentage}/>
              </div>
              <div className='flex flex-col justify-center items-center space-y-3 md:items-start'>
                  <Amount
                    label='Presupuesto'
                    quantity={+budget.amount}
                  />
                  <Amount
                    label='Disponible'
                    quantity={availableAmount}
                  />
                  <Amount
                    label='Gastado'         
                    quantity={expensesAmount}
                  />
              </div>
          </div>
          
          <h1 className='font-black text-4xl text-[#16253d] mt-10'>Gastos en este presupuesto</h1>

          <ul role="list" className="divide-y divide-gray-300 border shadow-lg mt-10 ">
            {budget.expenses.map((expense) => (
                <li key={expense.id} className="flex justify-between gap-x-6 p-5">
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto space-y-2">
                      <p className="text-2xl font-semibold text-gray-900">
                          {expense.name}
                      </p>
                      <p className="text-xl font-bold text-[#336b87]">
                          {formatCurrency(+expense.amount)}
                      </p>
                      <p className='text-gray-500  text-sm'>
                          {formatDate(expense.updatedAt)}
                      </p>
                    </div>
                  </div>
                     <ExpenseMenu expenseId={expense.id}/>
                </li>
            ))}
          </ul>

        </>
        )
        :
        (
          <p className='text-center py-20'>Todavia no hay gastos</p>
        )
        }
     
      <ModalContainer/>
       

    </>
  )
}

export default BudgetView