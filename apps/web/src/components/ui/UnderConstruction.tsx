'use client'

import { ReactNode } from 'react'

interface PropiedadesEnConstruccion {
  titulo: string
  descripcion?: string
  funcionalidadesEsperadas?: string[]
  icono?: ReactNode
}

export default function EnConstruccion({
  titulo,
  descripcion,
  funcionalidadesEsperadas,
  icono,
}: PropiedadesEnConstruccion) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      {/* Icono */}
      <div className="mb-6">
        {icono || (
          <svg
            className="h-24 w-24 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        )}
      </div>

      {/* Título */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
        {titulo}
      </h1>

      {/* Descripción */}
      {descripcion && (
        <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl">
          {descripcion}
        </p>
      )}

      {/* Insignia */}
      <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-100 text-yellow-800 mb-8">
        <svg
          className="h-5 w-5 mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
        <span className="font-medium">En Construcción</span>
      </div>

      {/* Funcionalidades Esperadas */}
      {funcionalidadesEsperadas && funcionalidadesEsperadas.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-2xl w-full">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Funcionalidades Próximas:
          </h3>
          <ul className="space-y-3">
            {funcionalidadesEsperadas.map((funcionalidad, indice) => (
              <li key={indice} className="flex items-start">
                <svg
                  className="h-6 w-6 text-green-500 mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-700">{funcionalidad}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Línea de tiempo */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Esta página está siendo desarrollada activamente.
        </p>
        <p className="text-sm text-gray-500">
          Próxima actualización: <span className="font-semibold">Pronto</span>
        </p>
      </div>
    </div>
  )
}
