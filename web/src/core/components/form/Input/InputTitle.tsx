import React from 'react'

interface InputTitleProps {
  id: string
  titulo: string
}
export default function InputTitle(props: InputTitleProps) {
  return (
    <label
      htmlFor={props.id}
      className="block mb-2 text-sm font-medium text-gray-900"
    >
      {props.titulo}
    </label>
  )
}
