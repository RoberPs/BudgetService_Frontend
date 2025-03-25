import React from 'react'
import {Budget} from '@/src/schemas/index';


export const BudgetForm = ({budget}:{budget?:Budget}) => {
  
  //Se inidca con typescript que el ppto puede ser opcional 
  //para que no haya problemas en el form de crear ppto

  return (
    <>
      
    <div className="space-y-3">
          
        <label htmlFor="name" className="text-sm uppercase font-bold">
           Nombre Presupuesto
        </label>
        <input
           id="name"
           className="w-full p-3  border border-gray-100 bg-slate-100"
           type="text"
           placeholder="Nombre del Presupuesto"
           name="name"
           defaultValue={budget?.name}
        />
        </div>
        <div className="space-y-3">
        <label htmlFor="amount" className="text-sm uppercase font-bold">
           Cantidad Presupuesto
        </label>
        <input
           type="number"
           id="amount"
           className="w-full p-3  border border-gray-100 bg-slate-100"
           placeholder="Cantidad Presupuesto"
           name="amount"
           defaultValue={budget?.amount}
        />
    </div>
    </>
  )
}
