'use client'
import SideBarItem from './SideBarItem'
import Image from 'next/image'
import {
  LockClosedIcon,
  UserIcon,
  ArrowLeftOnRectangleIcon,
  InformationCircleIcon,
  TableCellsIcon,
  ChartBarSquareIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { signOut, useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
const SideBar = ({
  isSideBarOpen,
  setIsSideBarOpen,
}: {
  isSideBarOpen: boolean
  setIsSideBarOpen: Function
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const { data: session } = useSession()
  return (
    <aside
      id="sidebar"
      className={`${
        isSideBarOpen ? 'block' : 'hidden'
      } fixed w-64 z-50 h-screen shadow-md hover:shadow-lg shadow-slate-400 transition-transform  bg-white border-r border-gray-200 sm:translate-x-0 flex flex-col`}
      aria-label="Sidebar"
    >
      <div className="flex items-center justify-start px-3 py-3 lg:px-5 lg:pl-3">
        <button
          onClick={() => setIsSideBarOpen()}
          data-drawer-target="logo-sidebar"
          data-drawer-toggle="logo-sidebar"
          aria-controls="logo-sidebar"
          type="button"
          className="text-green font-bold py-2 px-4 rounded hover:bg-gray-100"
        >
          <span className="sr-only">close sidebar</span>
          <XMarkIcon className="h-6 w-6 text-green-950" />
        </button>
        <a
          href="https://lacam.unifesspa.edu.br/"
          target="_blank"
          rel="noreferrer"
          className="ml-2 md:mr-24"
        >
          <span className="self-center text-lg font-normal whitespace-nowrap">
            Navegação
          </span>
        </a>
      </div>
      <div className="px-3 pb-4 pt-4 mb-6">
        <h6 className="font-light text-sm mb-2">Dashboard</h6>
        <ul className="space-y-2 mb-3">
          <SideBarItem
            thisRoute={pathname === '/gerar-csv'}
            icon={<TableCellsIcon className="h-6 w-6 text-green-950" />}
            name={'Gerar CSV'}
            onClick={() => {
              router.push('/gerar-csv')
              setIsSideBarOpen()
            }}
          />
          {session?.user.perfil === 2 && (
            <SideBarItem
              thisRoute={pathname === '/gerar-grafico-arvore'}
              icon={<ChartBarSquareIcon className="h-6 w-6 text-green-950" />}
              name={'Gerar Gráfico Árvore'}
              onClick={() => {
                router.push('/gerar-grafico-arvore')
                setIsSideBarOpen()
              }}
            />
          )}
        </ul>
        <hr className="mt-2 mb-4" />
        <h6 className="font-light text-sm mb-2">Configurações</h6>
        <ul className="space-y-2 font-medium">
          {session?.user.perfil === 2 && (
            <SideBarItem
              thisRoute={pathname === '/usuarios/cadastro'}
              icon={<UserIcon className="h-6 w-6 text-green-950" />}
              name={'Cadastrar Usuário'}
              onClick={() => {
                router.push('/cadastrar-usuario')
                setIsSideBarOpen()
              }}
            />
          )}

          <SideBarItem
            thisRoute={pathname === '/alterar-senha'}
            icon={<LockClosedIcon className="h-6 w-6 text-green-950" />}
            name={'Alterar Senha'}
            onClick={() => {
              router.push('/alterar-senha')
              setIsSideBarOpen()
            }}
          />
          <SideBarItem
            thisRoute={pathname === '/logout'}
            icon={
              <ArrowLeftOnRectangleIcon className="h-6 w-6 text-green-950" />
            }
            name={'Desconectar'}
            onClick={() => signOut({ callbackUrl: '/' })}
          />
          <SideBarItem
            thisRoute={pathname === '/sobre'}
            icon={<InformationCircleIcon className="h-6 w-6 text-green-950" />}
            name={'Sobre'}
            onClick={() => {
              router.push('/sobre')
              setIsSideBarOpen()
            }}
          />
        </ul>
      </div>
      <hr className="mt-4 mb-10 self-center" />
      <Image
        width={170}
        height={90}
        src="images/logo_lacam_re.svg"
        alt="Logo Lacam"
        className="self-center"
      />
      <a
        href="https://www.unifesspa.edu.br"
        target="_blank"
        rel="noreferrer"
        className="flex flex-col ml-3 mb-6 self-center"
      >
        <hr className="mt-4 mb-4" />
        <Image
          width={170}
          height={90}
          src="images/logo.svg"
          alt="Logo Unifesspa"
        />
      </a>
    </aside>
  )
}
export default SideBar
