'use client';


import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Logo from '@/components/ui/Logo';
import ConfiguracionAutenticacionDosFactor from '@/components/autenticacion/ConfiguracionAutenticacionDosFactor';

export default function PaginaConfiguracion2FA() {
  const t = useTranslations();
  const router = useRouter();

  const manejarExito = () => {
    router.push('/dashboard/settings?tab=security');
  };

  const manejarCancelar = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Logo className="justify-center mb-6" />
        </div>

        {/* Componente de Configuración 2FA */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <ConfiguracionAutenticacionDosFactor
            onExito={manejarExito}
            onCancelar={manejarCancelar}
          />
        </div>
      </div>
    </div>
  );
}
