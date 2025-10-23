'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Error500() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        {/* Error Code */}
        <h1 className="text-9xl font-extrabold text-green-500 mb-4">500</h1>

        {/* Error Title */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Error del Servidor
        </h2>

        {/* Error Description */}
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Lo sentimos, algo salió mal en nuestro servidor. Nuestro equipo ha sido notificado y está trabajando para solucionarlo.
        </p>

        {/* Icon */}
        <div className="mb-8">
          <svg
            className="h-24 w-24 text-gray-400 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Volver al Inicio
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Reintentar
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-8 text-sm text-gray-500">
          <p>Si el problema persiste, por favor contacta a nuestro</p>
          <Link href="/soporte" className="text-green-500 hover:text-green-600 font-medium">
            equipo de soporte
          </Link>
        </div>
      </div>
    </div>
  );
}
