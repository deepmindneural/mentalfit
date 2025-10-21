'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  Building,
  Users,
  Briefcase,
  Shield,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Check
} from 'lucide-react';
import toast from 'react-hot-toast';
import { createClient } from '@/lib/supabase';
import {
  esquemaRegistroPaso1,
  esquemaRegistroPaso2,
  esquemaRegistroPaso3,
  type DatosRegistroPaso1,
  type DatosRegistroPaso2,
  type DatosRegistroPaso3
} from '@/lib/validadores/autenticacion';
import IndicadorFortalezaContrasena from './IndicadorFortalezaContrasena';

interface PropiedadesFormularioRegistro {
  onExito?: () => void;
}

export default function FormularioRegistro({ onExito }: PropiedadesFormularioRegistro) {
  const t = useTranslations();
  const router = useRouter();
  const [pasoActual, setPasoActual] = useState(1);
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [mostrarConfirmarContrasena, setMostrarConfirmarContrasena] = useState(false);
  const supabase = createClient();

  // Datos acumulados de todos los pasos
  const [datosRegistro, setDatosRegistro] = useState<Partial<
    DatosRegistroPaso1 & DatosRegistroPaso2 & DatosRegistroPaso3
  >>({});

  const totalPasos = 3;

  // Configuración de formularios por paso
  const formularioPaso1 = useForm<DatosRegistroPaso1>({
    resolver: zodResolver(esquemaRegistroPaso1),
    defaultValues: datosRegistro as DatosRegistroPaso1
  });

  const formularioPaso2 = useForm<DatosRegistroPaso2>({
    resolver: zodResolver(esquemaRegistroPaso2),
    defaultValues: datosRegistro as DatosRegistroPaso2
  });

  const formularioPaso3 = useForm<DatosRegistroPaso3>({
    resolver: zodResolver(esquemaRegistroPaso3),
    defaultValues: {
      contrasena: '',
      confirmarContrasena: ''
    }
  });

  const contrasenaActual = formularioPaso3.watch('contrasena');

  const manejarSiguiente = async () => {
    let esValido = false;

    if (pasoActual === 1) {
      esValido = await formularioPaso1.trigger();
      if (esValido) {
        setDatosRegistro({ ...datosRegistro, ...formularioPaso1.getValues() });
        setPasoActual(2);
      }
    } else if (pasoActual === 2) {
      esValido = await formularioPaso2.trigger();
      if (esValido) {
        setDatosRegistro({ ...datosRegistro, ...formularioPaso2.getValues() });
        setPasoActual(3);
      }
    }
  };

  const manejarAtras = () => {
    if (pasoActual > 1) {
      setPasoActual(pasoActual - 1);
    }
  };

  const manejarRegistro = async (datosPaso3: DatosRegistroPaso3) => {
    try {
      const datosCompletos = {
        ...datosRegistro,
        ...datosPaso3
      };

      // Registrar usuario en Supabase
      const { data, error } = await supabase.auth.signUp({
        email: datosCompletos.email!,
        password: datosCompletos.contrasena,
        options: {
          data: {
            nombre: datosCompletos.nombre,
            apellido: datosCompletos.apellido,
            nombreEmpresa: datosCompletos.nombreEmpresa,
            tamanoEmpresa: datosCompletos.tamanoEmpresa,
            cargo: datosCompletos.cargo,
            rol: datosCompletos.rol
          }
        }
      });

      if (error) {
        if (error.message.includes('already registered')) {
          toast.error(t('auth.errors.emailAlreadyExists'));
        } else {
          toast.error(error.message || t('auth.errors.unknownError'));
        }
        return;
      }

      // Registro exitoso
      toast.success(t('auth.success.registerSuccess'));

      if (onExito) {
        onExito();
      } else {
        // Redirigir a verificación de email
        router.push('/auth/verify-email');
      }
    } catch (error) {
      console.error('Error en registro:', error);
      toast.error(t('auth.errors.networkError'));
    }
  };

  const renderizarPaso = () => {
    const variantes = {
      enter: { opacity: 0, x: 20 },
      center: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 }
    };

    switch (pasoActual) {
      case 1:
        return (
          <motion.div
            key="paso1"
            variants={variantes}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth.register.step1.firstName')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...formularioPaso1.register('nombre')}
                  type="text"
                  className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    formularioPaso1.formState.errors.nombre ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder={t('auth.register.step1.firstNamePlaceholder')}
                />
              </div>
              {formularioPaso1.formState.errors.nombre && (
                <p className="mt-1 text-sm text-red-600">
                  {t(formularioPaso1.formState.errors.nombre.message as any)}
                </p>
              )}
            </div>

            {/* Apellido */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth.register.step1.lastName')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...formularioPaso1.register('apellido')}
                  type="text"
                  className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    formularioPaso1.formState.errors.apellido ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder={t('auth.register.step1.lastNamePlaceholder')}
                />
              </div>
              {formularioPaso1.formState.errors.apellido && (
                <p className="mt-1 text-sm text-red-600">
                  {t(formularioPaso1.formState.errors.apellido.message as any)}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth.register.step1.email')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...formularioPaso1.register('email')}
                  type="email"
                  className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    formularioPaso1.formState.errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder={t('auth.register.step1.emailPlaceholder')}
                />
              </div>
              {formularioPaso1.formState.errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {t(formularioPaso1.formState.errors.email.message as any)}
                </p>
              )}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="paso2"
            variants={variantes}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Nombre de empresa */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth.register.step2.companyName')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...formularioPaso2.register('nombreEmpresa')}
                  type="text"
                  className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    formularioPaso2.formState.errors.nombreEmpresa ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder={t('auth.register.step2.companyNamePlaceholder')}
                />
              </div>
              {formularioPaso2.formState.errors.nombreEmpresa && (
                <p className="mt-1 text-sm text-red-600">
                  {t(formularioPaso2.formState.errors.nombreEmpresa.message as any)}
                </p>
              )}
            </div>

            {/* Tamaño de empresa */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth.register.step2.companySize')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  {...formularioPaso2.register('tamanoEmpresa')}
                  className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    formularioPaso2.formState.errors.tamanoEmpresa ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  <option value="">{t('auth.register.step2.companySizePlaceholder')}</option>
                  <option value="1-10">{t('auth.register.step2.companySizes.1-10')}</option>
                  <option value="11-50">{t('auth.register.step2.companySizes.11-50')}</option>
                  <option value="51-200">{t('auth.register.step2.companySizes.51-200')}</option>
                  <option value="201-500">{t('auth.register.step2.companySizes.201-500')}</option>
                  <option value="501-1000">{t('auth.register.step2.companySizes.501-1000')}</option>
                  <option value="1000+">{t('auth.register.step2.companySizes.1000+')}</option>
                </select>
              </div>
              {formularioPaso2.formState.errors.tamanoEmpresa && (
                <p className="mt-1 text-sm text-red-600">
                  {t(formularioPaso2.formState.errors.tamanoEmpresa.message as any)}
                </p>
              )}
            </div>

            {/* Cargo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth.register.step2.jobTitle')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...formularioPaso2.register('cargo')}
                  type="text"
                  className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    formularioPaso2.formState.errors.cargo ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder={t('auth.register.step2.jobTitlePlaceholder')}
                />
              </div>
              {formularioPaso2.formState.errors.cargo && (
                <p className="mt-1 text-sm text-red-600">
                  {t(formularioPaso2.formState.errors.cargo.message as any)}
                </p>
              )}
            </div>

            {/* Rol */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth.register.step2.role')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Shield className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  {...formularioPaso2.register('rol')}
                  className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    formularioPaso2.formState.errors.rol ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  <option value="">{t('auth.register.step2.rolePlaceholder')}</option>
                  <option value="company_admin">{t('auth.register.step2.roles.company_admin')}</option>
                  <option value="hr_manager">{t('auth.register.step2.roles.hr_manager')}</option>
                  <option value="team_lead">{t('auth.register.step2.roles.team_lead')}</option>
                </select>
              </div>
              {formularioPaso2.formState.errors.rol && (
                <p className="mt-1 text-sm text-red-600">
                  {t(formularioPaso2.formState.errors.rol.message as any)}
                </p>
              )}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="paso3"
            variants={variantes}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Contraseña */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth.register.step3.password')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...formularioPaso3.register('contrasena')}
                  type={mostrarContrasena ? 'text' : 'password'}
                  className={`block w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    formularioPaso3.formState.errors.contrasena ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder={t('auth.register.step3.passwordPlaceholder')}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setMostrarContrasena(!mostrarContrasena)}
                >
                  {mostrarContrasena ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {formularioPaso3.formState.errors.contrasena && (
                <p className="mt-1 text-sm text-red-600">
                  {t(formularioPaso3.formState.errors.contrasena.message as any)}
                </p>
              )}

              {/* Indicador de fortaleza */}
              <IndicadorFortalezaContrasena contrasena={contrasenaActual || ''} />
            </div>

            {/* Confirmar contraseña */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth.register.step3.confirmPassword')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...formularioPaso3.register('confirmarContrasena')}
                  type={mostrarConfirmarContrasena ? 'text' : 'password'}
                  className={`block w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    formularioPaso3.formState.errors.confirmarContrasena ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder={t('auth.register.step3.confirmPasswordPlaceholder')}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setMostrarConfirmarContrasena(!mostrarConfirmarContrasena)}
                >
                  {mostrarConfirmarContrasena ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {formularioPaso3.formState.errors.confirmarContrasena && (
                <p className="mt-1 text-sm text-red-600">
                  {t(formularioPaso3.formState.errors.confirmarContrasena.message as any)}
                </p>
              )}
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Barra de progreso */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{t('auth.register.progress', { current: pasoActual, total: totalPasos })}</span>
          <span>{Math.round((pasoActual / totalPasos) * 100)}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-500 transition-all duration-300"
            style={{ width: `${(pasoActual / totalPasos) * 100}%` }}
          />
        </div>
      </div>

      {/* Título del paso actual */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900">
          {pasoActual === 1 && t('auth.register.step1.title')}
          {pasoActual === 2 && t('auth.register.step2.title')}
          {pasoActual === 3 && t('auth.register.step3.title')}
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          {pasoActual === 1 && t('auth.register.step1.description')}
          {pasoActual === 2 && t('auth.register.step2.description')}
          {pasoActual === 3 && t('auth.register.step3.description')}
        </p>
      </div>

      {/* Formulario del paso actual */}
      <AnimatePresence mode="wait">
        {renderizarPaso()}
      </AnimatePresence>

      {/* Botones de navegación */}
      <div className="flex gap-3">
        {pasoActual > 1 && (
          <button
            type="button"
            onClick={manejarAtras}
            className="flex-1 btn-secondary flex items-center justify-center py-3"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('auth.register.navigation.back')}
          </button>
        )}

        {pasoActual < totalPasos ? (
          <button
            type="button"
            onClick={manejarSiguiente}
            className="flex-1 btn-primary flex items-center justify-center py-3"
          >
            {t('auth.register.navigation.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={formularioPaso3.handleSubmit(manejarRegistro)}
            disabled={formularioPaso3.formState.isSubmitting}
            className="flex-1 btn-primary flex items-center justify-center py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formularioPaso3.formState.isSubmitting ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                {t('auth.register.navigation.loading')}
              </>
            ) : (
              <>
                {t('auth.register.navigation.submit')}
                <Check className="ml-2 h-4 w-4" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
