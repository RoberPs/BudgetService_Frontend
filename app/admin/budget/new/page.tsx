import NewBudgetForm from '@/components/budgets/NewBudgetForm'
import Link from 'next/link'
import React from 'react'


const CreateBudgetPage = () => {

    return (
        <>
          <div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
            <div className='w-full md:w-auto'>
              <h1 className='font-black text-4xl text-[#16253d] my-5'>
                Nuevo Presupuesto
              </h1>
              <p className="text-xl font-bold">Llena el formulario y crea un nuevo {''}
                <span className="text-[#336b87]">presupuesto</span>
              </p>
            </div>
            <Link
              href={'/admin'}
              className='bg-[#efb509] p-2 rounded-lg text-white font-bold w-50  md:w-auto text-center'
            >
              Volver
            </Link>
          </div>
    
          <div className='p-10 mt-10  shadow-lg border '>
               <NewBudgetForm />
          </div>
        </>
      )
}

export default CreateBudgetPage