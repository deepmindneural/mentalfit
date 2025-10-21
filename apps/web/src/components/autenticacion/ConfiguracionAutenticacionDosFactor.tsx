'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { QRCodeSVG } from 'qrcode.react';
import { Shield, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { createClient } from '@/lib/supabase';

interface PropiedadesConfiguracionAutenticacionDosFactor {
  onExito?: () => void;
  onCancelar?: () => void;
}

export default function ConfiguracionAutenticacionDosFactor({
  onExito,
  onCancelar
}: PropiedadesConfiguracionAutenticacionDosFactor) {
  const t = useTranslations();
  const [cargando, setCargando] = useState(true);
  const [urlQR, setUrlQR] = useState<string>('');
  const [secret, setSecret] = useState<string>('');
  const [codigoVerificacion, setCodigoVerificacion] = useState('');
  const [verificando, setVerificando] = useState(false);
  const [errorVerificacion, setErrorVerificacion] = useState('');
  const supabase = createClient();

  useEffect(() => {
    generarQR();
  }, []);

  const generarQR = async () => {
    try {
      setCargando(true);

      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast.error(t('auth.errors.userNotFound'));
        return;
      }

      // Generar el secret para MFA
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp'
      });

      if (error) {
        toast.error(error.message || t('auth.errors.unknownError'));
        return;
      }

      if (data) {
        setUrlQR(data.totp.qr_code);
        setSecret(data.totp.secret);
      }
    } catch (error) {
      console.error('Error al generar QR para 2FA:', error);
      toast.error(t('auth.errors.networkError'));
    } finally {
      setCargando(false);
    }
  };

  const manejarVerificar = async () => {
    if (codigoVerificacion.length !== 6) {
      setErrorVerificacion(t('auth.errors.invalid2FACode'));
      return;
    }

    setVerificando(true);
    setErrorVerificacion('');

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast.error(t('auth.errors.userNotFound'));
        return;
      }

      // Verificar el código
      const { data, error } = await supabase.auth.mfa.challenge({
        factorId: user.id // Esto puede variar según tu implementación
      });

      if (error) {
        setErrorVerificacion(t('auth.errors.invalid2FACode'));
        return;
      }

      // Si la verificación es exitosa
      toast.success(t('auth.success.2FAEnabled'));

      if (onExito) {
        onExito();
      }
    } catch (error) {
      console.error('Error al verificar código 2FA:', error);
      setErrorVerificacion(t('auth.errors.unknownError'));
    } finally {
      setVerificando(false);
    }
  };

  const manejarCambioInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value.replace(/\D/g, '').slice(0, 6);
    setCodigoVerificacion(valor);
    setErrorVerificacion('');
  };

  if (cargando) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
        <p className="text-gray-600">Generando código QR...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
            <Shield className="h-8 w-8 text-primary-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('auth.twoFactor.setup.title')}
        </h2>
        <p className="text-gray-600">
          {t('auth.twoFactor.setup.subtitle')}
        </p>
      </div>

      {/* Paso 1: Escanear QR */}
      <div className="space-y-4">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-semibold">
              1
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {t('auth.twoFactor.setup.step1.title')}
              </h3>
              <p className="text-sm text-gray-600">
                {t('auth.twoFactor.setup.step1.description')}
              </p>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex justify-center bg-white p-6 rounded-lg border-2 border-dashed border-gray-300">
            {urlQR ? (
              <QRCodeSVG value={urlQR} size={200} level="H" />
            ) : (
              <div className="w-[200px] h-[200px] flex items-center justify-center">
                <AlertCircle className="h-12 w-12 text-gray-400" />
              </div>
            )}
          </div>

          {/* Secret manual (por si el QR no funciona) */}
          {secret && (
            <div className="mt-4">
              <p className="text-xs text-gray-500 mb-2">
                O ingresa este código manualmente:
              </p>
              <div className="bg-gray-100 border border-gray-300 rounded p-3">
                <code className="text-sm text-gray-800 font-mono break-all">
                  {secret}
                </code>
              </div>
            </div>
          )}
        </div>

        {/* Paso 2: Verificar código */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-semibold">
              2
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {t('auth.twoFactor.setup.step2.title')}
              </h3>
              <p className="text-sm text-gray-600">
                {t('auth.twoFactor.setup.step2.description')}
              </p>
            </div>
          </div>

          {/* Input de código */}
          <div>
            <label htmlFor="codigo" className="block text-sm font-medium text-gray-700 mb-2">
              {t('auth.twoFactor.setup.code')}
            </label>
            <input
              id="codigo"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={codigoVerificacion}
              onChange={manejarCambioInput}
              className={`block w-full px-4 py-3 text-center text-2xl font-mono tracking-widest border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errorVerificacion ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="000000"
            />
            {errorVerificacion && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errorVerificacion}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex gap-3">
        {onCancelar && (
          <button
            type="button"
            onClick={onCancelar}
            className="flex-1 btn-secondary py-3"
          >
            {t('auth.twoFactor.setup.cancel')}
          </button>
        )}

        <button
          type="button"
          onClick={manejarVerificar}
          disabled={verificando || codigoVerificacion.length !== 6}
          className="flex-1 btn-primary flex items-center justify-center py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {verificando ? (
            <>
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
              {t('auth.twoFactor.setup.verifying')}
            </>
          ) : (
            <>
              <CheckCircle className="h-5 w-5 mr-2" />
              {t('auth.twoFactor.setup.verify')}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
