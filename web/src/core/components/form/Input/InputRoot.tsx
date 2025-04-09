import React from 'react'

interface InputRootProps {
  children: React.ReactNode
}
export default function InputRoot({ children }: InputRootProps) {
  return <div className="mb-3">{children}</div>
}
