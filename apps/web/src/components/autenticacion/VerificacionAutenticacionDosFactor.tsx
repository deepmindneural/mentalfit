'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import InputOTP from './InputOTP';
import { Shield, Loader2, ArrowLeft, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { createClient } from '@/lib/supabase';

interface PropiedadesVerificacionAutenticacionDosFactor {
  onExito?: () => void;
  onVolver?: () => void;
  redirigirA?: string;
}

export default function VerificacionAutenticacionDosFactor({
  onExito,
  onVolver,
  redirigirA = '/dashboard'
}: PropiedadesVerificacionAutenticacionDosFactor) {
  const t = useTranslations();
  const router = useRouter();
  const [codigo, setCodigo] = useState('');
  const [verificando, setVerificando] = useState(false);
  const [error, setError] = useState('');
  const supabase = createClient();

  const manejarCambioCodigo = (valor: string) => {
    setCodigo(valor);
    setError('');

    // Auto-submit cuando se completen los 6 dígitos
    if (valor.length === 6) {
      verificarCodigo(valor);
    }
  };

  const verificarCodigo = async (codigoVerificar: string) => {
    setVerificando(true);
    setError('');

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast.error(t('auth.errors.userNotFound'));
        setVerificando(false);
        return;
      }

      // Verificar el código 2FA
      const { data, error } = await supabase.auth.mfa.verify({
        factorId: user.id, // Esto puede variar según tu implementación
        challengeId: 'challenge-id', // Obtener del flujo de autenticación
        code: codigoVerificar
      });

      if (error) {
        setError(t('auth.errors.invalid2FACode'));
        setCodigo('');
        setVerificando(false);
        return;
      }

      // Verificación exitosa
      toast.success(t('auth.success.2FAVerified'));

      if (onExito) {
        onExito();
      } else {
        router.push(redirigirA);
      }
    } catch (error) {
      console.error('Error al verificar código 2FA:', error);
      setError(t('auth.errors.unknownError'));
      setCodigo('');
      setVerificando(false);
    }
  };

  const manejarSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (codigo.length === 6) {
      verificarCodigo(codigo);
    } else {
      setError(t('auth.errors.invalid2FACode'));
    }
  };

  return (
    <form onSubmit={manejarSubmit} className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
            <Shield className="h-8 w-8 text-primary-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('auth.twoFactor.verify.title')}
        </h2>
        <p className="text-gray-600">
          {t('auth.twoFactor.verify.subtitle')}
        </p>
      </div>

      {/* Input de código OTP */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
            {t('auth.twoFactor.verify.code')}
          </label>

          {/* Usando un input manual ya que react-input-otp tiene issues de compatibilidad */}
          <div className="flex justify-center">
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={codigo}
              onChange={(e) => {
                const valor = e.target.value.replace(/\D/g, '');
                manejarCambioCodigo(valor);
              }}
              disabled={verificando}
              className={`w-full max-w-xs px-4 py-4 text-center text-3xl font-mono tracking-[1em] border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                error ? 'border-red-300 bg-red-50' : 'border-gray-300'
              } ${verificando ? 'opacity-50 cursor-not-allowed' : ''}`}
              placeholder="000000"
              autoFocus
            />
          </div>

          {error && (
            <div className="mt-3 flex items-center justify-center gap-2 text-red-600">
              <AlertCircle className="h-4 w-4" />
              <p className="text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Indicador de progreso */}
        {verificando && (
          <div className="flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-primary-500" />
          </div>
        )}
      </div>

      {/* Botones */}
      <div className="space-y-3">
        <button
          type="submit"
          disabled={verificando || codigo.length !== 6}
          className="w-full btn-primary flex items-center justify-center py-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {verificando ? (
            <>
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
              {t('auth.twoFactor.verify.loading')}
            </>
          ) : (
            t('auth.twoFactor.verify.submit')
          )}
        </button>

        {/* Código de respaldo */}
        <button
          type="button"
          className="w-full text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors py-2"
        >
          {t('auth.twoFactor.verify.useBackupCode')}
        </button>

        {/* Volver */}
        {onVolver && (
          <button
            type="button"
            onClick={onVolver}
            className="w-full btn-secondary flex items-center justify-center py-3"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('auth.twoFactor.verify.backToLogin')}
          </button>
        )}
      </div>

      {/* Ayuda */}
      <div className="text-center pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Abre tu aplicación de autenticación (Google Authenticator, Authy, etc.) e ingresa el código de 6 dígitos que aparece.
        </p>
      </div>
    </form>
  );
}
