'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { createClient } from '@/lib/supabase';
import { esquemaLogin, type DatosLogin } from '@/lib/validadores/autenticacion';
import RecordarmeCheckbox from './RecordarmeCheckbox';

interface PropiedadesFormularioLogin {
  onExito?: () => void;
  redirigirA?: string;
}

export default function FormularioLogin({
  onExito,
  redirigirA = '/dashboard'
}: PropiedadesFormularioLogin) {
  const t = useTranslations();
  const router = useRouter();
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch
  } = useForm<DatosLogin>({
    resolver: zodResolver(esquemaLogin),
    defaultValues: {
      email: '',
      contrasena: '',
      recordarme: false
    }
  });

  const recordarme = watch('recordarme');

  const onSubmit = async (datos: DatosLogin) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: datos.email,
        password: datos.contrasena,
      });

      if (error) {
        // Manejo de errores específicos
        if (error.message.includes('Invalid login credentials')) {
          toast.error(t('auth.errors.invalidCredentials'));
        } else if (error.message.includes('Email not confirmed')) {
          toast.error(t('auth.errors.emailNotConfirmed'));
          router.push('/auth/verify-email');
        } else if (error.message.includes('Too many requests')) {
          toast.error(t('auth.errors.tooManyRequests'));
        } else {
          toast.error(error.message || t('auth.errors.unknownError'));
        }
        return;
      }

      // Verificar si el usuario tiene 2FA activado
      if (data.user?.user_metadata?.mfa_enabled) {
        // Redirigir a la página de verificación 2FA
        router.push('/auth/2fa-verify');
        return;
      }

      // Login exitoso
      toast.success(t('auth.success.loginSuccess'));

      if (onExito) {
        onExito();
      } else {
        router.push(redirigirA);
      }
    } catch (error) {
      console.error('Error en login:', error);
      toast.error(t('auth.errors.networkError'));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Campo de Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          {t('auth.login.email')}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            {...register('email')}
            id="email"
            type="email"
            autoComplete="email"
            className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
              errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder={t('auth.login.emailPlaceholder')}
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">
            {t(errors.email.message as any)}
          </p>
        )}
      </div>

      {/* Campo de Contraseña */}
      <div>
        <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700 mb-1">
          {t('auth.login.password')}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            {...register('contrasena')}
            id="contrasena"
            type={mostrarContrasena ? 'text' : 'password'}
            autoComplete="current-password"
            className={`block w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
              errors.contrasena ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder={t('auth.login.passwordPlaceholder')}
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
      </div>

      {/* Recordarme y Olvidé contraseña */}
      <div className="flex items-center justify-between">
        <RecordarmeCheckbox
          valor={recordarme || false}
          onChange={(valor) => setValue('recordarme', valor)}
        />
        <a
          href="/auth/forgot-password"
          className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
        >
          {t('auth.login.forgotPassword')}
        </a>
      </div>

      {/* Botón de Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary flex items-center justify-center py-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin h-5 w-5 mr-2" />
            {t('auth.login.loading')}
          </>
        ) : (
          <>
            {t('auth.login.submit')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
