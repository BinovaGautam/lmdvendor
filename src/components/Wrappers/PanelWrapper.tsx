import React, { ReactNode } from 'react'

type Props = {
  children ?: ReactNode,
  className ?: string,
}

export default function PanelWrapper({children,className}: Props) {
  return (
   <div className={"w-full m-2 border rounded-xl bg-white py-4 "+className}>
    {children}
   </div>
  )
}