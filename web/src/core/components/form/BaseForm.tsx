import React from 'react'
import Loading from '../Loading'

export default function BaseForm({
  titulo,
  subtitulo,
  carregando,
  children,
}: {
  titulo: string
  subtitulo?: string
  carregando: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col md:items-center  h-screen mt-16 ml-8">
      {carregando ? (
        <Loading />
      ) : (
        <>
          <div id="formTitulo" className="mb-6 self-center sm:w-1/3 ">
            <h4 className="text-lg">{titulo}</h4>
            {subtitulo && <h6 className="text-sm">{subtitulo}</h6>}
          </div>
          {children}
        </>
      )}
    </div>
  )
}
