'use client'
import React from 'react'
const SobrePage = () => {
  return (
    <div className="p-4 mt-14">
      <h4 className="text-lg mb-4">Sobre</h4>

      <h1 className="text-base font-light mb-4">
        Desenvolvido por{' '}
        <a
          href="https://lacam.unifesspa.edu.br/"
          target="_blank"
          rel="noreferrer"
          className="hover:text-green-700 underline"
        >
          Laboratório de Contas Regionais da Amazônia (LACAM)
        </a>{' '}
        -{' '}
        <a
          href="https://www.unifesspa.edu.br/"
          target="_blank"
          rel="noreferrer"
          className="hover:text-green-700"
        >
          UNIFESSPA
        </a>
      </h1>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
        <div className="flex flex-col mb-4 gap-2 bg-green-200 rounded-lg p-6">
          <h2 className="text-base font-medium">Orientadores Responsáveis</h2>
          <h5 className="text-sm font-light"> Giliad de Souza Silva </h5>
          <h5 className="text-sm font-light"> Warley Jr</h5>
        </div>
        <div className="flex flex-col mb-4 gap-2 bg-green-100 rounded-lg p-6">
          <h2 className="text-base font-medium">Equipe de Desenvolvimento</h2>
          <h5 className="text-sm font-light"> Kristhyan de Matos Maia </h5>
          <h5 className="text-sm font-light"> Evaldo Corrêa de Sousa Filho </h5>
        </div>
      </div>
    </div>
  )
}

export default SobrePage
