export const formatCurrency = ( quantity:number ) =>{
     
    return new Intl.NumberFormat('es-Es',{
        style:'currency',
        currency:'EUR'
    }).format(quantity)
   

}
export const formatDate = ( isoString:string)=>{
    
    const date = new Date(isoString)
    const formatter = new Intl.DateTimeFormat('es-Es',{
        month:'long',
        day:'numeric',
        year:'numeric'
    })

    return formatter.format(date)
 }