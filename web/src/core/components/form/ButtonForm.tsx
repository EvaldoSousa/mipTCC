import Spinner from '../Spinner'

export default function ButtonForm({
  titulo,
  carregando = false,
}: {
  titulo: string
  carregando: boolean
}) {
  return (
    <button
      type="submit"
      disabled={carregando}
      className="text-white bg-green-800 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center flex items-center justify-center"
    >
      {carregando ? <Spinner /> : titulo}
    </button>
  )
}
