'use client';


import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Logo from '@/components/ui/Logo';
import FormularioLogin from '@/components/autenticacion/FormularioLogin';

export default function PaginaLogin() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Logo className="justify-center mb-6" />
          <h2 className="text-3xl font-bold text-gray-900">
            {t('auth.login.title')}
          </h2>
          <p className="mt-2 text-gray-600">
            {t('auth.login.subtitle')}
          </p>
        </div>

        {/* Formulario de Login */}
        <FormularioLogin />

        {/* Demo credentials */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Demo Credentials</h3>
          <div className="text-xs text-blue-700 space-y-1">
            <p><strong>Admin:</strong> admin@mentalfit.com / admin123</p>
            <p><strong>Company Admin:</strong> company@acme.com / company123</p>
            <p><strong>User:</strong> user@acme.com / user123</p>
            <p><strong>Professional:</strong> therapist@mentalfit.com / therapist123</p>
          </div>
        </div>

        {/* Sign up link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {t('auth.login.noAccount')}{' '}
            <Link
              href="/auth/register"
              className="font-medium text-primary-600 hover:text-primary-700"
            >
              {t('auth.login.signUp')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
