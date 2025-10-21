'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Mail, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { createClient } from '@/lib/supabase';

interface PropiedadesComponenteVerificarEmail {
  email?: string;
  onVolver?: () => void;
}

export default function ComponenteVerificarEmail({
  email,
  onVolver
}: PropiedadesComponenteVerificarEmail) {
  const t = useTranslations();
  const [reenviando, setReenviando] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [emailEnviado, setEmailEnviado] = useState(false);
  const supabase = createClient();

  // Cooldown timer
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => {
        setCooldown(cooldown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const manejarReenviar = async () => {
    if (cooldown > 0 || !email) return;

    setReenviando(true);

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email
      });

      if (error) {
        toast.error(error.message || t('auth.errors.unknownError'));
        return;
      }

      setEmailEnviado(true);
      toast.success(t('auth.verifyEmail.resendSuccess'));
      setCooldown(60); // 60 segundos de cooldown

      // Resetear el indicador visual después de 3 segundos
      setTimeout(() => {
        setEmailEnviado(false);
      }, 3000);
    } catch (error) {
      console.error('Error al reenviar correo de verificación:', error);
      toast.error(t('auth.errors.networkError'));
    } finally {
      setReenviando(false);
    }
  };

  return (
    <div className="space-y-6 text-center">
      {/* Icono de correo */}
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
          <Mail className="h-10 w-10 text-primary-600" />
        </div>
      </div>

      {/* Título */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('auth.verifyEmail.title')}
        </h2>
        <p className="text-gray-600">
          {t('auth.verifyEmail.message')}
        </p>
      </div>

      {/* Email */}
      {email && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800 font-medium">
            {email}
          </p>
        </div>
      )}

      {/* Instrucciones */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          {t('auth.verifyEmail.instructions')}
        </p>
      </div>

      {/* Reenviar correo */}
      <div className="space-y-3">
        <p className="text-sm text-gray-600">
          {t('auth.verifyEmail.notReceived')}
        </p>

        <button
          onClick={manejarReenviar}
          disabled={reenviando || cooldown > 0}
          className="w-full btn-primary flex items-center justify-center py-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {reenviando ? (
            <>
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
              Reenviando...
            </>
          ) : emailEnviado ? (
            <>
              <CheckCircle className="h-5 w-5 mr-2" />
              {t('auth.verifyEmail.resendSuccess')}
            </>
          ) : cooldown > 0 ? (
            t('auth.verifyEmail.resendCooldown', { seconds: cooldown })
          ) : (
            t('auth.verifyEmail.resend')
          )}
        </button>

        {/* Volver al login */}
        {onVolver && (
          <button
            onClick={onVolver}
            className="w-full btn-secondary flex items-center justify-center py-3"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('auth.verifyEmail.backToLogin')}
          </button>
        )}
      </div>

      {/* Nota adicional */}
      <div className="pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Si no encuentras el correo, revisa tu carpeta de spam o correo no deseado.
        </p>
      </div>
    </div>
  );
}
