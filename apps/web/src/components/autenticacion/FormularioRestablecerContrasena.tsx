'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { createClient } from '@/lib/supabase';
import { esquemaRestablecerContrasena, type DatosRestablecerContrasena } from '@/lib/validadores/autenticacion';
import IndicadorFortalezaContrasena from './IndicadorFortalezaContrasena';

export default function FormularioRestablecerContrasena() {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [mostrarConfirmarContrasena, setMostrarConfirmarContrasena] = useState(false);
  const [tokenValido, setTokenValido] = useState<boolean | null>(null);
  const [restablecido, setRestablecido] = useState(false);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm<DatosRestablecerContrasena>({
    resolver: zodResolver(esquemaRestablecerContrasena),
    defaultValues: {
      contrasena: '',
      confirmarContrasena: ''
    }
  });

  const contrasenaActual = watch('contrasena');

  // Verificar token al cargar
  useEffect(() => {
    const verificarToken = async () => {
      const token = searchParams.get('token');

      if (!token) {
        setTokenValido(false);
        return;
      }

      try {
        // Verificar que el token sea válido verificando la sesión
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error || !session) {
          setTokenValido(false);
        } else {
          setTokenValido(true);
        }
      } catch (error) {
        console.error('Error al verificar token:', error);
        setTokenValido(false);
      }
    };

    verificarToken();
  }, [searchParams, supabase.auth]);

  const onSubmit = async (datos: DatosRestablecerContrasena) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: datos.contrasena
      });

      if (error) {
        toast.error(error.message || t('auth.errors.unknownError'));
        return;
      }

      setRestablecido(true);
      toast.success(t('auth.success.passwordResetSuccess'));

      // Redirigir al login después de 3 segundos
      setTimeout(() => {
        router.push('/auth/login');
      }, 3000);
    } catch (error) {
      console.error('Error al restablecer contraseña:', error);
      toast.error(t('auth.errors.networkError'));
    }
  };

  // Token inválido o expirado
  if (tokenValido === false) {
    return (
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {t('auth.resetPassword.invalidToken')}
          </h3>
          <p className="text-gray-600">
            El enlace de restablecimiento ha expirado o no es válido. Por favor, solicita uno nuevo.
          </p>
        </div>

        <button
          onClick={() => router.push('/auth/forgot-password')}
          className="w-full btn-primary py-3"
        >
          Solicitar nuevo enlace
        </button>
      </div>
    );
  }

  // Esperando validación del token
  if (tokenValido === null) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    );
  }

  // Contraseña restablecida exitosamente
  if (restablecido) {
    return (
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {t('auth.resetPassword.success')}
          </h3>
          <p className="text-gray-600">
            Tu contraseña ha sido actualizada. Serás redirigido al inicio de sesión...
          </p>
        </div>

        <div className="flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary-500" />
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Nueva contraseña */}
      <div>
        <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700 mb-1">
          {t('auth.resetPassword.password')}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            {...register('contrasena')}
            id="contrasena"
            type={mostrarContrasena ? 'text' : 'password'}
            autoComplete="new-password"
            className={`block w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
              errors.contrasena ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder={t('auth.resetPassword.passwordPlaceholder')}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setMostrarContrasena(!mostrarContrasena)}
          >
            {mostrarContrasena ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
            )}
          </button>
        </div>
        {errors.contrasena && (
          <p className="mt-1 text-sm text-red-600">
            {t(errors.contrasena.message as any)}
          </p>
        )}

        {/* Indicador de fortaleza */}
        <IndicadorFortalezaContrasena contrasena={contrasenaActual || ''} />
      </div>

      {/* Confirmar contraseña */}
      <div>
        <label htmlFor="confirmarContrasena" className="block text-sm font-medium text-gray-700 mb-1">
          {t('auth.resetPassword.confirmPassword')}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            {...register('confirmarContrasena')}
            id="confirmarContrasena"
            type={mostrarConfirmarContrasena ? 'text' : 'password'}
            autoComplete="new-password"
            className={`block w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
              errors.confirmarContrasena ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder={t('auth.resetPassword.confirmPasswordPlaceholder')}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setMostrarConfirmarContrasena(!mostrarConfirmarContrasena)}
          >
            {mostrarConfirmarContrasena ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
            )}
          </button>
        </div>
        {errors.confirmarContrasena && (
          <p className="mt-1 text-sm text-red-600">
            {t(errors.confirmarContrasena.message as any)}
          </p>
        )}
      </div>

      {/* Botón de submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary flex items-center justify-center py-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin h-5 w-5 mr-2" />
            {t('auth.resetPassword.loading')}
          </>
        ) : (
          t('auth.resetPassword.submit')
        )}
      </button>
    </form>
  );
}
