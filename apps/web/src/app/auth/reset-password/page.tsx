'use client';

import { useTranslations } from 'next-intl';
import Logo from '@/components/ui/Logo';
import FormularioRestablecerContrasena from '@/components/autenticacion/FormularioRestablecerContrasena';

export default function PaginaRestablecerContrasena() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Logo className="justify-center mb-6" />
          <h2 className="text-3xl font-bold text-gray-900">
            {t('auth.resetPassword.title')}
          </h2>
          <p className="mt-2 text-gray-600">
            {t('auth.resetPassword.subtitle')}
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <FormularioRestablecerContrasena />
        </div>
      </div>
    </div>
  );
}
