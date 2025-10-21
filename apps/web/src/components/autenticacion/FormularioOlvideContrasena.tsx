'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Mail, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { createClient } from '@/lib/supabase';
import { esquemaOlvideContrasena, type DatosOlvideContrasena } from '@/lib/validadores/autenticacion';

interface PropiedadesFormularioOlvideContrasena {
  onVolver?: () => void;
}

export default function FormularioOlvideContrasena({ onVolver }: PropiedadesFormularioOlvideContrasena) {
  const t = useTranslations();
  const [enviado, setEnviado] = useState(false);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues
  } = useForm<DatosOlvideContrasena>({
    resolver: zodResolver(esquemaOlvideContrasena),
    defaultValues: {
      email: ''
    }
  });

  const onSubmit = async (datos: DatosOlvideContrasena) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(datos.email, {
        redirectTo: `${window.location.origin}/auth/reset-password`
      });

      if (error) {
        toast.error(error.message || t('auth.errors.unknownError'));
        return;
      }

      setEnviado(true);
      toast.success(t('auth.success.passwordResetEmailSent'));
    } catch (error) {
      console.error('Error al enviar correo de recuperación:', error);
      toast.error(t('auth.errors.networkError'));
    }
  };

  if (enviado) {
    return (
      <div className="space-y-6 text-center">
        {/* Icono de éxito */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>

        {/* Título */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {t('auth.forgotPassword.success.title')}
          </h3>
          <p className="text-gray-600">
            {t('auth.forgotPassword.success.message')}
          </p>
        </div>

        {/* Email enviado */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>{getValues('email')}</strong>
          </p>
        </div>

        {/* Nota */}
        <p className="text-sm text-gray-500">
          {t('auth.forgotPassword.success.note')}
        </p>

        {/* Botón volver */}
        <button
          onClick={onVolver}
          className="w-full btn-secondary flex items-center justify-center py-3"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('auth.forgotPassword.backToLogin')}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Campo de Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          {t('auth.forgotPassword.email')}
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
            placeholder={t('auth.forgotPassword.emailPlaceholder')}
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">
            {t(errors.email.message as any)}
          </p>
        )}
      </div>

      {/* Botones */}
      <div className="space-y-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary flex items-center justify-center py-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
              {t('auth.forgotPassword.loading')}
            </>
          ) : (
            t('auth.forgotPassword.submit')
          )}
        </button>

        {onVolver && (
          <button
            type="button"
            onClick={onVolver}
            className="w-full btn-secondary flex items-center justify-center py-3"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('auth.forgotPassword.backToLogin')}
          </button>
        )}
      </div>
    </form>
  );
}
