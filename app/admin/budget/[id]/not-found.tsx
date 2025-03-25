import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='space-y-5'>
        <h1 className="font-black text-4xltext-[#16253d]">No Encontrado</h1>
        <p className="text-xl font-bold">El Presupuesto que intentas acceder {''} <span className="text-[#336b87]">no existe</span></p>
        <Link href="/admin" className='bg-[#efb509] px-10 py-2 rounded-lg text-white font-bold cursor-pointer inline-block'>Ir a Presupuestos</Link>
    </div>
  )
}