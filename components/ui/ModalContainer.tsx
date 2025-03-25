"use client"
import {  Fragment } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Dialog, DialogPanel,  Transition, TransitionChild } from '@headlessui/react';
import { AddExpenseForm } from '../expenses/AddExpenseForm';
import { EditExpenseForm } from '../expenses/EditExpenseForm';
import { DeleteExpenseForm } from '../expenses/DeleteExpenseForm';

//SE MUESTRA EL COMPONENTE QUE CORRESPONSE A LA OPERACIÓN 
//QUE SE RELIZARA CON EL EXPENSE
const componentsMap ={

    "AddExpense":AddExpenseForm,
    "EditExpense":EditExpenseForm,
    "DeleteExpense":DeleteExpenseForm
}

export default function ModalContainer() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  //obtener parametro de url
  const showModal = searchParams.get('showModal') //Este parametro controla el funcionamiento del modal
  const show = showModal  ? true : false 
  
  //obtener parametros de url
  const addExpense = searchParams.get('addExpense')! //Para mostrar el formulario de addExpense
  const editExpenseId = searchParams.get('editExpenseId')!
  const deleteExpense = searchParams.get('deleteExpenseId')
  console.log(deleteExpense)
  const getComponentName = ()=>{
      
    if(addExpense) return 'AddExpense' // si el parametro es true
    if(editExpenseId) return 'EditExpense' // si el parametro es un id
    if(deleteExpense) return 'DeleteExpense' // parametro deleteExpense con el id
  }

  const componentName = getComponentName() // si componentName algo retorna el valor(key)
  const ComponentToRender = componentName ? componentsMap[componentName] : null
  

  const closeModal = () => {
    const hideModal = new URLSearchParams(searchParams.toString()) //parametros a string
    Array.from(hideModal.entries()).forEach(([key]) => { //se convierten a array ya que son varios y se itera sobre cada uno para eliminarlos
      hideModal.delete(key)
    });
    router.replace(`${pathname}?${hideModal}`)
  }

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                     {ComponentToRender ? <ComponentToRender closeModal={closeModal}/> : null}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}