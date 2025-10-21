'use client';


import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Logo from '@/components/ui/Logo';
import ComponenteVerificarEmail from '@/components/autenticacion/ComponenteVerificarEmail';

export default function PaginaVerificarEmail() {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Logo className="justify-center mb-6" />
        </div>

        {/* Componente de Verificación */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <ComponenteVerificarEmail
            email={email || undefined}
            onVolver={() => router.push('/auth/login')}
          />
        </div>
      </div>
    </div>
  );
}
