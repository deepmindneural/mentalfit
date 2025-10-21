'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Logo from '@/components/ui/Logo';
import FormularioRegistro from '@/components/autenticacion/FormularioRegistro';

export default function PaginaRegistro() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Logo className="justify-center mb-6" />
          <h2 className="text-3xl font-bold text-gray-900">
            {t('auth.register.title')}
          </h2>
          <p className="mt-2 text-gray-600">
            {t('auth.register.subtitle')}
          </p>
        </div>

        {/* Formulario de Registro */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <FormularioRegistro />
        </div>

        {/* Sign in link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {t('auth.register.hasAccount')}{' '}
            <Link
              href="/auth/login"
              className="font-medium text-primary-600 hover:text-primary-700"
            >
              {t('auth.register.signIn')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
