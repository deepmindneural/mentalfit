'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { calcularFortalezaContrasena } from '@/lib/validadores/autenticacion';
import { Check, X } from 'lucide-react';

interface PropiedadesIndicadorFortalezaContrasena {
  contrasena: string;
}

export default function IndicadorFortalezaContrasena({
  contrasena
}: PropiedadesIndicadorFortalezaContrasena) {
  const t = useTranslations();

  const fortaleza = useMemo(() => {
    if (!contrasena) {
      return {
        nivel: 'debil' as const,
        porcentaje: 0,
        requisitos: {
          longitud: false,
          mayuscula: false,
          minuscula: false,
          numero: false,
          caracterEspecial: false,
        },
      };
    }
    return calcularFortalezaContrasena(contrasena);
  }, [contrasena]);

  const obtenerColorBarra = () => {
    switch (fortaleza.nivel) {
      case 'fuerte':
        return 'bg-green-500';
      case 'media':
        return 'bg-yellow-500';
      default:
        return 'bg-red-500';
    }
  };

  const obtenerTextoNivel = () => {
    switch (fortaleza.nivel) {
      case 'fuerte':
        return t('auth.passwordStrength.strong');
      case 'media':
        return t('auth.passwordStrength.medium');
      default:
        return t('auth.passwordStrength.weak');
    }
  };

  const obtenerColorTexto = () => {
    switch (fortaleza.nivel) {
      case 'fuerte':
        return 'text-green-600';
      case 'media':
        return 'text-yellow-600';
      default:
        return 'text-red-600';
    }
  };

  if (!contrasena) return null;

  return (
    <div className="space-y-3 mt-2">
      {/* Barra de fortaleza */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            {t('auth.passwordStrength.label')}
          </span>
          <span className={`text-sm font-semibold ${obtenerColorTexto()}`}>
            {obtenerTextoNivel()}
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${obtenerColorBarra()}`}
            style={{ width: `${fortaleza.porcentaje}%` }}
          />
        </div>
      </div>

      {/* Requisitos */}
      <div className="space-y-1">
        <RequisitoContrasena
          cumplido={fortaleza.requisitos.longitud}
          texto={t('auth.passwordStrength.requirements.length')}
        />
        <RequisitoContrasena
          cumplido={fortaleza.requisitos.mayuscula}
          texto={t('auth.passwordStrength.requirements.uppercase')}
        />
        <RequisitoContrasena
          cumplido={fortaleza.requisitos.minuscula}
          texto={t('auth.passwordStrength.requirements.lowercase')}
        />
        <RequisitoContrasena
          cumplido={fortaleza.requisitos.numero}
          texto={t('auth.passwordStrength.requirements.number')}
        />
        <RequisitoContrasena
          cumplido={fortaleza.requisitos.caracterEspecial}
          texto={t('auth.passwordStrength.requirements.special')}
        />
      </div>
    </div>
  );
}

interface PropiedadesRequisitoContrasena {
  cumplido: boolean;
  texto: string;
}

function RequisitoContrasena({ cumplido, texto }: PropiedadesRequisitoContrasena) {
  return (
    <div className="flex items-center gap-2 text-xs">
      {cumplido ? (
        <Check className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
      ) : (
        <X className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
      )}
      <span className={cumplido ? 'text-green-600' : 'text-gray-600'}>
        {texto}
      </span>
    </div>
  );
}
