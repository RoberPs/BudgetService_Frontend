import React, { ReactNode } from 'react'


export const ErrorMessage = ({children}:{children:ReactNode}) => {
  return (
    <div>
        <p className="text-white bg-red-500 uppercase text-center py-1 mb-1">{children}</p>
    </div>
  )
}

export default ErrorMessage