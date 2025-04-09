'use client'
import { useSession } from 'next-auth/react'
import React from 'react'
import Image from 'next/image'

const NavBar = ({ setIsSideBarOpen }: { setIsSideBarOpen: Function }) => {
  const { data: session } = useSession()
  return (
    <nav className="fixed w-full top-0 left-0 z-10 border-b border-gray-200 bg-white flex h-16">
      <div className="container mx-auto flex flex-row justify-between">
        <div className="flex items-center justify-start">
          <button
            onClick={() => setIsSideBarOpen()}
            type="button"
            className="text-green font-bold py-2 px-4 rounded hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
            <span className="sr-only">Open sidebar</span>
          </button>
          <span>Menu</span>
        </div>

        <span className="flex flex-row self-center items-center gap-2">
          <Image
            width={50}
            height={50}
            src="images/logo_fnf.svg"
            alt="Logo FNF"
          />
          <span className="font-light">Filtro de Notas Fiscais TRU</span>
        </span>

        <div className="flex items-center">
          <div className="flex items-center ml-3">
            <p className="text-sm mr-3">{session?.user.name}</p>
            <div
              className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
              aria-expanded="false"
              data-dropdown-toggle="dropdown-user"
            >
              <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
                <span className="font-medium text-gray-600">
                  {session?.user.name[0]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
