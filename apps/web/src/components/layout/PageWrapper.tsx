import { useTranslations } from 'next-intl'
import { ReactNode } from 'react'

interface PropiedadesEnvolvedorPagina {
  titulo: string
  descripcion?: string
  children: ReactNode
  acciones?: ReactNode
  migas?: { etiqueta: string; href?: string }[]
}

export default function EnvolvedorPagina({
  titulo,
  descripcion,
  children,
  acciones,
  migas,
}: PropiedadesEnvolvedorPagina) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Migas de pan */}
      {migas && migas.length > 0 && (
        <nav className="bg-white border-b border-gray-200 px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm">
            {migas.map((miga, indice) => (
              <li key={indice} className="flex items-center">
                {indice > 0 && (
                  <svg
                    className="h-5 w-5 text-gray-400 mx-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {miga.href ? (
                  <a
                    href={miga.href}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {miga.etiqueta}
                  </a>
                ) : (
                  <span className="text-gray-900 font-medium">
                    {miga.etiqueta}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* Encabezado */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {titulo}
              </h1>
              {descripcion && (
                <p className="mt-2 text-sm text-gray-600">{descripcion}</p>
              )}
            </div>
            {acciones && <div className="flex items-center space-x-3">{acciones}</div>}
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="px-4 py-6 sm:px-6 lg:px-8">{children}</div>
    </div>
  )
}
