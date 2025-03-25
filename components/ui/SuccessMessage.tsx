import React, { ReactNode } from 'react'


export const SuccessMessage = ({children}:{children:ReactNode}) => {
  return (
    <div>
        <p className="text-amber-600">{children}</p>
    </div>
  )
}

export default SuccessMessage