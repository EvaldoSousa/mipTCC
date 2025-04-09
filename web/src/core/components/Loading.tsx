'use client'
import React from 'react'

const Loading = () => {
  return (
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50 mx-auto"></div>
      <p className="mt-4">Carregando...</p>
    </div>
  )
}
export default Loading
