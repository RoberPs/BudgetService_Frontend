import React from 'react'
import { formatCurrency } from '../../src/utils/index';

type AmountProps ={
    label:string,
    quantity:number
}


export const Amount = ({label,quantity}:AmountProps) => {

  return (
    <div className='flex gap-2'>
        <p className='font-bold text-xl'>{label}:{' '}<span className='text-[#336b87]'>{formatCurrency(quantity)}</span></p>
        
    </div>
  )
}

